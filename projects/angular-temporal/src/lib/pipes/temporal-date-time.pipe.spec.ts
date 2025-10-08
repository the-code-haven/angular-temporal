import { TestBed } from '@angular/core/testing';

import { Temporal } from '../utils/polyfill';
import { TemporalDateTimePipe } from './temporal-date-time.pipe';

describe('TemporalDateTimePipe', () => {
  let pipe: TemporalDateTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalDateTimePipe]
    });
    pipe = TestBed.inject(TemporalDateTimePipe);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null value', () => {
    const result = pipe.transform(null);
    expect(result).toBe('');
  });

  it('should return empty string for undefined value', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should format PlainDateTime', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    const result = pipe.transform(dateTime);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format string datetime', () => {
    const result = pipe.transform('2023-12-25T14:30:45');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format ZonedDateTime', () => {
    const zonedDateTime = Temporal.ZonedDateTime.from('2023-12-25T14:30:45[America/New_York]');
    const result = pipe.transform(zonedDateTime as any);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle invalid input gracefully', () => {
    const result = pipe.transform('invalid-datetime');
    expect(result).toBe('');
  });

  it('should format with options', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    const result = pipe.transform(dateTime, { dateStyle: 'full', timeStyle: 'medium' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format with locale', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    const result = pipe.transform(dateTime, undefined, 'fr-FR');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
