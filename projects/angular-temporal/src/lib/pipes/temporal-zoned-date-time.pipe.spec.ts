import { TestBed } from '@angular/core/testing';
import { TemporalZonedDateTimePipe } from './temporal-zoned-date-time.pipe';
import { Temporal } from '@src/lib/utils/polyfill';

describe('TemporalZonedDateTimePipe', () => {
  let pipe: TemporalZonedDateTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalZonedDateTimePipe]
    });
    pipe = TestBed.inject(TemporalZonedDateTimePipe);
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

  it('should format ZonedDateTime', () => {
    const zonedDateTime = Temporal.ZonedDateTime.from('2023-12-25T14:30:45[America/New_York]');
    const result = pipe.transform(zonedDateTime);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format string zoned datetime', () => {
    const result = pipe.transform('2023-12-25T14:30:45Z', undefined, undefined);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle invalid input gracefully', () => {
    const result = pipe.transform('invalid-zoned-datetime');
    expect(result).toBe('');
  });

  it('should format with options', () => {
    const zonedDateTime = Temporal.ZonedDateTime.from('2023-12-25T14:30:45[America/New_York]');
    const result = pipe.transform(zonedDateTime, undefined, { dateStyle: 'full', timeStyle: 'medium' } as any);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format with locale', () => {
    const zonedDateTime = Temporal.ZonedDateTime.from('2023-12-25T14:30:45[America/New_York]');
    const result = pipe.transform(zonedDateTime, undefined, undefined, 'fr-FR');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
