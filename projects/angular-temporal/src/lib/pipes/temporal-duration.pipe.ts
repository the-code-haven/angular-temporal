import { Pipe, PipeTransform } from '@angular/core';
import { TemporalService } from '../services/temporal.service';
import { TemporalDurationLike } from '../models/temporal-types';
import { TemporalDurationDisplayStyle } from '../models';

@Pipe({
  name: 'temporalDuration'
})
export class TemporalDurationPipe implements PipeTransform {
  constructor(private temporalService: TemporalService) {}

  transform(
    value: TemporalDurationLike,
    formatOptions: Intl.NumberFormatOptions = {
        style: 'unit',
        unitDisplay: 'long',
    },
    displayStyle: TemporalDurationDisplayStyle = 'long',
    locale: string = 'en-US'
  ): string {
    if (!value) {
      return '';
    }

    try {
      return this.temporalService.formatDuration(value, formatOptions, displayStyle, locale);
    } catch (error) {
      console.error('Error formatting duration with Temporal:', error);
      return String(value);
    }
  }
}
