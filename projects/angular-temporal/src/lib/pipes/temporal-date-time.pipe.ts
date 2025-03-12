import { Pipe, PipeTransform } from '@angular/core';

import { TemporalDateTimeFormatOptions } from '../models/temporal-format-options';
import { TemporalDateTimeLike } from '../models/temporal-types';
import { TemporalService } from '../services/temporal.service';

@Pipe({
  name: 'temporalDateTime',
})
export class TemporalDateTimePipe implements PipeTransform {
  constructor(private temporalService: TemporalService) {}

  transform(
    value: TemporalDateTimeLike,
    formatOptions: TemporalDateTimeFormatOptions = {},
    locale = 'en-US'
  ): string {
    if (!value) {
      return '';
    }

    try {
      const dateTime = this.temporalService.toPlainDateTime(value);
      return dateTime.toLocaleString(locale, formatOptions);
    } catch (error) {
      console.error('Error formatting date-time with Temporal:', error);
      return String(value);
    }
  }
}
