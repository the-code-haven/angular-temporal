import { Pipe, PipeTransform } from '@angular/core';
import { TemporalService } from '../services/temporal.service';
import { TemporalTimeLike } from '../models/temporal-types';
import { TemporalTimeFormatOptions } from '../models/temporal-format-options';

@Pipe({
  name: 'temporalTime'
})
export class TemporalTimePipe implements PipeTransform {
  constructor(private temporalService: TemporalService) {}

  transform(
    value: TemporalTimeLike,
    formatOptions: TemporalTimeFormatOptions = {},
    locale: string = 'en-US'
  ): string {
    if (!value) {
      return '';
    }

    try {
      const time = this.temporalService.toPlainTime(value);
      return time.toLocaleString(locale, formatOptions);
    } catch (error) {
      console.error('Error formatting time with Temporal:', error);
      return String(value);
    }
  }
}
