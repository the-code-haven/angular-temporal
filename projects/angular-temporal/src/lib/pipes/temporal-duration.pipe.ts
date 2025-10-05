import { Pipe, PipeTransform, inject, input } from '@angular/core';
import { Temporal } from '../utils/polyfill';
import { TemporalService } from '../services/temporal.service';
import { TemporalFormatOptions } from '../types/temporal.types';

@Pipe({
  name: 'temporalDuration',
  standalone: true
})
export class TemporalDurationPipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.Duration | string | Temporal.DurationLike | null | undefined,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    if (!value) {
      return '';
    }

    try {
      let duration: Temporal.Duration;
      
      if (value instanceof Temporal.Duration) {
        duration = value;
      } else if (typeof value === 'string') {
        duration = Temporal.Duration.from(value);
      } else {
        duration = Temporal.Duration.from(value);
      }

      return duration.toString();
    } catch (error) {
      console.warn('TemporalDurationPipe: Invalid duration value', error);
      return '';
    }
  }
}
