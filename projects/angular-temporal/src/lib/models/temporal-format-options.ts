export interface TemporalDateFormatOptions {
    calendar?: string;
    era?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    weekday?: 'long' | 'short' | 'narrow';
    dayPeriod?: 'long' | 'short' | 'narrow';
    locale?: string;
  }
  
  export interface TemporalTimeFormatOptions {
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    fractionalSecondDigits?: 1 | 2 | 3;
    dayPeriod?: 'long' | 'short' | 'narrow';
    hour12?: boolean;
    locale?: string;
  }
  
  export interface TemporalDateTimeFormatOptions extends TemporalDateFormatOptions, TemporalTimeFormatOptions {
    timeZone?: string;
    timeZoneName?: 'long' | 'short' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric';
  }
  
  export type TemporalDurationDisplayStyle = 'long' | 'short' | 'narrow' | 'digital'
  