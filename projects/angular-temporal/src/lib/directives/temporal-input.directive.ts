import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TemporalService } from '../services/temporal.service';
import { Temporal } from '../utils/polyfill';

type TemporalInputType = 'date' | 'time' | 'datetime';

@Directive({
  selector: 'input[temporalInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalInputDirective),
      multi: true,
    },
  ],
})
export class TemporalInputDirective implements ControlValueAccessor, OnInit {
  readonly temporalInput = input<TemporalInputType>('date');

  private onChange: any = () => {};
  private onTouched: any = () => {};
  private value: any;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    private temporalService: TemporalService
  ) {}

  ngOnInit(): void {
    switch (this.temporalInput()) {
      case 'date':
        this.renderer.setAttribute(this.el.nativeElement, 'type', 'date');
        break;
      case 'time':
        this.renderer.setAttribute(this.el.nativeElement, 'type', 'time');
        break;
      case 'datetime':
        this.renderer.setAttribute(
          this.el.nativeElement,
          'type',
          'datetime-local'
        );
        break;
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    try {
      let temporalValue:
        | Temporal.PlainDate
        | Temporal.PlainTime
        | Temporal.PlainDateTime;

      const temporalInput = this.temporalInput();
      switch (temporalInput) {
        case 'date':
          temporalValue = Temporal.PlainDate.from(value);
          break;
        case 'time':
          temporalValue = Temporal.PlainTime.from(value);
          break;
        case 'datetime':
          temporalValue = Temporal.PlainDateTime.from(value.replace('T', ' '));
          break;
        default:
          throw new Error(`Unsupported temporal input type: ${temporalInput}`);
      }

      this.value = temporalValue;
      this.onChange(temporalValue);
    } catch (error) {
      console.error('Error parsing temporal input:', error);
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    if (!value) {
      this.renderer.setProperty(this.el.nativeElement, 'value', '');
      return;
    }

    try {
      let inputValue = '';

      switch (this.temporalInput()) {
        case 'date':
          const date = this.temporalService.toPlainDate(value);
          // Format as YYYY-MM-DD for HTML date input
          inputValue = date.toString().substring(0, 10);
          break;
        case 'time':
          const time = this.temporalService.toPlainTime(value);
          // Format as HH:MM:SS for HTML time input
          inputValue = time.toString().substring(0, 8);
          break;
        case 'datetime':
          const dateTime = this.temporalService.toPlainDateTime(value);
          // Format as YYYY-MM-DDTHH:MM:SS for HTML datetime-local input
          inputValue = dateTime.toString().replace(' ', 'T').substring(0, 19);
          break;
      }

      this.value = value;
      this.renderer.setProperty(this.el.nativeElement, 'value', inputValue);
    } catch (error) {
      console.error('Error setting temporal input value:', error);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }
}
