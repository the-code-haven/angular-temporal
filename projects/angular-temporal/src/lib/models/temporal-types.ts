import { Temporal } from '../utils/polyfill';

// Common types for Temporal values
export type TemporalDateLike = Temporal.PlainDate | string | object | null;
export type TemporalTimeLike = Temporal.PlainTime | string | object | null;
export type TemporalDateTimeLike = Temporal.PlainDateTime | string | object | null;
export type TemporalZonedDateTimeLike = Temporal.ZonedDateTime | string | object | null;
export type TemporalDurationLike = Temporal.Duration | string | object | null;

// Re-export the Temporal API for convenience
export { Temporal };
