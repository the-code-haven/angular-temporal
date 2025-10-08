import { TestBed } from '@angular/core/testing';
import { TemporalService } from './temporal.service';
import { Temporal } from '../utils/polyfill';

describe('TemporalService', () => {
  let service: TemporalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Configuration', () => {
    it('should have default configuration', () => {
      const config = service.getConfig();
      expect(config.defaultLocale).toBe('en-US');
      expect(config.defaultTimezone).toBe('UTC');
      expect(config.defaultCalendar).toBe('iso8601');
    });

    it('should update configuration', () => {
      service.setConfig({
        defaultLocale: 'fr-FR',
        defaultTimezone: 'Europe/Paris'
      });
      
      const config = service.getConfig();
      expect(config.defaultLocale).toBe('fr-FR');
      expect(config.defaultTimezone).toBe('Europe/Paris');
      expect(config.defaultCalendar).toBe('iso8601');
    });
  });

  describe('Current Time', () => {
    it('should get current instant', () => {
      const now = service.now();
      const instant = now.instant();
      expect(instant).toBeInstanceOf(Temporal.Instant);
    });

    it('should get current plain date', () => {
      const now = service.now();
      const plainDate = now.plainDate();
      expect(plainDate).toBeInstanceOf(Temporal.PlainDate);
    });

    it('should get current plain time', () => {
      const now = service.now();
      const plainTime = now.plainTime();
      expect(plainTime).toBeInstanceOf(Temporal.PlainTime);
    });

    it('should get current plain datetime', () => {
      const now = service.now();
      const plainDateTime = now.plainDateTime();
      expect(plainDateTime).toBeInstanceOf(Temporal.PlainDateTime);
    });

    it('should get current zoned datetime', () => {
      const now = service.now();
      const zonedDateTime = now.zonedDateTime();
      expect(zonedDateTime).toBeInstanceOf(Temporal.ZonedDateTime);
    });
  });

  describe('Type Conversion', () => {
    it('should convert string to PlainDate', () => {
      const plainDate = service.toPlainDate('2023-12-25');
      expect(plainDate).toBeInstanceOf(Temporal.PlainDate);
      expect(plainDate.year).toBe(2023);
      expect(plainDate.month).toBe(12);
      expect(plainDate.day).toBe(25);
    });

    it('should convert Date to PlainDate', () => {
      const date = new Date('2023-12-25');
      const plainDate = service.toPlainDate(date);
      expect(plainDate).toBeInstanceOf(Temporal.PlainDate);
    });

    it('should convert string to PlainTime', () => {
      const plainTime = service.toPlainTime('14:30:45');
      expect(plainTime).toBeInstanceOf(Temporal.PlainTime);
      expect(plainTime.hour).toBe(14);
      expect(plainTime.minute).toBe(30);
      expect(plainTime.second).toBe(45);
    });

    it('should convert to PlainDateTime', () => {
      const plainDateTime = service.toPlainDateTime('2023-12-25T14:30:45');
      expect(plainDateTime).toBeInstanceOf(Temporal.PlainDateTime);
    });

    it('should convert to ZonedDateTime', () => {
      const zonedDateTime = service.toZonedDateTime('2023-12-25T14:30:00', 'America/New_York');
      expect(zonedDateTime).toBeInstanceOf(Temporal.ZonedDateTime);
      expect(zonedDateTime.timeZoneId).toBe('America/New_York');
    });

    it('should convert to Instant', () => {
      const instant = service.toInstant('2023-12-25T14:30:45Z');
      expect(instant).toBeInstanceOf(Temporal.Instant);
    });
  });

  describe('Date Arithmetic', () => {
    it('should add duration to date', () => {
      const date = Temporal.PlainDate.from('2023-01-01');
      const result = service.add(date, { months: 3 });
      expect(result.year).toBe(2023);
      expect(result.month).toBe(4);
    });

    it('should subtract duration from date', () => {
      const date = Temporal.PlainDate.from('2023-04-01');
      const result = service.subtract(date, { months: 3 });
      expect(result.year).toBe(2023);
      expect(result.month).toBe(1);
    });
  });

  describe('Comparisons', () => {
    it('should compare dates correctly', () => {
      const date1 = Temporal.PlainDate.from('2023-01-01');
      const date2 = Temporal.PlainDate.from('2023-01-02');
      
      expect(service.isBefore(date1, date2)).toBe(true);
      expect(service.isAfter(date1, date2)).toBe(false);
      expect(service.isEqual(date1, date1)).toBe(true);
    });
  });

  describe('Validation', () => {
    it('should validate valid date', () => {
      expect(service.isValidDate('2023-12-25')).toBe(true);
      expect(service.isValidDate('invalid-date')).toBe(false);
    });

    it('should validate date type', () => {
      const validResult = service.validate('2023-12-25', 'date');
      const invalidResult = service.validate('invalid-date', 'date');
      expect(validResult.isValid).toBe(true);
      expect(invalidResult.isValid).toBe(false);
    });
  });

  describe('Formatting', () => {
    it('should format PlainDate', () => {
      const date = Temporal.PlainDate.from('2023-12-25');
      const formatted = service.format(date, { dateStyle: 'full' });
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });

    it('should format with custom locale', () => {
      const date = Temporal.PlainDate.from('2023-12-25');
      const formatted = service.format(date, { dateStyle: 'full' }, 'fr-FR');
      expect(typeof formatted).toBe('string');
    });
  });

  describe('Utility Methods', () => {
    it('should get days in month', () => {
      const days = service.getDaysInMonth(2023, 2); // February
      expect(days).toBe(28);
    });

    it('should get days in leap year February', () => {
      const days = service.getDaysInMonth(2024, 2); // February in leap year
      expect(days).toBe(29);
    });

    it('should calculate difference in days', () => {
      const date1 = Temporal.PlainDate.from('2023-01-01');
      const date2 = Temporal.PlainDate.from('2023-01-10');
      const diff = service.differenceInDays(date1, date2);
      expect(diff).toBe(9);
    });
  });
});
