import { Temporal } from '@src/lib/utils/polyfill';
import { Signal } from '@angular/core';
import type { TemporalFormatOptions, TemporalFormatPresetKey } from '@src/lib/types/temporal-format-options';

export { Temporal };
export type PlainDate = Temporal.PlainDate;
export type PlainTime = Temporal.PlainTime;
export type PlainDateTime = Temporal.PlainDateTime;
export type ZonedDateTime = Temporal.ZonedDateTime;
export type Instant = Temporal.Instant;
export type Duration = Temporal.Duration;
export type Calendar = Temporal.Calendar;
export type TimeZone = Temporal.TimeZone;
export type PlainYearMonth = Temporal.PlainYearMonth;
export type PlainMonthDay = Temporal.PlainMonthDay;

export type { TemporalFormatOptions, TemporalFormatPresetKey };

export interface TemporalInputConfig {
  type: 'date' | 'time' | 'datetime';
  format?: string;
  locale?: string;
  timezone?: string;
  calendar?: string;
}

export interface TemporalPickerConfig {
  minYear?: number;
  maxYear?: number;
  locale?: string;
  calendar?: string;
  timezone?: string;
  showSeconds?: boolean;
  use12HourFormat?: boolean;
  minuteStep?: number;
  secondStep?: number;
  customClasses?: Record<string, string>;
  customDateClasses?: Record<string, string>;
  customTimeClasses?: Record<string, string>;
}

export interface TemporalServiceConfig {
  defaultLocale?: string;
  defaultTimezone?: string;
  defaultCalendar?: string;
}

export interface TemporalComparisonResult {
  isBefore: boolean;
  isAfter: boolean;
  isEqual: boolean;
  difference: Temporal.Duration;
}

export interface TemporalRange {
  start: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime;
  end: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime;
}

export interface TemporalValidationResult {
  isValid: boolean;
  errors: string[];
}

export type TemporalFormValue = 
  | Temporal.PlainDate 
  | Temporal.PlainTime 
  | Temporal.PlainDateTime 
  | Temporal.ZonedDateTime 
  | null 
  | undefined;

export interface TemporalFormControl {
  value: TemporalFormValue;
  valid: boolean;
  errors: string[] | null;
  touched: boolean;
  dirty: boolean;
}

export interface TemporalSignalConfig<T = any> {
  value: Signal<T>;
  setValue: (value: T) => void;
  updateValue: (fn: (current: T) => T) => void;
}

export interface TemporalComponentConfig {
  minYear: Signal<number | undefined>;
  maxYear: Signal<number | undefined>;
  locale: Signal<string | undefined>;
  calendar: Signal<string | undefined>;
  timezone: Signal<string | undefined>;
  showSeconds: Signal<boolean | undefined>;
  use12HourFormat: Signal<boolean | undefined>;
  minuteStep: Signal<number | undefined>;
  secondStep: Signal<number | undefined>;
  customClasses: Signal<Record<string, string> | undefined>;
  customDateClasses: Signal<Record<string, string> | undefined>;
  customTimeClasses: Signal<Record<string, string> | undefined>;
  
  valueChange: Signal<(value: any) => void>;
  dateChange: Signal<(value: PlainDate | null) => void>;
  timeChange: Signal<(value: PlainTime | null) => void>;
  dateTimeChange: Signal<(value: PlainDateTime | null) => void>;
}

export interface TemporalDirectiveConfig {
  temporalInput: Signal<'date' | 'time' | 'datetime'>;
  temporalConfig: Signal<Partial<TemporalInputConfig> | undefined>;
  temporalTimezone: Signal<string>;
  temporalValue: Signal<any>;
  temporalFormat: Signal<TemporalFormatOptions | undefined>;
  temporalLocale: Signal<string | undefined>;
}

export interface TemporalPipeConfig {
  options: Signal<TemporalFormatOptions | undefined>;
  locale: Signal<string | undefined>;
  timezone: Signal<string | undefined>;
}
