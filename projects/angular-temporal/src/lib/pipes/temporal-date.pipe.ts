import { inject, input, Pipe, PipeTransform, signal } from '@angular/core';

import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';
import { Temporal } from '../utils/polyfill';

@Pipe({
  name: 'temporalDate',
  standalone: true
})
export class TemporalDatePipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | string | Date | null | undefined,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      const plainDate = this.temporalService.toPlainDate(value);
      return this.temporalService.format(plainDate, options, locale);
    } catch (error) {
      console.warn('TemporalDatePipe: Invalid date value', error);
      return '';
    }
  }
}
