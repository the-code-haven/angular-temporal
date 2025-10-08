import { inject, input, Pipe, PipeTransform } from '@angular/core';

import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';
import { Temporal } from '../utils/polyfill';

@Pipe({
  name: 'temporalTime',
  standalone: true
})
export class TemporalTimePipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.PlainTime | string | Date | null | undefined,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      const plainTime = this.temporalService.toPlainTime(value);
      return this.temporalService.format(plainTime, options, locale);
    } catch (error) {
      console.warn('TemporalTimePipe: Invalid time value', error);
      return '';
    }
  }
}
