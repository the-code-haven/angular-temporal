import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { Temporal } from '../utils/polyfill';
import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';

@Directive({
  selector: '[temporalTimezone]',
  standalone: true
})
export class TemporalTimezoneDirective implements OnInit, OnDestroy {
  @Input() temporalTimezone!: string;
  @Input() temporalValue!: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | string | Date | null;
  @Input() temporalFormat?: TemporalFormatOptions;
  @Input() temporalLocale?: string;

  private elementRef = inject(ElementRef<HTMLElement>);
  private temporalService = inject(TemporalService);
  private updateInterval?: number;

  ngOnInit(): void {
    this.updateDisplay();
    
    if (this.temporalFormat?.style === 'narrow') {
      this.updateInterval = window.setInterval(() => {
        this.updateDisplay();
      }, 60000);
    }
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private updateDisplay(): void {
    if (!this.temporalValue || !this.temporalTimezone) {
      this.elementRef.nativeElement.textContent = '';
      return;
    }

    try {
      let zonedDateTime: Temporal.ZonedDateTime;
      
      if (this.temporalValue instanceof Temporal.ZonedDateTime) {
        zonedDateTime = this.temporalValue.withTimeZone(this.temporalTimezone);
      } else if (this.temporalValue instanceof Temporal.PlainDateTime) {
        zonedDateTime = this.temporalValue.toZonedDateTime(this.temporalTimezone);
      } else if (this.temporalValue instanceof Temporal.PlainDate) {
        const plainDateTime = this.temporalValue.toPlainDateTime({ hour: 0, minute: 0, second: 0 });
        zonedDateTime = plainDateTime.toZonedDateTime(this.temporalTimezone);
      } else {
        zonedDateTime = this.temporalService.toZonedDateTime(this.temporalValue, this.temporalTimezone);
      }

      const formattedValue = this.temporalService.format(
        zonedDateTime,
        this.temporalFormat,
        this.temporalLocale
      );

      this.elementRef.nativeElement.textContent = formattedValue;
    } catch (error) {
      console.warn('TemporalTimezoneDirective: Error formatting value', error);
      this.elementRef.nativeElement.textContent = '';
    }
  }
}
