import {
  Directive,
  ElementRef,
  input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { TemporalDateTimeFormatOptions } from '../models/temporal-format-options';
import { TemporalZonedDateTimeLike } from '../models/temporal-types';
import { TemporalService } from '../services/temporal.service';

@Directive({
  selector: '[temporalTimezone]',
})
export class TemporalTimezoneDirective implements OnChanges {
  readonly temporalTimezone = input.required<string>();
  readonly temporalValue = input.required<TemporalZonedDateTimeLike>();
  readonly temporalFormat = input<TemporalDateTimeFormatOptions>({});
  readonly temporalLocale = input<string>('en-US');

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private temporalService: TemporalService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['temporalTimezone'] ||
        changes['temporalValue'] ||
        changes['temporalFormat'] ||
        changes['temporalLocale']) &&
      this.temporalValue() &&
      this.temporalTimezone()
    ) {
      this.updateValue();
    }
  }

  private updateValue(): void {
    if (!this.temporalValue) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
      return;
    }

    try {
      const zonedDateTime = this.temporalService.toZonedDateTime(
        this.temporalValue(),
        this.temporalTimezone()
      );
      const { ...options } = this.temporalFormat();

      if (!options.timeZone) {
        options.timeZone = this.temporalTimezone();
      }

      const formattedValue = zonedDateTime.toLocaleString(
        this.temporalLocale(),
        options
      );

      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        formattedValue
      );
    } catch (error) {
      console.error('Error in temporalTimezone directive:', error);
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        String(this.temporalValue())
      );
    }
  }
}
