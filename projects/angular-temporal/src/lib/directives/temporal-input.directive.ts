import { Directive, ElementRef, forwardRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TemporalService } from '../services/temporal.service';
import { TemporalFormValue, TemporalInputConfig } from '../types/temporal.types';
import { Temporal } from '../utils/polyfill';

@Directive({
  selector: 'input[temporalInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalInputDirective),
      multi: true
    }
  ]
})
export class TemporalInputDirective implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() temporalInput!: 'date' | 'time' | 'datetime';
  @Input() temporalConfig?: Partial<TemporalInputConfig>;
  @Input() formControl?: FormControl;

  private elementRef = inject(ElementRef<HTMLInputElement>);
  private temporalService = inject(TemporalService);
  private config: TemporalInputConfig = {
    type: 'date',
    format: 'YYYY-MM-DD',
    locale: 'en-US',
    timezone: 'UTC',
    calendar: 'iso8601'
  };

  private onChange = (value: TemporalFormValue) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.config = { ...this.config, ...this.temporalConfig };
    this.setupInputType();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    // TODO: Add cleanup if needed
  }

  private setupInputType(): void {
    const element = this.elementRef.nativeElement;
    
    switch (this.config.type) {
      case 'date':
        element.type = 'date';
        break;
      case 'time':
        element.type = 'time';
        break;
      case 'datetime':
        element.type = 'datetime-local';
        break;
    }
  }

  private setupEventListeners(): void {
    const element = this.elementRef.nativeElement;
    
    element.addEventListener('input', this.handleInput.bind(this));
    element.addEventListener('blur', this.handleBlur.bind(this));
  }

  private handleInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    
    if (!value) {
      this.onChange(null);
      return;
    }

    try {
      let temporalValue: TemporalFormValue;
      
      switch (this.config.type) {
        case 'date':
          temporalValue = Temporal.PlainDate.from(value);
          break;
        case 'time':
          temporalValue = Temporal.PlainTime.from(value);
          break;
        case 'datetime':
          temporalValue = Temporal.PlainDateTime.from(value);
          break;
        default:
          temporalValue = null;
      }
      
      this.onChange(temporalValue);
    } catch (error) {
      console.warn('TemporalInputDirective: Invalid input value', error);
      this.onChange(null);
    }
  }

  private handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: TemporalFormValue): void {
    if (!value) {
      this.elementRef.nativeElement.value = '';
      return;
    }

    try {
      let stringValue: string;
      
      switch (this.config.type) {
        case 'date':
          if (value instanceof Temporal.PlainDate) {
            stringValue = value.toString();
          } else {
            const date = this.temporalService.toPlainDate(value as any);
            stringValue = date.toString();
          }
          break;
        case 'time':
          if (value instanceof Temporal.PlainTime) {
            stringValue = value.toString();
          } else {
            const time = this.temporalService.toPlainTime(value as any);
            stringValue = time.toString();
          }
          break;
        case 'datetime':
          if (value instanceof Temporal.PlainDateTime) {
            stringValue = value.toString().replace('T', 'T').substring(0, 16);
          } else {
            const dateTime = this.temporalService.toPlainDateTime(value as any);
            stringValue = dateTime.toString().replace('T', 'T').substring(0, 16);
          }
          break;
        default:
          stringValue = '';
      }
      
      this.elementRef.nativeElement.value = stringValue;
    } catch (error) {
      console.warn('TemporalInputDirective: Error writing value', error);
      this.elementRef.nativeElement.value = '';
    }
  }

  registerOnChange(fn: (value: TemporalFormValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}
