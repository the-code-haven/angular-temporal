# Angular Temporal

<div align="center">
  <img src="assets/angular-temporal-logo.png" alt="Angular Temporal Logo" width="200" height="200">
</div>

[![npm version](https://badge.fury.io/js/angular-temporal.svg)](https://badge.fury.io/js/angular-temporal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-Signals-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue.svg)](https://www.typescriptlang.org/)

A comprehensive Angular wrapper for the [Temporal API](https://github.com/tc39/proposal-temporal), providing components, pipes, directives, and services for working with dates and times in Angular applications. Built with modern signals and full TypeScript support.

## 🚀 Features

- **Complete Temporal API Integration**: Full support for all Temporal objects and methods
- **Modern Signals**: Signal-based architecture for optimal performance
- **3 Ready-to-Use Components**: Date, Time, and DateTime picker components
- **7 Formatting Pipes**: Comprehensive pipes for all Temporal objects with flexible type support
- **2 Utility Directives**: Form input integration and timezone conversion
- **1 Core Service**: TemporalService with comprehensive API integration
- **TypeScript Support**: Full type safety with 13 interfaces and 12 type aliases
- **Standalone Components**: All components, pipes, and directives are standalone
- **Reactive Forms**: Seamless integration with Angular reactive forms
- **Internationalization**: Built-in locale support with format presets
- **Polyfill Wrapper**: Comprehensive polyfill management and validation
- **Format Presets**: Predefined formatting options for common use cases
- **Global Date Extension**: Automatic `Date.prototype.toTemporalInstant()` extension

## 📦 Installation

```bash
npm install angular-temporal @js-temporal/polyfill
```

### Peer Dependencies

This package requires the following peer dependencies:

- `@angular/common`: ^19.0.0 || ^20.0.0
- `@angular/core`: ^19.0.0 || ^20.0.0  
- `@angular/forms`: ^19.0.0 || ^20.0.0
- `@js-temporal/polyfill`: ^0.4.0

## 🎯 Quick Start

### 1. Import the Module (Optional - for non-standalone usage)

```typescript
import { AngularTemporalModule } from 'angular-temporal';

@NgModule({
  imports: [AngularTemporalModule],
  // ...
})
export class AppModule { }
```

### 2. Use Standalone Components with Signals

```typescript
import { TemporalDatePickerComponent } from 'angular-temporal';
import { signal } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TemporalDatePickerComponent],
  template: `
    <temporal-date-picker 
      [minYear]="minYear()"
      [maxYear]="maxYear()"
      [customClasses]="customClasses()"
      (dateChange)="onDateChange($event)">
    </temporal-date-picker>
  `
})
export class ExampleComponent {
  // Signal-based inputs
  minYear = signal(2000);
  maxYear = signal(2030);
  customClasses = signal({
    container: 'my-date-picker',
    yearSelect: 'px-3 py-2 border rounded'
  });

  onDateChange(date: Temporal.PlainDate | null) {
    console.log('Date selected:', date);
  }
}
```

### 3. Use with Traditional Input/Output

```typescript
import { TemporalDatePickerComponent } from 'angular-temporal';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TemporalDatePickerComponent],
  template: `
    <temporal-date-picker 
      [(ngModel)]="selectedDate"
      [minYear]="2000"
      [maxYear]="2030">
    </temporal-date-picker>
  `
})
export class ExampleComponent {
  selectedDate: Temporal.PlainDate | null = null;
}
```

## 🧩 Components

### Date Picker

```html
<temporal-date-picker 
  [(ngModel)]="selectedDate"
  [minYear]="2000"
  [maxYear]="2030"
  [locale]="'en-CA'"
  [customClasses]="{
    yearSelect: 'custom-year-class',
    monthSelect: 'custom-month-class',
    daySelect: 'custom-day-class'
  }">
</temporal-date-picker>
```

### Time Picker

```html
<temporal-time-picker 
  [(ngModel)]="selectedTime"
  [showSeconds]="true"
  [use12HourFormat]="true"
  [minuteStep]="1"
  [secondStep]="2"
  [customClasses]="{
    hourSelect: 'custom-hour-class',
    minuteSelect: 'custom-minute-class',
    secondSelect: 'custom-second-class',
    periodSelect: 'custom-period-class'
  }">
</temporal-time-picker>
```

### DateTime Picker

```html
<temporal-date-time-picker 
  [(ngModel)]="selectedDateTime"
  [minYear]="2000"
  [maxYear]="2030"
  [locale]="'en-CA'"
  [showSeconds]="true"
  [use12HourFormat]="true"
  [customClasses]="{
    container: 'flex gap-4',
    dateContainer: 'flex',
    timeContainer: 'flex'
  }"
  [customDateClasses]="{
    yearSelect: 'inline-flex',
    monthSelect: 'inline-flex',
    daySelect: 'inline-flex'
  }"
  [customTimeClasses]="{
    hourSelect: 'inline-flex',
    minuteSelect: 'inline-flex',
    secondSelect: 'inline-flex',
    periodSelect: 'inline-flex'
  }">
</temporal-date-time-picker>
```

## 🎭 Directives

### Form Input Integration

```html
<input 
  temporalInput="date" 
  [formControl]="dateControl"
  placeholder="Select a date">

<input 
  temporalInput="time" 
  [formControl]="timeControl"
  placeholder="Select a time">

<input 
  temporalInput="datetime" 
  [formControl]="dateTimeControl"
  placeholder="Select date and time">
```

### Timezone Conversion

```html
<span 
  [temporalTimezone]="'America/New_York'" 
  [temporalValue]="zonedDateTime"
  [temporalFormat]="{dateStyle: 'full', timeStyle: 'long'}"
  [temporalLocale]="'en-CA'">
</span>
```

## 🔧 Pipes

### Enhanced Type Support

All pipes now support multiple Temporal types for maximum flexibility:

- **temporalDate**: Accepts `PlainDate`, `PlainDateTime`, `ZonedDateTime`, `string`, `Date`
- **temporalTime**: Accepts `PlainTime`, `PlainDateTime`, `ZonedDateTime`, `string`, `Date`
- **temporalDateTime**: Accepts `PlainDateTime`, `ZonedDateTime`, `string`, `Date`
- **temporalZonedDateTime**: Accepts `ZonedDateTime`, `Instant`, `string`, `Date`, `number`
- **temporalDuration**: Accepts `Duration`, `string`, or duration object
- **temporalRelative**: Accepts any Temporal date/time object
- **temporalInstant**: Accepts `Instant`, `string`, `Date`, `number`

### Formatting Pipes

```html
<!-- Format a PlainDate (accepts PlainDate, PlainDateTime, ZonedDateTime) -->
<p>{{ date | temporalDate:{year: 'numeric', month: 'long', day: 'numeric'}:'en-CA' }}</p>
<p>{{ dateTime | temporalDate:{dateStyle: 'full'} }}</p>
<p>{{ zonedDateTime | temporalDate:{dateStyle: 'short'} }}</p>

<!-- Format a PlainTime -->
<p>{{ time | temporalTime:{hour: '2-digit', minute: '2-digit'} }}</p>

<!-- Format a PlainDateTime -->
<p>{{ dateTime | temporalDateTime:{dateStyle: 'full', timeStyle: 'medium'} }}</p>

<!-- Format a ZonedDateTime -->
<p>{{ zonedDateTime | temporalZonedDateTime:'America/New_York':{timeZoneName: 'long'} }}</p>

<!-- Format a Duration -->
<p>{{ duration | temporalDuration:{style: 'long'} }}</p>

<!-- Format a Date Relative to Now -->
<p>{{ date | temporalRelative }}</p>

<!-- Format an Instant -->
<p>{{ instant | temporalInstant:'Europe/London':{dateStyle: 'short', timeStyle: 'short'} }}</p>

<!-- Enhanced flexibility examples -->
<p>{{ new Date() | temporalDate:{dateStyle: 'full'} }}</p>
<p>{{ '2023-12-25T10:30:00' | temporalTime:{hour: '2-digit', minute: '2-digit'} }}</p>
<p>{{ Temporal.Now.zonedDateTime('America/New_York') | temporalDateTime:{dateStyle: 'medium'} }}</p>
```

## 🛠️ Services & Utilities

### TemporalService

The core service provides comprehensive Temporal API integration with signal-based configuration.

```typescript
import { Component, inject } from '@angular/core';
import { TemporalService, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-date-calculator',
  template: `
    <p>Days between dates: {{ daysBetween }}</p>
    <p>Is future date: {{ isFuture }}</p>
    <p>Next month: {{ nextMonth | temporalDate }}</p>
    <p>Formatted date: {{ formattedDate }}</p>
  `
})
export class DateCalculatorComponent {
  private temporalService = inject(TemporalService);
  
  today = this.temporalService.now().plainDate();
  futureDate = this.today.add({ months: 3 });
  daysBetween = this.temporalService.differenceInDays(this.today, this.futureDate);
  isFuture = this.temporalService.isAfter(this.futureDate, this.today);
  nextMonth = this.temporalService.add(this.today, { months: 1 });
  formattedDate = this.temporalService.format(this.today, { dateStyle: 'full' });
}
```

### Polyfill Wrapper

Manage and validate the Temporal polyfill with comprehensive utilities.

```typescript
import { temporalPolyfill, Temporal, Intl } from 'angular-temporal';

// Check if polyfill is available
if (temporalPolyfill.isAvailable()) {
  console.log('Temporal polyfill is ready');
}

// Validate required features
const validation = temporalPolyfill.validateFeatures();
if (!validation.isValid) {
  console.warn('Missing features:', validation.missingFeatures);
}

// Get available features
const features = temporalPolyfill.getAvailableFeatures();
console.log('Available features:', features);

// Get polyfill version
const version = temporalPolyfill.getVersion();
console.log('Polyfill version:', version);

// Use Temporal and Intl directly (with Date.prototype.toTemporalInstant extension)
const now = Temporal.Now.instant();
const date = new Date();
const instant = date.toTemporalInstant(); // Available globally

// The polyfill automatically extends Date.prototype
console.log(typeof date.toTemporalInstant); // 'function'
```

### Format Presets

Use predefined formatting options for common use cases.

```typescript
import { 
  TemporalFormatPresets, 
  getFormatPreset, 
  mergeFormatOptions 
} from 'angular-temporal';

// Use predefined presets
const shortDate = getFormatPreset('dateShort');
const fullDateTime = getFormatPreset('dateTimeFull');
const isoFormat = getFormatPreset('isoDateTime');

// Merge format options
const customFormat = mergeFormatOptions(
  getFormatPreset('dateMedium'),
  { timeZone: 'America/New_York' }
);

// Use in templates
<p>{{ date | temporalDate:customFormat }}</p>
```

### Type Conversion

```typescript
// Convert from various formats to Temporal objects
const plainDate = this.temporalService.toPlainDate('2022-01-01');
const plainTime = this.temporalService.toPlainTime('13:45:30');
const plainDateTime = this.temporalService.toPlainDateTime(new Date());
const zonedDateTime = this.temporalService.toZonedDateTime(Date.now(), 'Europe/London');
const instant = this.temporalService.toInstant('2022-01-01T12:00:00Z');
```

### Date Calculations

```typescript
// Arithmetic operations
const futureDate = this.temporalService.add(this.today, { months: 3 });
const pastDate = this.temporalService.subtract(this.today, { days: 7 });

// Comparisons
const isBefore = this.temporalService.isBefore(date1, date2);
const isAfter = this.temporalService.isAfter(date1, date2);
const isEqual = this.temporalService.isEqual(date1, date2);

// Differences
const daysDiff = this.temporalService.differenceInDays(date1, date2);
const hoursDiff = this.temporalService.differenceInHours(dateTime1, dateTime2);
```

### Validation

```typescript
// Validate dates
const isValid = this.temporalService.isValidDate('2022-01-01');
const validation = this.temporalService.validate('invalid-date', 'date');

// Check if date is in range
const isInRange = this.temporalService.isInRange(date, { start: startDate, end: endDate });
```

## 🌍 Internationalization

```typescript
// Configure default locale and timezone
this.temporalService.setConfig({
  defaultLocale: 'fr-FR',
  defaultTimezone: 'Europe/Paris',
  defaultCalendar: 'iso8601'
});

// Use in templates
<p>{{ date | temporalDate:{dateStyle: 'full'}:'fr-FR' }}</p>
```

## 🎨 Styling

All components support custom CSS classes for complete styling control:

```html
<temporal-date-picker 
  [customClasses]="{
    container: 'my-date-picker',
    dateContainer: 'flex gap-2',
    yearSelect: 'px-3 py-2 border rounded',
    monthSelect: 'px-3 py-2 border rounded',
    daySelect: 'px-3 py-2 border rounded'
  }">
</temporal-date-picker>
```

## 🔧 Configuration

### Service Configuration

```typescript
import { TemporalService, TemporalServiceConfig } from 'angular-temporal';

// Configure globally
this.temporalService.setConfig({
  defaultLocale: 'en-US',
  defaultTimezone: 'UTC',
  defaultCalendar: 'iso8601'
});

// Access reactive configuration
const currentLocale = this.temporalService.defaultLocale();
const currentTimezone = this.temporalService.defaultTimezone();
const currentCalendar = this.temporalService.defaultCalendar();
```

### Component Configuration

```typescript
interface TemporalPickerConfig {
  minYear?: number;
  maxYear?: number;
  locale?: string;
  calendar?: string;
  timezone?: string;
  showSeconds?: boolean;
  use12HourFormat?: boolean;
  minuteStep?: number;
  secondStep?: number;
  customClasses?: Record<string, string>;
}
```

## 🧪 Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { TemporalService } from 'angular-temporal';

describe('TemporalService', () => {
  let service: TemporalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should convert string to PlainDate', () => {
    const date = service.toPlainDate('2022-01-01');
    expect(date.year).toBe(2022);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });
});
```

## 🌐 Browser Support

Temporal is currently a Stage 3 TC39 proposal and not yet natively implemented in browsers. This library uses the `@js-temporal/polyfill` to provide Temporal functionality in all modern browsers.

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## ⚡ Signal-Based Architecture

This library leverages Angular's signal-based architecture for optimal performance and reactivity:

### Enhanced Developer Experience

- **Flexible Pipe Support**: Pipes work with multiple Temporal types automatically
- **Global Date Extension**: `Date.prototype.toTemporalInstant()` available everywhere
- **Comprehensive Type Safety**: Full TypeScript support with proper type inference
- **Polyfill Validation**: Automatic feature detection and validation

### Signal-Based Components
```typescript
@Component({
  template: `
    <temporal-date-picker 
      [minYear]="minYear()"
      [maxYear]="maxYear()"
      [customClasses]="customClasses()"
      (dateChange)="onDateChange($event)">
    </temporal-date-picker>
  `
})
export class MyComponent {
  // Signal-based inputs
  minYear = signal(2000);
  maxYear = signal(2030);
  customClasses = signal({ container: 'my-picker' });

  // Signal-based outputs
  onDateChange = (date: Temporal.PlainDate | null) => {
    console.log('Date changed:', date);
  };
}
```

### Reactive State Management
```typescript
// Internal state uses signals for reactive updates
selectedYear = signal<number>(new Date().getFullYear());
selectedMonth = signal<number>(new Date().getMonth() + 1);
selectedDay = signal<number>(new Date().getDate());

// Computed properties automatically update when dependencies change
years = computed(() => {
  const minYear = this.minYear() || 1900;
  const maxYear = this.maxYear() || 2100;
  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
});
```

### Service with Signals
```typescript
// Reactive configuration
private config = signal<TemporalServiceConfig>({
  defaultLocale: 'en-US',
  defaultTimezone: 'UTC',
  defaultCalendar: 'iso8601'
});

// Computed signals for reactive configuration
public readonly defaultLocale = computed(() => this.config().defaultLocale || 'en-US');
public readonly defaultTimezone = computed(() => this.config().defaultTimezone || 'UTC');
```

## 📚 Why Temporal?

The Temporal API addresses many problems with JavaScript's built-in `Date` object:

- **Immutability**: All Temporal objects are immutable, preventing accidental mutations
- **Timezone Support**: First-class support for timezones and DST transitions
- **Precision**: Nanosecond precision for accurate calculations
- **Clarity**: Clear separation between wall-clock time and exact time
- **Better Parsing**: Robust date/time string parsing
- **Calculations**: Reliable date arithmetic and duration calculations
- **Type Safety**: Better TypeScript integration

## 🤝 Contributing

We welcome contributions to Angular Temporal! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on how to contribute.

### Quick Start for Contributors

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/angular-temporal.git`
3. Install dependencies: `npm install`
4. Create your feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes and add tests
6. Run tests: `npm run test:ci`
7. Run linting: `npm run lint`
8. Build the library: `npm run build`
9. Commit your changes: `git commit -m 'Add some amazing feature'`
10. Push to the branch: `git push origin feature/amazing-feature`
11. Open a Pull Request

### Development Scripts

- `npm run build` - Build the library
- `npm run test` - Run tests in watch mode
- `npm run test:ci` - Run tests once with coverage
- `npm run lint` - Run linting
- `npm run pack` - Create a package tarball for testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 References

- [Temporal API Proposal](https://github.com/tc39/proposal-temporal)
- [Temporal Polyfill](https://github.com/js-temporal/temporal-polyfill)
- [Temporal Cookbook](https://tc39.es/proposal-temporal/docs/cookbook.html)
- [Angular Documentation](https://angular.io/docs)

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](https://github.com/umairhm/angular-temporal#readme)
2. Search [existing issues](https://github.com/umairhm/angular-temporal/issues)
3. Create a [new issue](https://github.com/umairhm/angular-temporal/issues/new)

---

Made with ❤️ by [Umair Hafeez](https://github.com/umairhm)
