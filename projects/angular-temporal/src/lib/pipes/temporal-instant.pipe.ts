import { inject, input, Pipe, PipeTransform } from '@angular/core';

import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';
import { Temporal } from '../utils/polyfill';

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
