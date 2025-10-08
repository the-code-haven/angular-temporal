import { TestBed } from '@angular/core/testing';
import { TemporalInstantPipe } from './temporal-instant.pipe';
import { Temporal } from '../utils/polyfill';

describe('TemporalInstantPipe', () => {
  let pipe: TemporalInstantPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemporalInstantPipe]
    });
    pipe = TestBed.inject(TemporalInstantPipe);
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

  it('should format Instant', () => {
    const instant = Temporal.Instant.from('2023-12-25T14:30:45Z');
    const result = pipe.transform(instant);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format string instant', () => {
    const result = pipe.transform('2023-12-25T14:30:45Z');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle invalid input gracefully', () => {
    const result = pipe.transform('invalid-instant');
    expect(result).toBe('');
  });

  it('should format with options', () => {
    const instant = Temporal.Instant.from('2023-12-25T14:30:45Z');
    const result = pipe.transform(instant, undefined, { dateStyle: 'full', timeStyle: 'medium' } as any);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format with locale', () => {
    const instant = Temporal.Instant.from('2023-12-25T14:30:45Z');
    const result = pipe.transform(instant, undefined, undefined, 'fr-FR');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
