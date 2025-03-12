import { Pipe, PipeTransform } from '@angular/core';
import { TemporalService } from '../services/temporal.service';
import { TemporalZonedDateTimeLike } from '../models/temporal-types';
import { TemporalDateTimeFormatOptions } from '../models/temporal-format-options';

@Pipe({
  name: 'temporalZonedDateTime',
})
export class TemporalZonedDateTimePipe implements PipeTransform {
  constructor(private temporalService: TemporalService) {}

  transform(
    value: TemporalZonedDateTimeLike,
    formatOptions: TemporalDateTimeFormatOptions = {},
    timeZone?: string,
    locale?: 'en-US'
  ): string {
    if (!value) {
      return '';
    }

    try {
      const zonedDateTime = this.temporalService.toZonedDateTime(value, timeZone);
      
      // Always include timeZone in options if provided
      if (timeZone && !formatOptions.timeZone) {
        formatOptions.timeZone = timeZone;
      }

      return zonedDateTime.toLocaleString(locale, formatOptions);
    } catch (error) {
      console.error('Error formatting zoned date-time with Temporal:', error);
      return String(value);
    }
  }
}
