import { TestBed } from '@angular/core/testing';
import { TemporalTimePipe } from './temporal-time.pipe';
import { Temporal } from '../utils/polyfill';

describe('TemporalTimePipe', () => {
  let pipe: TemporalTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalTimePipe]
    });
    pipe = TestBed.inject(TemporalTimePipe);
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

  it('should format PlainTime', () => {
    const time = Temporal.PlainTime.from('14:30:45');
    const result = pipe.transform(time);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format string time', () => {
    const result = pipe.transform('14:30:45');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format PlainDateTime', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    const result = pipe.transform(dateTime as any);
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
    const result = pipe.transform('invalid-time');
    expect(result).toBe('');
  });

  it('should format with options', () => {
    const time = Temporal.PlainTime.from('14:30:45');
    const result = pipe.transform(time, { timeStyle: 'full' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format with locale', () => {
    const time = Temporal.PlainTime.from('14:30:45');
    const result = pipe.transform(time, undefined, 'fr-FR');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
