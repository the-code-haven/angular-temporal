import { TestBed } from '@angular/core/testing';

import { Temporal } from '../utils/polyfill';
import { TemporalDatePipe } from './temporal-date.pipe';

describe('TemporalDatePipe', () => {
  let pipe: TemporalDatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalDatePipe]
    });
    pipe = TestBed.inject(TemporalDatePipe);
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

  it('should format PlainDate', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    const result = pipe.transform(date);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format string date', () => {
    const result = pipe.transform('2023-12-25');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format Date object', () => {
    const date = new Date('2023-12-25');
    const result = pipe.transform(date);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format PlainDateTime', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:00');
    const result = pipe.transform(dateTime);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format ZonedDateTime', () => {
    const zonedDateTime = Temporal.ZonedDateTime.from('2023-12-25T14:30:00[America/New_York]');
    const result = pipe.transform(zonedDateTime);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle invalid date gracefully', () => {
    const result = pipe.transform('invalid-date');
    expect(result).toBe('');
  });

  it('should format with options', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    const result = pipe.transform(date, { dateStyle: 'full' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format with locale', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    const result = pipe.transform(date, undefined, 'fr-FR');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
