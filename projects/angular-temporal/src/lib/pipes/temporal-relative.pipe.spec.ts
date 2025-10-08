import { TestBed } from '@angular/core/testing';
import { TemporalRelativePipe } from './temporal-relative.pipe';
import { Temporal } from '../utils/polyfill';

describe('TemporalRelativePipe', () => {
  let pipe: TemporalRelativePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalRelativePipe]
    });
    pipe = TestBed.inject(TemporalRelativePipe);
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

  it('should format relative time for PlainDate', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    const result = pipe.transform(date);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format relative time for string date', () => {
    const result = pipe.transform('2023-12-25');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format relative time for PlainDateTime', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    const result = pipe.transform(dateTime);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format relative time for ZonedDateTime', () => {
    const zonedDateTime = Temporal.ZonedDateTime.from('2023-12-25T14:30:45[America/New_York]');
    const result = pipe.transform(zonedDateTime);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle invalid input gracefully', () => {
    const result = pipe.transform('invalid-relative');
    expect(result).toBe('');
  });

  it('should format with reference date', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    const refDate = Temporal.PlainDate.from('2023-12-20');
    const result = pipe.transform(date, refDate);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
