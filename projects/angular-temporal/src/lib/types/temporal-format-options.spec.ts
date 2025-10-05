import { 
  TemporalFormatOptions, 
  TemporalFormatPresetKey,
  getFormatPreset,
  TemporalFormatPresets,
  mergeFormatOptions,
  validateFormatOptions
} from './temporal-format-options';

describe('TemporalFormatOptions', () => {
  it('should have correct type structure', () => {
    const options: TemporalFormatOptions = {
      dateStyle: 'full',
      timeStyle: 'medium'
    };
    expect(options).toBeDefined();
    expect(options.dateStyle).toBe('full');
    expect(options.timeStyle).toBe('medium');
  });
});

describe('TemporalFormatPresetKey', () => {
  it('should have correct preset keys', () => {
    const keys: TemporalFormatPresetKey[] = [
      'dateShort', 'dateMedium', 'dateLong', 'dateFull',
      'timeShort', 'timeMedium', 'timeLong', 'timeFull',
      'dateTimeShort', 'dateTimeMedium', 'dateTimeLong', 'dateTimeFull'
    ];
    keys.forEach(key => {
      expect(typeof key).toBe('string');
    });
  });
});

describe('getFormatPreset', () => {
  it('should return preset for valid key', () => {
    const preset = getFormatPreset('dateShort');
    expect(preset).toBeDefined();
    expect(preset.dateStyle).toBe('short');
  });

  it('should return undefined for invalid key', () => {
    const preset = getFormatPreset('invalid' as TemporalFormatPresetKey);
    expect(preset).toBeUndefined();
  });
});

describe('TemporalFormatPresets', () => {
  it('should have all presets defined', () => {
    expect(TemporalFormatPresets).toBeDefined();
    expect(Object.keys(TemporalFormatPresets).length).toBeGreaterThan(0);
  });
});

describe('mergeFormatOptions', () => {
  it('should merge format options', () => {
    const base = { dateStyle: 'short' as const };
    const override = { timeStyle: 'medium' as const };
    const merged = mergeFormatOptions(base, override);
    expect(merged.dateStyle).toBe('short');
    expect(merged.timeStyle).toBe('medium');
  });
});

describe('validateFormatOptions', () => {
  it('should validate format options', () => {
    const options = { dateStyle: 'short' as const };
    const result = validateFormatOptions(options);
    expect(result.isValid).toBe(true);
  });
});
