/**
 * Comprehensive formatting options for Temporal objects
 * Based on Intl.DateTimeFormat options and Temporal-specific extensions
 */

export interface TemporalFormatOptions {
  // Date formatting options
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  
  // Year formatting
  year?: 'numeric' | '2-digit';
  
  // Month formatting
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  
  // Day formatting
  day?: 'numeric' | '2-digit';
  
  // Time formatting
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  fractionalSecondDigits?: 1 | 2 | 3;
  
  // Time zone formatting
  timeZoneName?: 'long' | 'short' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric';
  
  // Hour format
  hour12?: boolean;
  
  // Weekday formatting
  weekday?: 'long' | 'short' | 'narrow';
  
  // Era formatting
  era?: 'long' | 'short' | 'narrow';
  
  // Time zone
  timeZone?: string;
  
  // Calendar system
  calendar?: string;
  
  // Numbering system
  numberingSystem?: string;
  
  // Duration specific options
  style?: 'long' | 'short' | 'narrow';
  
  // Relative time formatting
  relativeStyle?: 'auto' | 'always' | 'never';
  
  // Numeric formatting
  numeric?: 'always' | 'auto';
  
  // Sign display
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
  
  // Unit display
  unitDisplay?: 'long' | 'short' | 'narrow';
  
  // List formatting
  listStyle?: 'long' | 'short' | 'narrow';
  
  // Compact display
  compactDisplay?: 'short' | 'long';
  
  // Notation
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  
  // Use grouping
  useGrouping?: boolean | 'auto' | 'always' | 'min2' | 'thousands';
  
  // Minimum integer digits
  minimumIntegerDigits?: number;
  
  // Minimum fraction digits
  minimumFractionDigits?: number;
  
  // Maximum fraction digits
  maximumFractionDigits?: number;
  
  // Minimum significant digits
  minimumSignificantDigits?: number;
  
  // Maximum significant digits
  maximumSignificantDigits?: number;
}

/**
 * Predefined format options for common use cases
 */
export const TemporalFormatPresets = {
  // Date presets
  dateFull: { dateStyle: 'full' } as TemporalFormatOptions,
  dateLong: { dateStyle: 'long' } as TemporalFormatOptions,
  dateMedium: { dateStyle: 'medium' } as TemporalFormatOptions,
  dateShort: { dateStyle: 'short' } as TemporalFormatOptions,
  
  // Time presets
  timeFull: { timeStyle: 'full' } as TemporalFormatOptions,
  timeLong: { timeStyle: 'long' } as TemporalFormatOptions,
  timeMedium: { timeStyle: 'medium' } as TemporalFormatOptions,
  timeShort: { timeStyle: 'short' } as TemporalFormatOptions,
  
  // DateTime presets
  dateTimeFull: { dateStyle: 'full', timeStyle: 'full' } as TemporalFormatOptions,
  dateTimeLong: { dateStyle: 'long', timeStyle: 'long' } as TemporalFormatOptions,
  dateTimeMedium: { dateStyle: 'medium', timeStyle: 'medium' } as TemporalFormatOptions,
  dateTimeShort: { dateStyle: 'short', timeStyle: 'short' } as TemporalFormatOptions,
  
  // ISO presets
  isoDate: { year: 'numeric', month: '2-digit', day: '2-digit' } as TemporalFormatOptions,
  isoTime: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false } as TemporalFormatOptions,
  isoDateTime: { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  } as TemporalFormatOptions,
  
  // Duration presets
  durationLong: { style: 'long' } as TemporalFormatOptions,
  durationShort: { style: 'short' } as TemporalFormatOptions,
  durationNarrow: { style: 'narrow' } as TemporalFormatOptions,
  
  // Relative time presets
  relativeAuto: { relativeStyle: 'auto' } as TemporalFormatOptions,
  relativeAlways: { relativeStyle: 'always' } as TemporalFormatOptions,
  relativeNever: { relativeStyle: 'never' } as TemporalFormatOptions,
  
  // Compact presets
  compactShort: { notation: 'compact', compactDisplay: 'short' } as TemporalFormatOptions,
  compactLong: { notation: 'compact', compactDisplay: 'long' } as TemporalFormatOptions,
} as const;

/**
 * Type for format preset keys
 */
export type TemporalFormatPresetKey = keyof typeof TemporalFormatPresets;

/**
 * Utility function to get format options by preset key
 */
export function getFormatPreset(key: TemporalFormatPresetKey): TemporalFormatOptions {
  return TemporalFormatPresets[key];
}

/**
 * Utility function to merge format options
 */
export function mergeFormatOptions(
  base: TemporalFormatOptions,
  override: Partial<TemporalFormatOptions>
): TemporalFormatOptions {
  return { ...base, ...override };
}

/**
 * Utility function to validate format options
 */
export function validateFormatOptions(options: TemporalFormatOptions): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Validate dateStyle and timeStyle combination
  if (options.dateStyle && options.timeStyle) {
    // This is valid
  } else if (options.dateStyle && !options.timeStyle) {
    // This is valid for date-only formatting
  } else if (!options.dateStyle && options.timeStyle) {
    // This is valid for time-only formatting
  } else if (!options.dateStyle && !options.timeStyle) {
    // At least one should be provided or individual components
    if (!options.year && !options.month && !options.day && 
        !options.hour && !options.minute && !options.second) {
      errors.push('Either dateStyle/timeStyle or individual components must be specified');
    }
  }
  
  // Validate fractionalSecondDigits
  if (options.fractionalSecondDigits && 
      ![1, 2, 3].includes(options.fractionalSecondDigits)) {
    errors.push('fractionalSecondDigits must be 1, 2, or 3');
  }
  
  // Validate hour12 with hour format
  if (options.hour12 === true && options.hour === '2-digit') {
    // This might cause issues with 24-hour format
    errors.push('hour12: true with hour: "2-digit" may cause formatting issues');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
