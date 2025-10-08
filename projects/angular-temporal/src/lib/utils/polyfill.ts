import { Intl, Temporal, toTemporalInstant } from '@js-temporal/polyfill';

declare global {
  interface Date {
    toTemporalInstant?: typeof toTemporalInstant;
  }
}

// Add toTemporalInstant to Date.prototype if it doesn't exist
if (!Date.prototype.toTemporalInstant) {
  Date.prototype.toTemporalInstant = toTemporalInstant;
}

/**
 * Polyfill wrapper for Temporal API
 * Provides a consistent interface and handles polyfill loading
 */
export class TemporalPolyfill {
  private static instance: TemporalPolyfill;
  private temporal: typeof Temporal;

  private constructor() {
    this.temporal = Temporal;
  }

  /**
   * Get the singleton instance of TemporalPolyfill
   */
  public static getInstance(): TemporalPolyfill {
    if (!TemporalPolyfill.instance) {
      TemporalPolyfill.instance = new TemporalPolyfill();
    }
    return TemporalPolyfill.instance;
  }

  /**
   * Get the Temporal namespace
   */
  public get Temporal(): typeof Temporal {
    return this.temporal;
  }

  /**
   * Check if Temporal is available
   */
  public isAvailable(): boolean {
    return typeof this.temporal !== 'undefined' && this.temporal !== null;
  }

  /**
   * Get the version of the polyfill
   */
  public getVersion(): string {
    try {
      // Try to get version from the polyfill if available
      return (this.temporal as any).version || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  /**
   * Initialize the polyfill (for future use if needed)
   */
  public async initialize(): Promise<void> {
    // This can be extended in the future if dynamic loading is needed
    if (!this.isAvailable()) {
      throw new Error('Temporal polyfill is not available');
    }
  }

  /**
   * Check if a specific Temporal feature is supported
   */
  public isFeatureSupported(feature: keyof typeof Temporal): boolean {
    try {
      return feature in this.temporal;
    } catch {
      return false;
    }
  }

  /**
   * Get all available Temporal features
   */
  public getAvailableFeatures(): string[] {
    const features: string[] = [];
    
    if (this.isFeatureSupported('Now')) features.push('Now');
    if (this.isFeatureSupported('PlainDate')) features.push('PlainDate');
    if (this.isFeatureSupported('PlainTime')) features.push('PlainTime');
    if (this.isFeatureSupported('PlainDateTime')) features.push('PlainDateTime');
    if (this.isFeatureSupported('ZonedDateTime')) features.push('ZonedDateTime');
    if (this.isFeatureSupported('Instant')) features.push('Instant');
    if (this.isFeatureSupported('Duration')) features.push('Duration');
    if (this.isFeatureSupported('Calendar')) features.push('Calendar');
    if (this.isFeatureSupported('TimeZone')) features.push('TimeZone');
    if (this.isFeatureSupported('PlainYearMonth')) features.push('PlainYearMonth');
    if (this.isFeatureSupported('PlainMonthDay')) features.push('PlainMonthDay');
    
    return features;
  }

  /**
   * Validate that all required features are available
   */
  public validateFeatures(): { isValid: boolean; missingFeatures: string[] } {
    const requiredFeatures = [
      'Now', 'PlainDate', 'PlainTime', 'PlainDateTime', 
      'ZonedDateTime', 'Instant', 'Duration', 'Calendar', 'TimeZone'
    ];
    
    const availableFeatures = this.getAvailableFeatures();
    const missingFeatures = requiredFeatures.filter(feature => !availableFeatures.includes(feature));
    
    return {
      isValid: missingFeatures.length === 0,
      missingFeatures
    };
  }
}

/**
 * Export a singleton instance for easy access
 */
export const temporalPolyfill = TemporalPolyfill.getInstance();

/**
 * Export Temporal and Intl from the polyfill
 * Following the original export pattern
 */
export { Temporal, Intl };
