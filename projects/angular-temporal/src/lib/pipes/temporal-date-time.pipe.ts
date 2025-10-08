import { inject, input, Pipe, PipeTransform } from '@angular/core';

import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';
import { Temporal } from '../utils/polyfill';

@Pipe({
  name: 'temporalDateTime',
  standalone: true
})
export class TemporalDateTimePipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.PlainDateTime | string | Date | null | undefined,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      const plainDateTime = this.temporalService.toPlainDateTime(value);
      return this.temporalService.format(plainDateTime, options, locale);
    } catch (error) {
      console.warn('TemporalDateTimePipe: Invalid datetime value', error);
      return '';
    }
  }
}
