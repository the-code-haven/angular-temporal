# Temporal for Angular

[![npm version](https://img.shields.io/npm/v/angular-temporal.svg)](https://www.npmjs.com/package/angular-temporal)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A comprehensive Angular wrapper for the [Temporal API](https://tc39.es/proposal-temporal/docs/), leveraging the [@js-temporal/polyfill](https://github.com/js-temporal/temporal-polyfill) package.

## Overview

Angular Temporal provides a complete set of Angular utilities to work with the Temporal API, including:

- **Angular Pipes**: Format dates, times, durations, and more with ease
- **Angular Directives**: Simplify timezone conversions and input handling
- **Form Controls**: Fully-integrated date and time picker components
- **Services**: Comprehensive date calculation and manipulation utilities

## Installation

```bash
npm install angular-temporal @js-temporal/polyfill
```

## Quick Start

All the components, directives and pipes in Angular Temporal are `standalone`, so you can directly import them in your modules or components.

## Features

### Components

Angular Temporal includes ready-to-use form components:

#### Date Picker

```html
<temporal-date-picker 
  [(ngModel)]="selectedDate"
  [minYear]="2000"
  [maxYear]="2030"
  [locale]="en-CA"
  [customClasses]="{
    yearSelect: 'inline-flex',
    monthSelect: 'inline-flex',
    daySelect: 'inline-flex'
  }">
</temporal-date-picker>
```

#### Time Picker

```html
<temporal-time-picker 
  [(ngModel)]="selectedTime"
  [showSeconds]="true"
  [use12HourFormat]="true"
  [minuteStep]="1"
  [secondStep]="2"
  customClasses="{
    hourSelect: 'inline-flex',
    minuteSelect: 'inline-flex',
    secondSelect: 'inline-flex',
    periodSelect: 'inline-flex'
  }">
</temporal-time-picker>
```

#### DateTime Picker

```html
<temporal-date-time-picker 
  [(ngModel)]="selectedDateTime"
  [minYear]="2000"
  [maxYear]="2030"
  [locale]="en-CA"
  [showSeconds]="true"
  [use12HourFormat]="true"
  [minuteStep]="1"
  [secondStep]="2"
  customClasses="{
    container: 'flex gap-4',
    dateContainer: 'flex',
    timeContainer: 'flex'
  }"
  [customDateClasses]="{
    yearSelect: 'inline-flex',
    monthSelect: 'inline-flex',
    daySelect: 'inline-flex'
  }"
  customTimeClasses="{
    hourSelect: 'inline-flex',
    minuteSelect: 'inline-flex',
    secondSelect: 'inline-flex',
    periodSelect: 'inline-flex'
  }">
</temporal-date-time-picker>
```

### Directives

#### Form Input Integration

The `temporalInput` directive transforms standard HTML inputs into Temporal-aware form controls:

```html
<input 
  temporalInput="date" 
  [formControl]="dateControl">

<input 
  temporalInput="time" 
  [formControl]="timeControl">

<input 
  temporalInput="datetime" 
  [formControl]="dateTimeControl">
```

#### Timezone Conversion

The `temporalTimezone` directive converts and displays dates in different timezones:

```html
<span 
  [temporalTimezone]="'America/New_York'" 
  [temporalValue]="zonedDateTime"
  [temporalFormat]="{dateStyle: 'full', timeStyle: 'long'}"
  [temporalLocale]="'en-CA'">
</span>
```

### Pipes

Angular Temporal provides several pipes for formatting Temporal objects:

```html
<!-- Format a PlainDate -->
<p>{{ date | temporalDate:{year: 'numeric', month: 'long', day: 'numeric'}:'en-CA' }}</p>

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
```

### Services

The `TemporalService` provides extensive date manipulation functionality:

```typescript
import { Component } from '@angular/core';
import { TemporalService } from 'angular-temporal';
import { Temporal } from '@js-temporal/polyfill';

@Component({
  selector: 'app-date-calculator',
  template: `
    <p>Days between dates: {{ daysBetween }}</p>
    <p>Is future date: {{ isFuture }}</p>
    <p>Next month: {{ nextMonth | temporalDate }}</p>
  `
})
export class DateCalculatorComponent {
  today = this.temporalService.now().date();
  futureDate = this.today.add({ months: 3 });
  daysBetween = this.temporalService.differenceInDays(this.today, this.futureDate);
  isFuture = this.temporalService.isAfter(this.futureDate, this.today);
  nextMonth = this.temporalService.add(this.today, { months: 1 });
  
  constructor(private temporalService: TemporalService) {}
}
```

## Type Conversion

The `TemporalService` makes it easy to convert between different date formats:

```typescript
// Convert from various formats to Temporal objects
const plainDate = temporalService.toPlainDate('2022-01-01');
const plainTime = temporalService.toPlainTime('13:45:30');
const plainDateTime = temporalService.toPlainDateTime(new Date());
const zonedDateTime = temporalService.toZonedDateTime(Date.now(), 'Europe/London');
```

## Why Temporal?

The [Temporal API](https://tc39.es/proposal-temporal/docs/) addresses many of the problems with JavaScript's built-in `Date` object:

- **Immutability**: All Temporal objects are immutable
- **Timezone Support**: First-class support for timezones
- **Precision**: Nanosecond precision for accurate calculations
- **Clarity**: Clear separation between wall-clock time and exact time
- **Parsing**: Better date/time string parsing
- **Calculations**: Robust date arithmetic and duration calculations

## Browser Support

Temporal is currently a Stage 3 TC39 proposal and not yet natively implemented in browsers. This library uses the [@js-temporal/polyfill](https://github.com/js-temporal/temporal-polyfill) to provide Temporal functionality in all modern browsers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## References

- [Temporal API Proposal](https://tc39.es/proposal-temporal/docs/)
- [Temporal Polyfill](https://github.com/js-temporal/temporal-polyfill)
- [Temporal Cookbook](https://tc39.es/proposal-temporal/docs/cookbook.html)
