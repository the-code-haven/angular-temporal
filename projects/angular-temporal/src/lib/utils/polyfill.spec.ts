import { temporalPolyfill, TemporalPolyfill } from './polyfill';

describe('TemporalPolyfill (Simple)', () => {
  let polyfill: TemporalPolyfill;

  beforeEach(() => {
    polyfill = TemporalPolyfill.getInstance();
  });

  it('should be created', () => {
    expect(polyfill).toBeTruthy();
  });

  it('should be a singleton', () => {
    const instance1 = TemporalPolyfill.getInstance();
    const instance2 = TemporalPolyfill.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should have Temporal namespace', () => {
    expect(polyfill.Temporal).toBeDefined();
    expect(polyfill.Temporal.Now).toBeDefined();
    expect(polyfill.Temporal.PlainDate).toBeDefined();
  });

  it('should check availability', () => {
    expect(polyfill.isAvailable()).toBe(true);
  });

  it('should get version', () => {
    const version = polyfill.getVersion();
    expect(typeof version).toBe('string');
  });

  it('should check feature support', () => {
    expect(polyfill.isFeatureSupported('Now')).toBe(true);
    expect(polyfill.isFeatureSupported('PlainDate')).toBe(true);
  });

  it('should get available features', () => {
    const features = polyfill.getAvailableFeatures();
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
  });

  it('should validate features', () => {
    const validation = polyfill.validateFeatures();
    expect(validation.isValid).toBe(true);
    expect(validation.missingFeatures).toEqual([]);
  });
});

describe('temporalPolyfill singleton (Simple)', () => {
  it('should be available', () => {
    expect(temporalPolyfill).toBeDefined();
    expect(temporalPolyfill.isAvailable()).toBe(true);
  });
});
