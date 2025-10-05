import { TestBed } from '@angular/core/testing';
import { TemporalDurationPipe } from './temporal-duration.pipe';
import { Temporal } from '@src/lib/utils/polyfill';

describe('TemporalDurationPipe', () => {
  let pipe: TemporalDurationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalDurationPipe]
    });
    pipe = TestBed.inject(TemporalDurationPipe);
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

  it('should format Duration', () => {
    const duration = Temporal.Duration.from('P1Y2M3DT4H5M6S');
    const result = pipe.transform(duration);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format string duration', () => {
    const result = pipe.transform('P1Y2M3DT4H5M6S');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle invalid input gracefully', () => {
    const result = pipe.transform('invalid-duration');
    expect(result).toBe('');
  });

  it('should format with options', () => {
    const duration = Temporal.Duration.from('P1Y2M3DT4H5M6S');
    const result = pipe.transform(duration, { style: 'long' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format with locale', () => {
    const duration = Temporal.Duration.from('P1Y2M3DT4H5M6S');
    const result = pipe.transform(duration, undefined, 'fr-FR');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
