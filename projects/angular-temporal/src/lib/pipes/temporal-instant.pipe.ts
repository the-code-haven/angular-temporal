import { Pipe, PipeTransform, inject, input } from '@angular/core';
import { Temporal } from '../utils/polyfill';
import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';

@Pipe({
  name: 'temporalInstant',
  standalone: true
})
export class TemporalInstantPipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.Instant | string | Date | number | null | undefined,
    timezone?: string,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      const instant = this.temporalService.toInstant(value);
      const zonedDateTime = instant.toZonedDateTime({ 
        timeZone: timezone || this.temporalService.defaultTimezone(),
        calendar: this.temporalService.defaultCalendar()
      });
      return this.temporalService.format(zonedDateTime, options, locale);
    } catch (error) {
      console.warn('TemporalInstantPipe: Invalid instant value', error);
      return '';
    }
  }
}
