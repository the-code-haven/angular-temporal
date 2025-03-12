import { Injectable } from '@angular/core';
import { Temporal } from '../utils/polyfill';
import { 
  TemporalDateLike, 
  TemporalTimeLike, 
  TemporalDateTimeLike,
  TemporalZonedDateTimeLike,
  TemporalDurationLike
} from '../models/temporal-types';
import { TemporalDurationDisplayStyle } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TemporalService {
  public readonly Temporal = Temporal;

  // Conversion methods
  toPlainDate(date: TemporalDateLike): Temporal.PlainDate {
    if (date instanceof Temporal.PlainDate) {
      return date;
    } else if (date instanceof Temporal.PlainDateTime) {
      return date.toPlainDate();
    } else if (date instanceof Date) {
      return Temporal.PlainDate.from({
        year: date.getFullYear(),
        month: date.getMonth() + 1, // JavaScript Date months are 0-based
        day: date.getDate()
      });
    } else if (typeof date === 'string') {
      return Temporal.PlainDate.from(date);
    } else if (typeof date === 'number') {
      return this.toPlainDate(new Date(date));
    }
    throw new Error('Invalid date format');
  }

  toPlainTime(time: TemporalTimeLike): Temporal.PlainTime {
    if (time instanceof Temporal.PlainTime) {
      return time;
    } else if (time instanceof Temporal.PlainDateTime) {
      return time.toPlainTime();
    } else if (time instanceof Date) {
      return Temporal.PlainTime.from({
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
        millisecond: time.getMilliseconds()
      });
    } else if (typeof time === 'string') {
      return Temporal.PlainTime.from(time);
    } else if (typeof time === 'number') {
      return this.toPlainTime(new Date(time));
    }
    throw new Error('Invalid time format');
  }

  toPlainDateTime(dateTime: TemporalDateTimeLike): Temporal.PlainDateTime {
    if (dateTime instanceof Temporal.PlainDateTime) {
      return dateTime;
    } else if (dateTime instanceof Date) {
      return Temporal.PlainDateTime.from({
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1,
        day: dateTime.getDate(),
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes(),
        second: dateTime.getSeconds(),
        millisecond: dateTime.getMilliseconds()
      });
    } else if (typeof dateTime === 'string') {
      return Temporal.PlainDateTime.from(dateTime);
    } else if (typeof dateTime === 'number') {
      return this.toPlainDateTime(new Date(dateTime));
    }
    throw new Error('Invalid datetime format');
  }

  toZonedDateTime(dateTime: TemporalZonedDateTimeLike, timeZone?: string): Temporal.ZonedDateTime {
    if (dateTime instanceof Temporal.ZonedDateTime) {
      return timeZone ? dateTime.withTimeZone(timeZone) : dateTime;
    } else if (dateTime instanceof Date) {
      return Temporal.Instant.fromEpochMilliseconds(dateTime.getTime())
        .toZonedDateTimeISO(timeZone || Temporal.Now.timeZoneId());
    } else if (typeof dateTime === 'string') {
      return Temporal.ZonedDateTime.from(dateTime);
    } else if (typeof dateTime === 'number') {
      return this.toZonedDateTime(new Date(dateTime), timeZone);
    }
    throw new Error('Invalid zoned datetime format');
  }

  toDuration(duration: TemporalDurationLike): Temporal.Duration {
    if (duration instanceof Temporal.Duration) {
      return duration;
    } else if (typeof duration === 'string') {
      return Temporal.Duration.from(duration);
    } else if (typeof duration === 'number') {
      return Temporal.Duration.from({ milliseconds: duration });
    } else if (typeof duration === 'object') {
      return Temporal.Duration.from({...duration});
    }
    throw new Error('Invalid duration format');
  }

  // Date comparison and calculation methods
  compare(date1: TemporalDateLike, date2: TemporalDateLike): number {
    const plainDate1 = this.toPlainDate(date1);
    const plainDate2 = this.toPlainDate(date2);
    return Temporal.PlainDate.compare(plainDate1, plainDate2);
  }

  isAfter(date1: TemporalDateLike, date2: TemporalDateLike): boolean {
    return this.compare(date1, date2) > 0;
  }

  isBefore(date1: TemporalDateLike, date2: TemporalDateLike): boolean {
    return this.compare(date1, date2) < 0;
  }

  isSame(date1: TemporalDateLike, date2: TemporalDateLike): boolean {
    return this.compare(date1, date2) === 0;
  }

  add(date: TemporalDateLike, duration: TemporalDurationLike): Temporal.PlainDate {
    const plainDate = this.toPlainDate(date);
    const temporalDuration = this.toDuration(duration);
    return plainDate.add(temporalDuration);
  }

  subtract(date: TemporalDateLike, duration: TemporalDurationLike): Temporal.PlainDate {
    const plainDate = this.toPlainDate(date);
    const temporalDuration = this.toDuration(duration);
    return plainDate.subtract(temporalDuration);
  }

  differenceInDays(date1: TemporalDateLike, date2: TemporalDateLike): number {
    const plainDate1 = this.toPlainDate(date1);
    const plainDate2 = this.toPlainDate(date2);
    return plainDate1.until(plainDate2).days;
  }

  differenceInMonths(date1: TemporalDateLike, date2: TemporalDateLike): number {
    const plainDate1 = this.toPlainDate(date1);
    const plainDate2 = this.toPlainDate(date2);
    const { years, months } = plainDate1.until(plainDate2);
    return years * 12 + months;
  }

  differenceInYears(date1: TemporalDateLike, date2: TemporalDateLike): number {
    const plainDate1 = this.toPlainDate(date1);
    const plainDate2 = this.toPlainDate(date2);
    return plainDate1.until(plainDate2).years;
  }

  startOfDay(date: TemporalDateTimeLike): Temporal.PlainDateTime {
    const plainDateTime = this.toPlainDateTime(date);
    return plainDateTime.with({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      microsecond: 0,
      nanosecond: 0
    });
  }

  endOfDay(date: TemporalDateTimeLike): Temporal.PlainDateTime {
    const plainDateTime = this.toPlainDateTime(date);
    return plainDateTime.with({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
      microsecond: 999,
      nanosecond: 999
    });
  }

  startOfMonth(date: TemporalDateLike): Temporal.PlainDate {
    const plainDate = this.toPlainDate(date);
    return plainDate.with({ day: 1 });
  }

  endOfMonth(date: TemporalDateLike): Temporal.PlainDate {
    const plainDate = this.toPlainDate(date);
    const nextMonth = plainDate.add({ months: 1 }).with({ day: 1 });
    return nextMonth.subtract({ days: 1 });
  }

  startOfYear(date: TemporalDateLike): Temporal.PlainDate {
    const plainDate = this.toPlainDate(date);
    return plainDate.with({ month: 1, day: 1 });
  }

  endOfYear(date: TemporalDateLike): Temporal.PlainDate {
    const plainDate = this.toPlainDate(date);
    return plainDate.with({ month: 12, day: 31 });
  }

  // Current date/time methods
  now(): {
    date: () => Temporal.PlainDate;
    time: () => Temporal.PlainTime;
    dateTime: () => Temporal.PlainDateTime;
    zonedDateTime: (timeZone?: string) => Temporal.ZonedDateTime;
  } {
    return {
      date: () => Temporal.Now.plainDateISO(),
      time: () => Temporal.Now.plainTimeISO(),
      dateTime: () => Temporal.Now.plainDateTimeISO(),
      zonedDateTime: (timeZone?: string) => Temporal.Now.zonedDateTimeISO(timeZone)
    };
  }

  // Formatting methods
  format(
    value: TemporalDateLike | TemporalTimeLike | TemporalDateTimeLike | TemporalZonedDateTimeLike,
    formatOptions: Intl.DateTimeFormatOptions & { locale?: string } = {}
  ): string {
    const { locale = 'en-US', ...options } = formatOptions;
    
    if (value instanceof Temporal.PlainDate || 
        value instanceof Temporal.PlainTime || 
        value instanceof Temporal.PlainDateTime || 
        value instanceof Temporal.ZonedDateTime) {
      return value.toLocaleString(locale, options);
    } else if (value instanceof Date) {
      return value.toLocaleString(locale, options);
    } else if (typeof value === 'string' || typeof value === 'number') {
      try {
        const date = new Date(value);
        return date.toLocaleString(locale, options);
      } catch (e) {
        return String(value);
      }
    }
    
    return String(value);
  }

  formatDuration(
    duration: TemporalDurationLike,
    options: Intl.DateTimeFormatOptions,
    displayStyle: TemporalDurationDisplayStyle,
    locale = 'en-US',
  ): string {
    const temporalDuration = this.toDuration(duration);
    
    if (displayStyle === 'digital') {
      // Format as digital clock: HH:MM:SS
      const hours = String(temporalDuration.hours).padStart(2, '0');
      const minutes = String(temporalDuration.minutes).padStart(2, '0');
      const seconds = String(temporalDuration.seconds).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    
    return temporalDuration.toLocaleString(locale, options);
  }
}
