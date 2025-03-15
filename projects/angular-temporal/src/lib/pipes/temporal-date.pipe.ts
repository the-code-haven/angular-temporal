import { Pipe, PipeTransform } from '@angular/core';
import { TemporalService } from '../services/temporal.service';
import { TemporalDateLike } from '../models/temporal-types';
import { TemporalDateFormatOptions } from '../models/temporal-format-options';

@Pipe({
  name: 'temporalDate'
})
export class TemporalDatePipe implements PipeTransform {
  constructor(private temporalService: TemporalService) {}

  transform(
    value: TemporalDateLike,
    formatOptions: TemporalDateFormatOptions = {},
    locale: string = 'en-US'
  ): string {
    if (!value) {
      return '';
    }

    try {
      const date = this.temporalService.toPlainDate(value);
      return date.toLocaleString(locale, formatOptions);
    } catch (error) {
      console.error('Error formatting date with Temporal:', error);
      return String(value);
    }
  }
}
