import { Pipe, PipeTransform, inject, input } from '@angular/core';
import { Temporal } from '../utils/polyfill';
import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';

@Pipe({
  name: 'temporalZonedDateTime',
  standalone: true
})
export class TemporalZonedDateTimePipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.ZonedDateTime | string | Date | number | null | undefined,
    timezone?: string,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      const zonedDateTime = this.temporalService.toZonedDateTime(value, timezone);
      return this.temporalService.format(zonedDateTime, options, locale);
    } catch (error) {
      console.warn('TemporalZonedDateTimePipe: Invalid zoned datetime value', error);
      return '';
    }
  }
}
