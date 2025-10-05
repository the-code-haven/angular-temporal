import { Pipe, PipeTransform, inject, input } from '@angular/core';
import { Temporal } from '../utils/polyfill';
import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';

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
