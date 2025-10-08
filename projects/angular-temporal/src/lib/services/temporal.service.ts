import { computed, Injectable, signal } from '@angular/core';

import {
    TemporalComparisonResult, TemporalFormatOptions, TemporalFormValue, TemporalRange,
    TemporalServiceConfig, TemporalValidationResult
} from '../types/temporal.types';
import { Temporal, temporalPolyfill } from '../utils/polyfill';

@Injectable({
  providedIn: 'root'
})
export class TemporalService {
  private config = signal<TemporalServiceConfig>({
    defaultLocale: 'en-US',
    defaultTimezone: 'UTC',
    defaultCalendar: 'iso8601'
  });

  public readonly defaultLocale = computed(() => this.config().defaultLocale || 'en-US');
  public readonly defaultTimezone = computed(() => this.config().defaultTimezone || 'UTC');
  public readonly defaultCalendar = computed(() => this.config().defaultCalendar || 'iso8601');

  constructor() {
    if (!temporalPolyfill.isAvailable()) {
      console.warn('Temporal polyfill is not available. Some features may not work correctly.');
    }
    
    const validation = temporalPolyfill.validateFeatures();
    if (!validation.isValid) {
      console.warn('Missing Temporal features:', validation.missingFeatures);
    }
  }

  setConfig(config: Partial<TemporalServiceConfig>): void {
    this.config.update(current => ({ ...current, ...config }));
  }

  getConfig(): TemporalServiceConfig {
    return { ...this.config() };
  }
  now(): {
    instant(): Temporal.Instant;
    plainDate(): Temporal.PlainDate;
    plainTime(): Temporal.PlainTime;
    plainDateTime(): Temporal.PlainDateTime;
    zonedDateTime(timezone?: string): Temporal.ZonedDateTime;
  } {
    return {
      instant: () => Temporal.Now.instant(),
      plainDate: () => Temporal.Now.plainDate(this.defaultCalendar()),
      plainTime: () => Temporal.Now.plainTimeISO(),
      plainDateTime: () => Temporal.Now.plainDateTime(this.defaultCalendar()),
      zonedDateTime: (timezone = this.defaultTimezone()) => 
        Temporal.Now.zonedDateTime(this.defaultCalendar(), timezone)
    };
  }

