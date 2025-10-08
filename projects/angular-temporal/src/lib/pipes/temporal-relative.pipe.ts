import { inject, input, Pipe, PipeTransform } from '@angular/core';

import { TemporalService } from '../services/temporal.service';
import { Temporal } from '../utils/polyfill';

@Pipe({
  name: 'temporalRelative',
  standalone: true
})
export class TemporalRelativePipe implements PipeTransform {
  private temporalService = inject(TemporalService);

  transform(
    value: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | string | Date | null | undefined,
    referenceDate?: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | string | Date
  ): string {
    if (!value) {
      return '';
    }

    try {
      const targetDate = this.temporalService.toPlainDate(value);
      const refDate = referenceDate ? this.temporalService.toPlainDate(referenceDate) : this.temporalService.now().plainDate();
      
      const daysDiff = this.temporalService.differenceInDays(targetDate, refDate);
      
      if (daysDiff === 0) {
        return 'Today';
      } else if (daysDiff === 1) {
        return 'Tomorrow';
      } else if (daysDiff === -1) {
        return 'Yesterday';
      } else if (daysDiff > 0) {
        return `In ${daysDiff} day${daysDiff === 1 ? '' : 's'}`;
      } else {
        return `${Math.abs(daysDiff)} day${Math.abs(daysDiff) === 1 ? '' : 's'} ago`;
      }
    } catch (error) {
      console.warn('TemporalRelativePipe: Invalid date value', error);
      return '';
    }
  }
}
