import { 
  TemporalServiceConfig,
  TemporalFormatOptions,
  TemporalComparisonResult,
  TemporalRange,
  TemporalValidationResult,
  TemporalFormValue,
  TemporalInputConfig,
  TemporalPickerConfig,
  TemporalSignalConfig,
  TemporalComponentConfig,
  TemporalDirectiveConfig,
  TemporalPipeConfig
} from './temporal.types';

describe('Temporal Types', () => {
  describe('TemporalServiceConfig', () => {
    it('should have correct structure', () => {
      const config: TemporalServiceConfig = {
        defaultLocale: 'en-US',
        defaultTimezone: 'UTC',
        defaultCalendar: 'iso8601'
      };
      expect(config.defaultLocale).toBe('en-US');
      expect(config.defaultTimezone).toBe('UTC');
      expect(config.defaultCalendar).toBe('iso8601');
    });
  });

  describe('TemporalFormatOptions', () => {
    it('should have correct structure', () => {
      const options: TemporalFormatOptions = {
        dateStyle: 'full',
        timeStyle: 'medium'
      };
      expect(options.dateStyle).toBe('full');
      expect(options.timeStyle).toBe('medium');
    });
  });

  describe('TemporalComparisonResult', () => {
    it('should have correct structure', () => {
      const result: TemporalComparisonResult = {
        isBefore: true,
        isAfter: false,
        isEqual: false,
        difference: {} as any // Mock duration for testing
      };
      expect(result.isBefore).toBe(true);
      expect(result.isAfter).toBe(false);
      expect(result.isEqual).toBe(false);
      expect(result.difference).toBeDefined();
    });
  });

  describe('TemporalRange', () => {
    it('should have correct structure', () => {
      const range: TemporalRange = {
        start: {} as any, // Mock Temporal object
        end: {} as any    // Mock Temporal object
      };
      expect(range.start).toBeDefined();
      expect(range.end).toBeDefined();
    });
  });

  describe('TemporalValidationResult', () => {
    it('should have correct structure', () => {
      const result: TemporalValidationResult = {
        isValid: true,
        errors: []
      };
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe('TemporalFormValue', () => {
    it('should have correct structure', () => {
      const value: TemporalFormValue = {} as any; // Mock Temporal object
      expect(value).toBeDefined();
    });
  });

  describe('TemporalInputConfig', () => {
    it('should have correct structure', () => {
      const config: TemporalInputConfig = {
        type: 'date',
        format: 'short',
        locale: 'en-US',
        timezone: 'UTC'
      };
      expect(config.type).toBe('date');
      expect(config.format).toBe('short');
      expect(config.locale).toBe('en-US');
      expect(config.timezone).toBe('UTC');
    });
  });

  describe('TemporalPickerConfig', () => {
    it('should have correct structure', () => {
      const config: TemporalPickerConfig = {
        minYear: 1900,
        maxYear: 2100,
        locale: 'en-US',
        calendar: 'iso8601'
      };
      expect(config.minYear).toBe(1900);
      expect(config.maxYear).toBe(2100);
      expect(config.locale).toBe('en-US');
      expect(config.calendar).toBe('iso8601');
    });
  });
});
