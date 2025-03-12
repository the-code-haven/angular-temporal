import { Pipe, PipeTransform } from '@angular/core';
import { TemporalService } from '../services/temporal.service';
import { TemporalDateLike } from '../models/temporal-types';

@Pipe({
  name: 'temporalRelative'
})
export class TemporalRelativePipe implements PipeTransform {
  constructor(private temporalService: TemporalService) {}

  transform(
    value: TemporalDateLike,
    referenceDate?: TemporalDateLike
  ): string {
    if (!value) {
      return '';
    }

    try {
      const date = this.temporalService.toPlainDate(value);
      const reference = referenceDate 
        ? this.temporalService.toPlainDate(referenceDate)
        : this.temporalService.now().date();
      
      const duration = reference.until(date, {
        largestUnit: 'year'
      });
      
      const { years, months, days } = duration;
      
      if (years !== 0) {
        const absYears = Math.abs(years);
        return `${years > 0 ? 'in' : ''} ${absYears} ${absYears === 1 ? 'year' : 'years'} ${years < 0 ? 'ago' : ''}`;
      }
      
      if (months !== 0) {
        const absMonths = Math.abs(months);
        return `${months > 0 ? 'in' : ''} ${absMonths} ${absMonths === 1 ? 'month' : 'months'} ${months < 0 ? 'ago' : ''}`;
      }
      
      if (days !== 0) {
        const absDays = Math.abs(days);
        
        if (absDays === 1) {
          return days === 1 ? 'tomorrow' : 'yesterday';
        }
        
        if (absDays < 7) {
          return `${days > 0 ? 'in' : ''} ${absDays} days ${days < 0 ? 'ago' : ''}`;
        }
        
        const absWeeks = Math.floor(absDays / 7);
        return `${days > 0 ? 'in' : ''} ${absWeeks} ${absWeeks === 1 ? 'week' : 'weeks'} ${days < 0 ? 'ago' : ''}`;
      }
      
      return 'today';
    } catch (error) {
      console.error('Error formatting relative date with Temporal:', error);
      return String(value);
    }
  }
}