  toPlainDate(value: string | Date | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.PlainDate {
    if (value instanceof Temporal.PlainDate) {
      return value;
    }
    if (value instanceof Temporal.PlainDateTime) {
      return value.toPlainDate();
    }
    if (value instanceof Temporal.ZonedDateTime) {
      return value.toPlainDate();
    }
    if (value instanceof Date) {
      return Temporal.PlainDate.from(value.toISOString().split('T')[0]);
    }
    return Temporal.PlainDate.from(value);
  }

  toPlainTime(value: string | Date | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.PlainTime {
    if (value instanceof Temporal.PlainTime) {
      return value;
    }
    if (value instanceof Temporal.PlainDateTime) {
      return value.toPlainTime();
    }
    if (value instanceof Temporal.ZonedDateTime) {
      return value.toPlainTime();
    }
    if (value instanceof Date) {
      const timeString = value.toTimeString().split(' ')[0];
      return Temporal.PlainTime.from(timeString);
    }
    return Temporal.PlainTime.from(value);
  }

  toPlainDateTime(value: string | Date | Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.PlainDateTime {
    if (value instanceof Temporal.PlainDateTime) {
      return value;
    }
    if (value instanceof Temporal.ZonedDateTime) {
      return value.toPlainDateTime();
    }
    if (value instanceof Date) {
      return Temporal.PlainDateTime.from(value.toISOString().replace('Z', ''));
    }
    return Temporal.PlainDateTime.from(value);
  }

  toZonedDateTime(value: string | Date | number | Temporal.ZonedDateTime, timezone?: string): Temporal.ZonedDateTime {
    const tz = timezone || this.defaultTimezone();
    const calendar = this.defaultCalendar();
    
    if (value instanceof Temporal.ZonedDateTime) {
      return value.withTimeZone(tz);
    }
    if (value instanceof Date) {
      return Temporal.Instant.fromEpochMilliseconds(value.getTime()).toZonedDateTime({ timeZone: tz, calendar });
    }
    if (typeof value === 'number') {
      return Temporal.Instant.fromEpochMilliseconds(value).toZonedDateTime({ timeZone: tz, calendar });
    }
    return Temporal.ZonedDateTime.from(`${value}[${tz}]`);
  }

  toInstant(value: string | Date | number | Temporal.Instant): Temporal.Instant {
    if (value instanceof Temporal.Instant) {
      return value;
    }
    if (value instanceof Date) {
      return Temporal.Instant.fromEpochMilliseconds(value.getTime());
    }
    if (typeof value === 'number') {
      return Temporal.Instant.fromEpochMilliseconds(value);
    }
    return Temporal.Instant.from(value);
  }

  add(
    date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    duration: Temporal.DurationLike
  ): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime {
    return date.add(duration);
  }

  subtract(
    date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    duration: Temporal.DurationLike
  ): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime {
    return date.subtract(duration);
  }

  isBefore(
    date1: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): boolean {
    return date1.until(date2).sign > 0;
  }

  isAfter(
    date1: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): boolean {
    return date1.since(date2).sign > 0;
  }

  isEqual(
    date1: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): boolean {
    return date1.equals(date2);
  }

  compare(
    date1: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): TemporalComparisonResult {
    const difference = date1.until(date2);
    return {
      isBefore: difference.sign > 0,
      isAfter: difference.sign < 0,
      isEqual: difference.sign === 0,
      difference
    };
  }

  differenceInDays(
    date1: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): number {
    return date1.until(date2).total({ unit: 'days' });
  }

  differenceInHours(
    date1: Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): number {
    return date1.until(date2).total({ unit: 'hours' });
  }

  differenceInMinutes(
    date1: Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): number {
    return date1.until(date2).total({ unit: 'minutes' });
  }

  differenceInSeconds(
    date1: Temporal.PlainDateTime | Temporal.ZonedDateTime,
    date2: Temporal.PlainDateTime | Temporal.ZonedDateTime
  ): number {
    return date1.until(date2).total({ unit: 'seconds' });
  }

  isValidDate(value: any): boolean {
    try {
      this.toPlainDate(value);
      return true;
    } catch {
      return false;
    }
  }

  isValidTime(value: any): boolean {
    try {
      this.toPlainTime(value);
      return true;
    } catch {
      return false;
    }
  }

  isValidDateTime(value: any): boolean {
    try {
      this.toPlainDateTime(value);
      return true;
    } catch {
      return false;
    }
  }

  validate(value: any, type: 'date' | 'time' | 'datetime'): TemporalValidationResult {
    const errors: string[] = [];
    
    try {
      switch (type) {
        case 'date':
          this.toPlainDate(value);
          break;
        case 'time':
          this.toPlainTime(value);
          break;
        case 'datetime':
          this.toPlainDateTime(value);
          break;
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid value');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isInRange(
    date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
    range: TemporalRange
  ): boolean {
    return !this.isBefore(date, range.start) && !this.isAfter(date, range.end);
  }

  format(
    value: Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Duration,
    options?: TemporalFormatOptions,
    locale?: string
  ): string {
    const formatLocale = locale || this.defaultLocale();
    
    if (value instanceof Temporal.PlainDate) {
      return value.toLocaleString(formatLocale, options);
    }
    if (value instanceof Temporal.PlainTime) {
      return value.toLocaleString(formatLocale, options);
    }
    if (value instanceof Temporal.PlainDateTime) {
      return value.toLocaleString(formatLocale, options);
    }
    if (value instanceof Temporal.ZonedDateTime) {
      return value.toLocaleString(formatLocale, options);
    }
    if (value instanceof Temporal.Duration) {
      return value.toString();
    }
    
    return String(value);
  }

  startOfDay(date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.PlainDateTime | Temporal.ZonedDateTime {
    if (date instanceof Temporal.PlainDate) {
      return date.toPlainDateTime({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    if (date instanceof Temporal.PlainDateTime) {
      return date.with({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    if (date instanceof Temporal.ZonedDateTime) {
      return date.with({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }
    return date;
  }

  endOfDay(date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.PlainDateTime | Temporal.ZonedDateTime {
    if (date instanceof Temporal.PlainDate) {
      return date.toPlainDateTime({ hour: 23, minute: 59, second: 59, millisecond: 999 });
    }
    if (date instanceof Temporal.PlainDateTime) {
      return date.with({ hour: 23, minute: 59, second: 59, millisecond: 999 });
    }
    if (date instanceof Temporal.ZonedDateTime) {
      return date.with({ hour: 23, minute: 59, second: 59, millisecond: 999 });
    }
    return date;
  }

  // Calendar methods
  getDaysInMonth(year: number, month: number): number {
    const date = Temporal.PlainDate.from({ year, month, day: 1 });
    return date.daysInMonth;
  }

  getDaysInYear(year: number): number {
    const date = Temporal.PlainDate.from({ year, month: 1, day: 1 });
    return date.daysInYear;
  }

  isLeapYear(year: number): boolean {
    const date = Temporal.PlainDate.from({ year, month: 1, day: 1 });
    return date.inLeapYear;
  }

  // Timezone methods
  getAvailableTimezones(): string[] {
    // This would typically come from a timezone database
    // For now, return common timezones
    return [
      'UTC',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Australia/Sydney'
    ];
  }

  convertTimezone(
    date: Temporal.PlainDateTime | Temporal.ZonedDateTime,
    fromTimezone: string,
    toTimezone: string
  ): Temporal.ZonedDateTime {
    if (date instanceof Temporal.PlainDateTime) {
      return date.toZonedDateTime(fromTimezone).withTimeZone(toTimezone);
    }
    return date.withTimeZone(toTimezone);
  }
}
