# Angular Temporal - Usage Examples

This document provides comprehensive examples for all features of the `angular-temporal` package. These examples demonstrate real-world usage patterns and best practices.

## Table of Contents

- [Components](#components)
  - [Date Picker](#date-picker)
  - [Time Picker](#time-picker)
  - [DateTime Picker](#datetime-picker)
- [Directives](#directives)
  - [Form Input Integration](#form-input-integration)
  - [Timezone Conversion](#timezone-conversion)
- [Pipes](#pipes)
  - [temporalDate](#temporaldate-pipe)
  - [temporalTime](#temporaltime-pipe)
  - [temporalDateTime](#temporaldatetime-pipe)
  - [temporalZonedDateTime](#temporalzoneddatetime-pipe)
  - [temporalDuration](#temporalduration-pipe)
  - [temporalRelative](#temporalrelative-pipe)
  - [temporalInstant](#temporalinstant-pipe)
- [TemporalService](#temporalservice)
  - [Date Calculations](#date-calculations)
  - [Date Comparisons](#date-comparisons)
  - [Type Conversions](#type-conversions)
  - [Formatting](#formatting)
  - [Validation](#validation)
  - [Configuration](#configuration)
- [Advanced Examples](#advanced-examples)
  - [Date Range Picker](#date-range-picker)
  - [Meeting Scheduler](#meeting-scheduler)
  - [Countdown Timer](#countdown-timer)
  - [Multi-Timezone Clock](#multi-timezone-clock)
- [Polyfill Utilities](#polyfill-utilities)
- [Format Presets](#format-presets)

---

## Components

### Date Picker

#### Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { TemporalDatePickerComponent, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-basic-date-picker',
  standalone: true,
  imports: [TemporalDatePickerComponent],
  template: `
    <temporal-date-picker 
      (dateChange)="onDateChange($event)">
    </temporal-date-picker>
    
    <p *ngIf="selectedDate()">
      Selected: {{ selectedDate()?.toString() }}
    </p>
  `
})
export class BasicDatePickerComponent {
  selectedDate = signal<Temporal.PlainDate | null>(null);

  onDateChange(date: Temporal.PlainDate | null) {
    this.selectedDate.set(date);
    console.log('Date selected:', date?.toString());
  }
}
```

#### With Year Range and Locale

```typescript
@Component({
  selector: 'app-custom-date-picker',
  standalone: true,
  imports: [TemporalDatePickerComponent],
  template: `
    <temporal-date-picker 
      [minYear]="minYear()"
      [maxYear]="maxYear()"
      [locale]="'en-CA'"
      (dateChange)="onDateChange($event)">
    </temporal-date-picker>
  `
})
export class CustomDatePickerComponent {
  minYear = signal(2000);
  maxYear = signal(2030);
  selectedDate = signal<Temporal.PlainDate | null>(null);

  onDateChange(date: Temporal.PlainDate | null) {
    this.selectedDate.set(date);
  }
}
```

#### With Custom Styling

```typescript
@Component({
  selector: 'app-styled-date-picker',
  standalone: true,
  imports: [TemporalDatePickerComponent],
  template: `
    <temporal-date-picker 
      [customClasses]="customClasses()"
      (dateChange)="onDateChange($event)">
    </temporal-date-picker>
  `
})
export class StyledDatePickerComponent {
  customClasses = signal({
    container: 'flex gap-2 p-4 bg-gray-100 rounded-lg',
    dateContainer: 'flex gap-2',
    yearSelect: 'px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500',
    monthSelect: 'px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500',
    daySelect: 'px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
  });

  selectedDate = signal<Temporal.PlainDate | null>(null);

  onDateChange(date: Temporal.PlainDate | null) {
    this.selectedDate.set(date);
  }
}
```

#### Two-Way Binding with ngModel

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ngmodel-date-picker',
  standalone: true,
  imports: [TemporalDatePickerComponent, FormsModule],
  template: `
    <temporal-date-picker 
      [(ngModel)]="selectedDate"
      [minYear]="2020"
      [maxYear]="2025">
    </temporal-date-picker>
    
    <p>Selected: {{ selectedDate?.toString() }}</p>
  `
})
export class NgModelDatePickerComponent {
  selectedDate: Temporal.PlainDate | null = null;
}
```

---

### Time Picker

#### Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { TemporalTimePickerComponent, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-basic-time-picker',
  standalone: true,
  imports: [TemporalTimePickerComponent],
  template: `
    <temporal-time-picker 
      (timeChange)="onTimeChange($event)">
    </temporal-time-picker>
    
    <p *ngIf="selectedTime()">
      Selected: {{ selectedTime()?.toString() }}
    </p>
  `
})
export class BasicTimePickerComponent {
  selectedTime = signal<Temporal.PlainTime | null>(null);

  onTimeChange(time: Temporal.PlainTime | null) {
    this.selectedTime.set(time);
    console.log('Time selected:', time?.toString());
  }
}
```

#### With Seconds and 12-Hour Format

```typescript
@Component({
  selector: 'app-custom-time-picker',
  standalone: true,
  imports: [TemporalTimePickerComponent],
  template: `
    <temporal-time-picker 
      [showSeconds]="true"
      [use12HourFormat]="true"
      [minuteStep]="5"
      [secondStep]="10"
      (timeChange)="onTimeChange($event)">
    </temporal-time-picker>
  `
})
export class CustomTimePickerComponent {
  selectedTime = signal<Temporal.PlainTime | null>(null);

  onTimeChange(time: Temporal.PlainTime | null) {
    this.selectedTime.set(time);
  }
}
```

#### With Custom Styling

```typescript
@Component({
  selector: 'app-styled-time-picker',
  standalone: true,
  imports: [TemporalTimePickerComponent],
  template: `
    <temporal-time-picker 
      [showSeconds]="true"
      [use12HourFormat]="true"
      [customClasses]="customClasses()"
      (timeChange)="onTimeChange($event)">
    </temporal-time-picker>
  `
})
export class StyledTimePickerComponent {
  customClasses = signal({
    container: 'flex gap-2 p-4 bg-gray-100 rounded-lg',
    timeContainer: 'flex gap-2',
    hourSelect: 'px-3 py-2 border border-gray-300 rounded-md',
    minuteSelect: 'px-3 py-2 border border-gray-300 rounded-md',
    secondSelect: 'px-3 py-2 border border-gray-300 rounded-md',
    periodSelect: 'px-3 py-2 border border-gray-300 rounded-md font-semibold'
  });

  selectedTime = signal<Temporal.PlainTime | null>(null);

  onTimeChange(time: Temporal.PlainTime | null) {
    this.selectedTime.set(time);
  }
}
```

---

### DateTime Picker

#### Basic Usage

```typescript
import { Component, signal } from '@angular/core';
import { TemporalDateTimePickerComponent, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-basic-datetime-picker',
  standalone: true,
  imports: [TemporalDateTimePickerComponent],
  template: `
    <temporal-date-time-picker 
      (dateTimeChange)="onDateTimeChange($event)">
    </temporal-date-time-picker>
    
    <p *ngIf="selectedDateTime()">
      Selected: {{ selectedDateTime()?.toString() }}
    </p>
  `
})
export class BasicDateTimePickerComponent {
  selectedDateTime = signal<Temporal.PlainDateTime | null>(null);

  onDateTimeChange(dateTime: Temporal.PlainDateTime | null) {
    this.selectedDateTime.set(dateTime);
    console.log('DateTime selected:', dateTime?.toString());
  }
}
```

#### With Full Configuration

```typescript
@Component({
  selector: 'app-full-datetime-picker',
  standalone: true,
  imports: [TemporalDateTimePickerComponent],
  template: `
    <temporal-date-time-picker 
      [minYear]="minYear()"
      [maxYear]="maxYear()"
      [locale]="'en-US'"
      [showSeconds]="true"
      [use12HourFormat]="true"
      [minuteStep]="15"
      [customClasses]="customClasses()"
      [customDateClasses]="customDateClasses()"
      [customTimeClasses]="customTimeClasses()"
      (dateTimeChange)="onDateTimeChange($event)">
    </temporal-date-time-picker>
  `
})
export class FullDateTimePickerComponent {
  minYear = signal(2020);
  maxYear = signal(2030);
  
  customClasses = signal({
    container: 'flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md',
    dateContainer: 'flex gap-2',
    timeContainer: 'flex gap-2'
  });
  
  customDateClasses = signal({
    yearSelect: 'px-3 py-2 border rounded-md',
    monthSelect: 'px-3 py-2 border rounded-md',
    daySelect: 'px-3 py-2 border rounded-md'
  });
  
  customTimeClasses = signal({
    hourSelect: 'px-3 py-2 border rounded-md',
    minuteSelect: 'px-3 py-2 border rounded-md',
    secondSelect: 'px-3 py-2 border rounded-md',
    periodSelect: 'px-3 py-2 border rounded-md font-bold'
  });

  selectedDateTime = signal<Temporal.PlainDateTime | null>(null);

  onDateTimeChange(dateTime: Temporal.PlainDateTime | null) {
    this.selectedDateTime.set(dateTime);
  }
}
```

---

## Directives

### Form Input Integration

#### Date Input with Reactive Forms

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { TemporalInputDirective, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-date-form',
  standalone: true,
  imports: [ReactiveFormsModule, TemporalInputDirective],
  template: `
    <form [formGroup]="form">
      <label>Birth Date:</label>
      <input 
        temporalInput="date" 
        formControlName="birthDate"
        placeholder="Select your birth date">
      
      <p *ngIf="form.get('birthDate')?.value">
        Selected: {{ form.get('birthDate')?.value.toString() }}
      </p>
    </form>
  `
})
export class DateFormComponent {
  form = new FormGroup({
    birthDate: new FormControl<Temporal.PlainDate | null>(null)
  });
}
```

#### Time Input with Reactive Forms

```typescript
@Component({
  selector: 'app-time-form',
  standalone: true,
  imports: [ReactiveFormsModule, TemporalInputDirective],
  template: `
    <form [formGroup]="form">
      <label>Meeting Time:</label>
      <input 
        temporalInput="time" 
        formControlName="meetingTime"
        placeholder="Select meeting time">
      
      <p *ngIf="form.get('meetingTime')?.value">
        Selected: {{ form.get('meetingTime')?.value.toString() }}
      </p>
    </form>
  `
})
export class TimeFormComponent {
  form = new FormGroup({
    meetingTime: new FormControl<Temporal.PlainTime | null>(null)
  });
}
```

#### DateTime Input with Reactive Forms

```typescript
@Component({
  selector: 'app-datetime-form',
  standalone: true,
  imports: [ReactiveFormsModule, TemporalInputDirective],
  template: `
    <form [formGroup]="form">
      <label>Appointment:</label>
      <input 
        temporalInput="datetime" 
        formControlName="appointment"
        placeholder="Select appointment date and time">
      
      <p *ngIf="form.get('appointment')?.value">
        Selected: {{ form.get('appointment')?.value.toString() }}
      </p>
    </form>
  `
})
export class DateTimeFormComponent {
  form = new FormGroup({
    appointment: new FormControl<Temporal.PlainDateTime | null>(null)
  });
}
```

#### Complete Form Example

```typescript
@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, TemporalInputDirective, CommonModule],
  template: `
    <form [formGroup]="eventForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Event Date:</label>
        <input 
          temporalInput="date" 
          formControlName="eventDate"
          placeholder="Select event date">
      </div>
      
      <div class="form-group">
        <label>Start Time:</label>
        <input 
          temporalInput="time" 
          formControlName="startTime"
          placeholder="Select start time">
      </div>
      
      <div class="form-group">
        <label>End Time:</label>
        <input 
          temporalInput="time" 
          formControlName="endTime"
          placeholder="Select end time">
      </div>
      
      <button type="submit" [disabled]="!eventForm.valid">
        Create Event
      </button>
      
      <div *ngIf="eventForm.valid" class="preview">
        <h3>Event Preview:</h3>
        <p>Date: {{ eventForm.get('eventDate')?.value?.toString() }}</p>
        <p>Start: {{ eventForm.get('startTime')?.value?.toString() }}</p>
        <p>End: {{ eventForm.get('endTime')?.value?.toString() }}</p>
      </div>
    </form>
  `
})
export class EventFormComponent {
  eventForm = new FormGroup({
    eventDate: new FormControl<Temporal.PlainDate | null>(null),
    startTime: new FormControl<Temporal.PlainTime | null>(null),
    endTime: new FormControl<Temporal.PlainTime | null>(null)
  });

  onSubmit() {
    if (this.eventForm.valid) {
      console.log('Event data:', this.eventForm.value);
    }
  }
}
```

---

### Timezone Conversion

#### Display Time in Multiple Timezones

```typescript
import { Component } from '@angular/core';
import { TemporalTimezoneDirective, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-timezone-display',
  standalone: true,
  imports: [TemporalTimezoneDirective],
  template: `
    <div class="timezone-grid">
      <div class="timezone-item">
        <strong>New York:</strong>
        <span 
          [temporalTimezone]="'America/New_York'" 
          [temporalValue]="currentTime"
          [temporalFormat]="{dateStyle: 'medium', timeStyle: 'long'}"
          [temporalLocale]="'en-US'">
        </span>
      </div>

      <div class="timezone-item">
        <strong>London:</strong>
        <span 
          [temporalTimezone]="'Europe/London'" 
          [temporalValue]="currentTime"
          [temporalFormat]="{dateStyle: 'medium', timeStyle: 'long'}"
          [temporalLocale]="'en-GB'">
        </span>
      </div>

      <div class="timezone-item">
        <strong>Tokyo:</strong>
        <span 
          [temporalTimezone]="'Asia/Tokyo'" 
          [temporalValue]="currentTime"
          [temporalFormat]="{dateStyle: 'medium', timeStyle: 'long'}"
          [temporalLocale]="'ja-JP'">
        </span>
      </div>

      <div class="timezone-item">
        <strong>Sydney:</strong>
        <span 
          [temporalTimezone]="'Australia/Sydney'" 
          [temporalValue]="currentTime"
          [temporalFormat]="{dateStyle: 'medium', timeStyle: 'long'}"
          [temporalLocale]="'en-AU'">
        </span>
      </div>
    </div>
  `
})
export class TimezoneDisplayComponent {
  currentTime = Temporal.Now.zonedDateTimeISO();
}
```

#### Meeting Time Converter

```typescript
@Component({
  selector: 'app-meeting-converter',
  standalone: true,
  imports: [TemporalTimezoneDirective, CommonModule],
  template: `
    <div class="meeting-converter">
      <h3>Meeting Time: 2:00 PM EST</h3>
      
      <div class="conversions">
        <p>
          <strong>Pacific Time:</strong>
          <span 
            [temporalTimezone]="'America/Los_Angeles'" 
            [temporalValue]="meetingTime"
            [temporalFormat]="{timeStyle: 'short'}">
          </span>
        </p>
        
        <p>
          <strong>Central European Time:</strong>
          <span 
            [temporalTimezone]="'Europe/Paris'" 
            [temporalValue]="meetingTime"
            [temporalFormat]="{timeStyle: 'short'}">
          </span>
        </p>
        
        <p>
          <strong>India Standard Time:</strong>
          <span 
            [temporalTimezone]="'Asia/Kolkata'" 
            [temporalValue]="meetingTime"
            [temporalFormat]="{timeStyle: 'short'}">
          </span>
        </p>
      </div>
    </div>
  `
})
export class MeetingConverterComponent {
  // Meeting at 2:00 PM EST
  meetingTime = Temporal.ZonedDateTime.from({
    year: 2024,
    month: 12,
    day: 15,
    hour: 14,
    minute: 0,
    timeZone: 'America/New_York'
  });
}
```

---

## Pipes

### temporalDate Pipe

#### Basic Date Formatting

```typescript
import { Component } from '@angular/core';
import { TemporalDatePipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-date-formats',
  standalone: true,
  imports: [TemporalDatePipe],
  template: `
    <div class="date-formats">
      <p>Full: {{ date | temporalDate:{dateStyle: 'full'} }}</p>
      <p>Long: {{ date | temporalDate:{dateStyle: 'long'} }}</p>
      <p>Medium: {{ date | temporalDate:{dateStyle: 'medium'} }}</p>
      <p>Short: {{ date | temporalDate:{dateStyle: 'short'} }}</p>
    </div>
  `
})
export class DateFormatsComponent {
  date = Temporal.PlainDate.from('2024-12-25');
}
```

#### Custom Date Formatting

```typescript
@Component({
  selector: 'app-custom-date-formats',
  standalone: true,
  imports: [TemporalDatePipe],
  template: `
    <div class="custom-formats">
      <p>Year-Month-Day: {{ date | temporalDate:{year: 'numeric', month: '2-digit', day: '2-digit'} }}</p>
      <p>Month Day, Year: {{ date | temporalDate:{year: 'numeric', month: 'long', day: 'numeric'} }}</p>
      <p>Weekday, Month Day: {{ date | temporalDate:{weekday: 'long', month: 'long', day: 'numeric'} }}</p>
      <p>Short Weekday: {{ date | temporalDate:{weekday: 'short', month: 'short', day: 'numeric'} }}</p>
    </div>
  `
})
export class CustomDateFormatsComponent {
  date = Temporal.PlainDate.from('2024-12-25');
}
```

#### With Different Locales

```typescript
@Component({
  selector: 'app-localized-dates',
  standalone: true,
  imports: [TemporalDatePipe],
  template: `
    <div class="localized-dates">
      <p>English (US): {{ date | temporalDate:{dateStyle: 'full'}:'en-US' }}</p>
      <p>English (UK): {{ date | temporalDate:{dateStyle: 'full'}:'en-GB' }}</p>
      <p>French: {{ date | temporalDate:{dateStyle: 'full'}:'fr-FR' }}</p>
      <p>German: {{ date | temporalDate:{dateStyle: 'full'}:'de-DE' }}</p>
      <p>Japanese: {{ date | temporalDate:{dateStyle: 'full'}:'ja-JP' }}</p>
      <p>Spanish: {{ date | temporalDate:{dateStyle: 'full'}:'es-ES' }}</p>
    </div>
  `
})
export class LocalizedDatesComponent {
  date = Temporal.PlainDate.from('2024-12-25');
}
```

#### Works with Multiple Types

```typescript
@Component({
  selector: 'app-date-type-flexibility',
  standalone: true,
  imports: [TemporalDatePipe],
  template: `
    <div class="type-examples">
      <p>PlainDate: {{ plainDate | temporalDate:{dateStyle: 'medium'} }}</p>
      <p>PlainDateTime: {{ plainDateTime | temporalDate:{dateStyle: 'medium'} }}</p>
      <p>ZonedDateTime: {{ zonedDateTime | temporalDate:{dateStyle: 'medium'} }}</p>
      <p>String: {{ dateString | temporalDate:{dateStyle: 'medium'} }}</p>
      <p>JavaScript Date: {{ jsDate | temporalDate:{dateStyle: 'medium'} }}</p>
    </div>
  `
})
export class DateTypeFlexibilityComponent {
  plainDate = Temporal.PlainDate.from('2024-12-25');
  plainDateTime = Temporal.PlainDateTime.from('2024-12-25T14:30:00');
  zonedDateTime = Temporal.Now.zonedDateTimeISO();
  dateString = '2024-12-25';
  jsDate = new Date('2024-12-25');
}
```

---

### temporalTime Pipe

#### Basic Time Formatting

```typescript
import { Component } from '@angular/core';
import { TemporalTimePipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-time-formats',
  standalone: true,
  imports: [TemporalTimePipe],
  template: `
    <div class="time-formats">
      <p>Full: {{ time | temporalTime:{timeStyle: 'full'} }}</p>
      <p>Long: {{ time | temporalTime:{timeStyle: 'long'} }}</p>
      <p>Medium: {{ time | temporalTime:{timeStyle: 'medium'} }}</p>
      <p>Short: {{ time | temporalTime:{timeStyle: 'short'} }}</p>
    </div>
  `
})
export class TimeFormatsComponent {
  time = Temporal.PlainTime.from('14:30:45');
}
```

#### Custom Time Formatting

```typescript
@Component({
  selector: 'app-custom-time-formats',
  standalone: true,
  imports: [TemporalTimePipe],
  template: `
    <div class="custom-formats">
      <p>24-hour: {{ time | temporalTime:{hour: '2-digit', minute: '2-digit', second: '2-digit'} }}</p>
      <p>12-hour: {{ time | temporalTime:{hour: 'numeric', minute: '2-digit', hour12: true} }}</p>
      <p>Hour only: {{ time | temporalTime:{hour: 'numeric'} }}</p>
      <p>With seconds: {{ time | temporalTime:{hour: '2-digit', minute: '2-digit', second: '2-digit'} }}</p>
    </div>
  `
})
export class CustomTimeFormatsComponent {
  time = Temporal.PlainTime.from('14:30:45');
}
```

---

### temporalDateTime Pipe

#### Basic DateTime Formatting

```typescript
import { Component } from '@angular/core';
import { TemporalDateTimePipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-datetime-formats',
  standalone: true,
  imports: [TemporalDateTimePipe],
  template: `
    <div class="datetime-formats">
      <p>Full: {{ dateTime | temporalDateTime:{dateStyle: 'full', timeStyle: 'full'} }}</p>
      <p>Long: {{ dateTime | temporalDateTime:{dateStyle: 'long', timeStyle: 'long'} }}</p>
      <p>Medium: {{ dateTime | temporalDateTime:{dateStyle: 'medium', timeStyle: 'medium'} }}</p>
      <p>Short: {{ dateTime | temporalDateTime:{dateStyle: 'short', timeStyle: 'short'} }}</p>
    </div>
  `
})
export class DateTimeFormatsComponent {
  dateTime = Temporal.PlainDateTime.from('2024-12-25T14:30:00');
}
```

#### Mixed Styles

```typescript
@Component({
  selector: 'app-mixed-datetime-formats',
  standalone: true,
  imports: [TemporalDateTimePipe],
  template: `
    <div class="mixed-formats">
      <p>Full Date, Short Time: {{ dateTime | temporalDateTime:{dateStyle: 'full', timeStyle: 'short'} }}</p>
      <p>Short Date, Long Time: {{ dateTime | temporalDateTime:{dateStyle: 'short', timeStyle: 'long'} }}</p>
      <p>Medium Date, Medium Time: {{ dateTime | temporalDateTime:{dateStyle: 'medium', timeStyle: 'medium'} }}</p>
    </div>
  `
})
export class MixedDateTimeFormatsComponent {
  dateTime = Temporal.PlainDateTime.from('2024-12-25T14:30:00');
}
```

---

### temporalZonedDateTime Pipe

#### With Timezone Names

```typescript
import { Component } from '@angular/core';
import { TemporalZonedDateTimePipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-zoned-datetime-formats',
  standalone: true,
  imports: [TemporalZonedDateTimePipe],
  template: `
    <div class="zoned-formats">
      <p>Long TZ Name: {{ zonedDateTime | temporalZonedDateTime:'America/New_York':{timeZoneName: 'long'} }}</p>
      <p>Short TZ Name: {{ zonedDateTime | temporalZonedDateTime:'America/New_York':{timeZoneName: 'short'} }}</p>
      <p>No TZ Name: {{ zonedDateTime | temporalZonedDateTime:'America/New_York':{dateStyle: 'medium', timeStyle: 'medium'} }}</p>
    </div>
  `
})
export class ZonedDateTimeFormatsComponent {
  zonedDateTime = Temporal.Now.zonedDateTimeISO('Europe/London');
}
```

#### Multiple Timezones

```typescript
@Component({
  selector: 'app-multi-timezone',
  standalone: true,
  imports: [TemporalZonedDateTimePipe],
  template: `
    <div class="multi-timezone">
      <p>New York: {{ zonedDateTime | temporalZonedDateTime:'America/New_York':{dateStyle: 'short', timeStyle: 'short', timeZoneName: 'short'} }}</p>
      <p>London: {{ zonedDateTime | temporalZonedDateTime:'Europe/London':{dateStyle: 'short', timeStyle: 'short', timeZoneName: 'short'} }}</p>
      <p>Tokyo: {{ zonedDateTime | temporalZonedDateTime:'Asia/Tokyo':{dateStyle: 'short', timeStyle: 'short', timeZoneName: 'short'} }}</p>
      <p>Sydney: {{ zonedDateTime | temporalZonedDateTime:'Australia/Sydney':{dateStyle: 'short', timeStyle: 'short', timeZoneName: 'short'} }}</p>
    </div>
  `
})
export class MultiTimezoneComponent {
  zonedDateTime = Temporal.Now.zonedDateTimeISO();
}
```

---

### temporalDuration Pipe

#### Duration Formatting Styles

```typescript
import { Component } from '@angular/core';
import { TemporalDurationPipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-duration-formats',
  standalone: true,
  imports: [TemporalDurationPipe],
  template: `
    <div class="duration-formats">
      <p>Long: {{ duration | temporalDuration:{style: 'long'} }}</p>
      <p>Short: {{ duration | temporalDuration:{style: 'short'} }}</p>
      <p>Narrow: {{ duration | temporalDuration:{style: 'narrow'} }}</p>
    </div>
  `
})
export class DurationFormatsComponent {
  duration = Temporal.Duration.from({ hours: 2, minutes: 30, seconds: 45 });
}
```

#### Various Duration Examples

```typescript
@Component({
  selector: 'app-duration-examples',
  standalone: true,
  imports: [TemporalDurationPipe],
  template: `
    <div class="duration-examples">
      <p>Short Duration: {{ shortDuration | temporalDuration:{style: 'long'} }}</p>
      <p>Medium Duration: {{ mediumDuration | temporalDuration:{style: 'long'} }}</p>
      <p>Long Duration: {{ longDuration | temporalDuration:{style: 'long'} }}</p>
      <p>Days Only: {{ daysOnly | temporalDuration:{style: 'long'} }}</p>
      <p>Hours Only: {{ hoursOnly | temporalDuration:{style: 'long'} }}</p>
    </div>
  `
})
export class DurationExamplesComponent {
  shortDuration = Temporal.Duration.from({ minutes: 15 });
  mediumDuration = Temporal.Duration.from({ hours: 2, minutes: 30 });
  longDuration = Temporal.Duration.from({ days: 5, hours: 3, minutes: 45 });
  daysOnly = Temporal.Duration.from({ days: 7 });
  hoursOnly = Temporal.Duration.from({ hours: 24 });
}
```

---

### temporalRelative Pipe

#### Relative Time Formatting

```typescript
import { Component } from '@angular/core';
import { TemporalRelativePipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-relative-time',
  standalone: true,
  imports: [TemporalRelativePipe],
  template: `
    <div class="relative-time">
      <p>Yesterday: {{ yesterday | temporalRelative }}</p>
      <p>Today: {{ today | temporalRelative }}</p>
      <p>Tomorrow: {{ tomorrow | temporalRelative }}</p>
      <p>Last Week: {{ lastWeek | temporalRelative }}</p>
      <p>Next Month: {{ nextMonth | temporalRelative }}</p>
      <p>Last Year: {{ lastYear | temporalRelative }}</p>
    </div>
  `
})
export class RelativeTimeComponent {
  today = Temporal.Now.plainDateISO();
  yesterday = this.today.subtract({ days: 1 });
  tomorrow = this.today.add({ days: 1 });
  lastWeek = this.today.subtract({ weeks: 1 });
  nextMonth = this.today.add({ months: 1 });
  lastYear = this.today.subtract({ years: 1 });
}
```

#### Social Media Style Timestamps

```typescript
@Component({
  selector: 'app-social-timestamps',
  standalone: true,
  imports: [TemporalRelativePipe, CommonModule],
  template: `
    <div class="social-feed">
      <div class="post" *ngFor="let post of posts">
        <h4>{{ post.title }}</h4>
        <p class="timestamp">{{ post.date | temporalRelative }}</p>
      </div>
    </div>
  `
})
export class SocialTimestampsComponent {
  today = Temporal.Now.plainDateISO();
  
  posts = [
    { title: 'Just posted!', date: this.today },
    { title: 'Posted yesterday', date: this.today.subtract({ days: 1 }) },
    { title: 'Posted last week', date: this.today.subtract({ days: 7 }) },
    { title: 'Posted last month', date: this.today.subtract({ months: 1 }) },
  ];
}
```

---

### temporalInstant Pipe

#### Instant Formatting

```typescript
import { Component } from '@angular/core';
import { TemporalInstantPipe, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-instant-formats',
  standalone: true,
  imports: [TemporalInstantPipe],
  template: `
    <div class="instant-formats">
      <p>UTC: {{ instant | temporalInstant:'UTC':{dateStyle: 'medium', timeStyle: 'medium'} }}</p>
      <p>New York: {{ instant | temporalInstant:'America/New_York':{dateStyle: 'short', timeStyle: 'short'} }}</p>
      <p>London: {{ instant | temporalInstant:'Europe/London':{dateStyle: 'short', timeStyle: 'short'} }}</p>
      <p>Tokyo: {{ instant | temporalInstant:'Asia/Tokyo':{dateStyle: 'short', timeStyle: 'short'} }}</p>
    </div>
  `
})
export class InstantFormatsComponent {
  instant = Temporal.Now.instant();
}
```

#### Server Timestamp Display

```typescript
@Component({
  selector: 'app-server-timestamp',
  standalone: true,
  imports: [TemporalInstantPipe],
  template: `
    <div class="server-info">
      <h3>Server Time</h3>
      <p>UTC: {{ serverTimestamp | temporalInstant:'UTC':{dateStyle: 'full', timeStyle: 'long', timeZoneName: 'short'} }}</p>
      <p>Local: {{ serverTimestamp | temporalInstant:userTimezone:{dateStyle: 'full', timeStyle: 'long', timeZoneName: 'short'} }}</p>
    </div>
  `
})
export class ServerTimestampComponent {
  serverTimestamp = Temporal.Now.instant();
  userTimezone = Temporal.Now.timeZoneId();
}
```

---

## TemporalService

### Date Calculations

#### Adding and Subtracting Durations

```typescript
import { Component, inject } from '@angular/core';
import { TemporalService, Temporal } from 'angular-temporal';

@Component({
  selector: 'app-date-calculations',
  standalone: true,
  template: `
    <div class="calculations">
      <p>Today: {{ today.toString() }}</p>
      <p>Next Week: {{ nextWeek.toString() }}</p>
      <p>Next Month: {{ nextMonth.toString() }}</p>
      <p>Next Year: {{ nextYear.toString() }}</p>
      <p>Last Week: {{ lastWeek.toString() }}</p>
      <p>90 Days Ago: {{ ninetyDaysAgo.toString() }}</p>
    </div>
  `
})
export class DateCalculationsComponent {
  private temporalService = inject(TemporalService);
  
  today = this.temporalService.now().plainDate();
  nextWeek = this.temporalService.add(this.today, { weeks: 1 });
  nextMonth = this.temporalService.add(this.today, { months: 1 });
  nextYear = this.temporalService.add(this.today, { years: 1 });
  lastWeek = this.temporalService.subtract(this.today, { weeks: 1 });
  ninetyDaysAgo = this.temporalService.subtract(this.today, { days: 90 });
}
```

#### Complex Duration Calculations

```typescript
@Component({
  selector: 'app-complex-calculations',
  standalone: true,
  template: `
    <div class="complex-calculations">
      <p>Project Start: {{ projectStart.toString() }}</p>
      <p>Project End: {{ projectEnd.toString() }}</p>
      <p>Duration: {{ projectDuration }} days</p>
      <p>Milestone 1 (25%): {{ milestone1.toString() }}</p>
      <p>Milestone 2 (50%): {{ milestone2.toString() }}</p>
      <p>Milestone 3 (75%): {{ milestone3.toString() }}</p>
    </div>
  `
})
export class ComplexCalculationsComponent {
  private temporalService = inject(TemporalService);
  
  projectStart = Temporal.PlainDate.from('2024-01-01');
  projectEnd = Temporal.PlainDate.from('2024-12-31');
  projectDuration = this.temporalService.differenceInDays(this.projectStart, this.projectEnd);
  
  milestone1 = this.temporalService.add(this.projectStart, { days: Math.floor(this.projectDuration * 0.25) });
  milestone2 = this.temporalService.add(this.projectStart, { days: Math.floor(this.projectDuration * 0.50) });
  milestone3 = this.temporalService.add(this.projectStart, { days: Math.floor(this.projectDuration * 0.75) });
}
```

---

### Date Comparisons

#### Basic Comparisons

```typescript
@Component({
  selector: 'app-date-comparisons',
  standalone: true,
  template: `
    <div class="comparisons">
      <p>Date 1: {{ date1.toString() }}</p>
      <p>Date 2: {{ date2.toString() }}</p>
      <p>Is Date1 before Date2? {{ isBefore }}</p>
      <p>Is Date1 after Date2? {{ isAfter }}</p>
      <p>Are dates equal? {{ isEqual }}</p>
    </div>
  `
})
export class DateComparisonsComponent {
  private temporalService = inject(TemporalService);
  
  date1 = Temporal.PlainDate.from('2024-06-15');
  date2 = Temporal.PlainDate.from('2024-12-25');
  
  isBefore = this.temporalService.isBefore(this.date1, this.date2);
  isAfter = this.temporalService.isAfter(this.date1, this.date2);
  isEqual = this.temporalService.isEqual(this.date1, this.date2);
}
```

#### Date Range Validation

```typescript
@Component({
  selector: 'app-date-range-validation',
  standalone: true,
  template: `
    <div class="range-validation">
      <p>Booking Date: {{ bookingDate.toString() }}</p>
      <p>Valid Range: {{ rangeStart.toString() }} to {{ rangeEnd.toString() }}</p>
      <p>Is booking in valid range? {{ isInRange }}</p>
      <p *ngIf="!isInRange" class="error">
        Booking must be between {{ rangeStart.toString() }} and {{ rangeEnd.toString() }}
      </p>
    </div>
  `
})
export class DateRangeValidationComponent {
  private temporalService = inject(TemporalService);
  
  today = this.temporalService.now().plainDate();
  rangeStart = this.temporalService.add(this.today, { days: 7 });
  rangeEnd = this.temporalService.add(this.today, { days: 90 });
  bookingDate = this.temporalService.add(this.today, { days: 30 });
  
  isInRange = this.temporalService.isInRange(this.bookingDate, {
    start: this.rangeStart,
    end: this.rangeEnd
  });
}
```

---

### Type Conversions

#### Converting from Various Formats

```typescript
@Component({
  selector: 'app-type-conversions',
  standalone: true,
  template: `
    <div class="conversions">
      <h3>From String</h3>
      <p>PlainDate: {{ plainDateFromString.toString() }}</p>
      <p>PlainTime: {{ plainTimeFromString.toString() }}</p>
      <p>PlainDateTime: {{ plainDateTimeFromString.toString() }}</p>
      
      <h3>From JavaScript Date</h3>
      <p>PlainDate: {{ plainDateFromJsDate.toString() }}</p>
      <p>PlainDateTime: {{ plainDateTimeFromJsDate.toString() }}</p>
      
      <h3>From Timestamp</h3>
      <p>ZonedDateTime: {{ zonedDateTimeFromTimestamp.toString() }}</p>
      <p>Instant: {{ instantFromTimestamp.toString() }}</p>
    </div>
  `
})
export class TypeConversionsComponent {
  private temporalService = inject(TemporalService);
  
  // From strings
  plainDateFromString = this.temporalService.toPlainDate('2024-12-25');
  plainTimeFromString = this.temporalService.toPlainTime('14:30:00');
  plainDateTimeFromString = this.temporalService.toPlainDateTime('2024-12-25T14:30:00');
  
  // From JavaScript Date
  jsDate = new Date('2024-12-25T14:30:00');
  plainDateFromJsDate = this.temporalService.toPlainDate(this.jsDate);
  plainDateTimeFromJsDate = this.temporalService.toPlainDateTime(this.jsDate);
  
  // From timestamp
  timestamp = Date.now();
  zonedDateTimeFromTimestamp = this.temporalService.toZonedDateTime(this.timestamp, 'America/New_York');
  instantFromTimestamp = this.temporalService.toInstant(this.timestamp);
}
```

---

### Formatting

#### Various Format Options

```typescript
@Component({
  selector: 'app-formatting-examples',
  standalone: true,
  template: `
    <div class="formatting">
      <h3>Date Formatting</h3>
      <p>Full: {{ fullFormat }}</p>
      <p>Long: {{ longFormat }}</p>
      <p>Medium: {{ mediumFormat }}</p>
      <p>Short: {{ shortFormat }}</p>
      
      <h3>Custom Formatting</h3>
      <p>Year-Month: {{ yearMonthFormat }}</p>
      <p>Month Day: {{ monthDayFormat }}</p>
      <p>Weekday: {{ weekdayFormat }}</p>
    </div>
  `
})
export class FormattingExamplesComponent {
  private temporalService = inject(TemporalService);
  
  today = this.temporalService.now().plainDate();
  
  fullFormat = this.temporalService.format(this.today, { dateStyle: 'full' });
  longFormat = this.temporalService.format(this.today, { dateStyle: 'long' });
  mediumFormat = this.temporalService.format(this.today, { dateStyle: 'medium' });
  shortFormat = this.temporalService.format(this.today, { dateStyle: 'short' });
  
  yearMonthFormat = this.temporalService.format(this.today, { year: 'numeric', month: 'long' });
  monthDayFormat = this.temporalService.format(this.today, { month: 'long', day: 'numeric' });
  weekdayFormat = this.temporalService.format(this.today, { weekday: 'long', month: 'long', day: 'numeric' });
}
```

---

### Validation

#### Date Validation

```typescript
@Component({
  selector: 'app-date-validation',
  standalone: true,
  template: `
    <div class="validation">
      <h3>Valid Dates</h3>
      <p>2024-12-25: {{ isValid1 ? 'Valid' : 'Invalid' }}</p>
      <p>2024-02-29: {{ isValid2 ? 'Valid' : 'Invalid' }}</p>
      
      <h3>Invalid Dates</h3>
      <p>2024-13-01: {{ isValid3 ? 'Valid' : 'Invalid' }}</p>
      <p>2024-02-30: {{ isValid4 ? 'Valid' : 'Invalid' }}</p>
      <p>invalid-date: {{ isValid5 ? 'Valid' : 'Invalid' }}</p>
    </div>
  `
})
export class DateValidationComponent {
  private temporalService = inject(TemporalService);
  
  isValid1 = this.temporalService.isValidDate('2024-12-25');
  isValid2 = this.temporalService.isValidDate('2024-02-29'); // Leap year
  isValid3 = this.temporalService.isValidDate('2024-13-01'); // Invalid month
  isValid4 = this.temporalService.isValidDate('2024-02-30'); // Invalid day
  isValid5 = this.temporalService.isValidDate('invalid-date');
}
```

#### Comprehensive Validation

```typescript
@Component({
  selector: 'app-comprehensive-validation',
  standalone: true,
  template: `
    <div class="comprehensive-validation">
      <div *ngFor="let test of validationTests">
        <p>
          <strong>{{ test.input }}:</strong> 
          {{ test.result.isValid ? 'Valid' : 'Invalid' }}
          <span *ngIf="!test.result.isValid" class="error">
            - {{ test.result.error }}
          </span>
        </p>
      </div>
    </div>
  `
})
export class ComprehensiveValidationComponent {
  private temporalService = inject(TemporalService);
  
  validationTests = [
    { input: '2024-12-25', result: this.temporalService.validate('2024-12-25', 'date') },
    { input: '14:30:00', result: this.temporalService.validate('14:30:00', 'time') },
    { input: '2024-12-25T14:30:00', result: this.temporalService.validate('2024-12-25T14:30:00', 'datetime') },
    { input: 'invalid', result: this.temporalService.validate('invalid', 'date') },
  ];
}
```

---

### Configuration

#### Setting Global Configuration

```typescript
@Component({
  selector: 'app-service-configuration',
  standalone: true,
  template: `
    <div class="configuration">
      <h3>Current Configuration</h3>
      <p>Locale: {{ currentLocale() }}</p>
      <p>Timezone: {{ currentTimezone() }}</p>
      <p>Calendar: {{ currentCalendar() }}</p>
      
      <button (click)="setFrenchConfig()">Use French</button>
      <button (click)="setJapaneseConfig()">Use Japanese</button>
      <button (click)="resetConfig()">Reset to Default</button>
    </div>
  `
})
export class ServiceConfigurationComponent {
  private temporalService = inject(TemporalService);
  
  currentLocale = this.temporalService.defaultLocale;
  currentTimezone = this.temporalService.defaultTimezone;
  currentCalendar = this.temporalService.defaultCalendar;
  
  setFrenchConfig() {
    this.temporalService.setConfig({
      defaultLocale: 'fr-FR',
      defaultTimezone: 'Europe/Paris',
      defaultCalendar: 'iso8601'
    });
  }
  
  setJapaneseConfig() {
    this.temporalService.setConfig({
      defaultLocale: 'ja-JP',
      defaultTimezone: 'Asia/Tokyo',
      defaultCalendar: 'japanese'
    });
  }
  
  resetConfig() {
    this.temporalService.setConfig({
      defaultLocale: 'en-US',
      defaultTimezone: 'UTC',
      defaultCalendar: 'iso8601'
    });
  }
}
```

---

## Advanced Examples

### Date Range Picker

```typescript
import { Component, signal } from '@angular/core';
import { TemporalDatePickerComponent, TemporalService, Temporal } from 'angular-temporal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [TemporalDatePickerComponent, CommonModule],
  template: `
    <div class="date-range-picker">
      <h3>Select Date Range</h3>
      
      <div class="picker-group">
        <div class="picker-item">
          <label>Start Date:</label>
          <temporal-date-picker 
            [minYear]="2020"
            [maxYear]="2030"
            (dateChange)="onStartDateChange($event)">
          </temporal-date-picker>
        </div>
        
        <div class="picker-item">
          <label>End Date:</label>
          <temporal-date-picker 
            [minYear]="2020"
            [maxYear]="2030"
            (dateChange)="onEndDateChange($event)">
          </temporal-date-picker>
        </div>
      </div>
      
      <div *ngIf="startDate() && endDate()" class="range-info">
        <p>Start: {{ startDate()?.toString() }}</p>
        <p>End: {{ endDate()?.toString() }}</p>
        <p>Duration: {{ daysBetween }} days</p>
        <p *ngIf="!isValidRange" class="error">
          End date must be after start date
        </p>
      </div>
    </div>
  `
})
export class DateRangePickerComponent {
  private temporalService = inject(TemporalService);
  
  startDate = signal<Temporal.PlainDate | null>(null);
  endDate = signal<Temporal.PlainDate | null>(null);
  
  get daysBetween(): number {
    if (!this.startDate() || !this.endDate()) return 0;
    return this.temporalService.differenceInDays(this.startDate()!, this.endDate()!);
  }
  
  get isValidRange(): boolean {
    if (!this.startDate() || !this.endDate()) return true;
    return this.temporalService.isBefore(this.startDate()!, this.endDate()!);
  }
  
  onStartDateChange(date: Temporal.PlainDate | null) {
    this.startDate.set(date);
  }
  
  onEndDateChange(date: Temporal.PlainDate | null) {
    this.endDate.set(date);
  }
}
```

---

### Meeting Scheduler

```typescript
@Component({
  selector: 'app-meeting-scheduler',
  standalone: true,
  imports: [
    TemporalDatePickerComponent,
    TemporalTimePickerComponent,
    TemporalTimezoneDirective,
    CommonModule
  ],
  template: `
    <div class="meeting-scheduler">
      <h3>Schedule Meeting</h3>
      
      <div class="scheduler-form">
        <div class="form-group">
          <label>Meeting Date:</label>
          <temporal-date-picker 
            (dateChange)="onDateChange($event)">
          </temporal-date-picker>
        </div>
        
        <div class="form-group">
          <label>Start Time:</label>
          <temporal-time-picker 
            [use12HourFormat]="true"
            [minuteStep]="15"
            (timeChange)="onStartTimeChange($event)">
          </temporal-time-picker>
        </div>
        
        <div class="form-group">
          <label>Duration (minutes):</label>
          <select [(ngModel)]="durationMinutes">
            <option [value]="15">15 minutes</option>
            <option [value]="30">30 minutes</option>
            <option [value]="45">45 minutes</option>
            <option [value]="60">1 hour</option>
            <option [value]="90">1.5 hours</option>
            <option [value]="120">2 hours</option>
          </select>
        </div>
      </div>
      
      <div *ngIf="meetingDateTime" class="meeting-summary">
        <h4>Meeting Summary</h4>
        <p>Start: {{ meetingDateTime.toString() }}</p>
        <p>End: {{ endDateTime?.toString() }}</p>
        
        <h5>Time in Different Zones:</h5>
        <div class="timezone-list">
          <p>
            <strong>New York:</strong>
            <span 
              [temporalTimezone]="'America/New_York'" 
              [temporalValue]="zonedMeetingTime"
              [temporalFormat]="{timeStyle: 'short'}">
            </span>
          </p>
          <p>
            <strong>London:</strong>
            <span 
              [temporalTimezone]="'Europe/London'" 
              [temporalValue]="zonedMeetingTime"
              [temporalFormat]="{timeStyle: 'short'}">
            </span>
          </p>
          <p>
            <strong>Tokyo:</strong>
            <span 
              [temporalTimezone]="'Asia/Tokyo'" 
              [temporalValue]="zonedMeetingTime"
              [temporalFormat]="{timeStyle: 'short'}">
            </span>
          </p>
        </div>
      </div>
    </div>
  `
})
export class MeetingSchedulerComponent {
  private temporalService = inject(TemporalService);
  
  meetingDate: Temporal.PlainDate | null = null;
  startTime: Temporal.PlainTime | null = null;
  durationMinutes = 60;
  
  get meetingDateTime(): Temporal.PlainDateTime | null {
    if (!this.meetingDate || !this.startTime) return null;
    return this.meetingDate.toPlainDateTime(this.startTime);
  }
  
  get endDateTime(): Temporal.PlainDateTime | null {
    if (!this.meetingDateTime) return null;
    return this.temporalService.add(this.meetingDateTime, { minutes: this.durationMinutes });
  }
  
  get zonedMeetingTime(): Temporal.ZonedDateTime | null {
    if (!this.meetingDateTime) return null;
    return this.meetingDateTime.toZonedDateTime('UTC');
  }
  
  onDateChange(date: Temporal.PlainDate | null) {
    this.meetingDate = date;
  }
  
  onStartTimeChange(time: Temporal.PlainTime | null) {
    this.startTime = time;
  }
}
```

---

### Countdown Timer

```typescript
@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [TemporalDateTimePickerComponent, TemporalDurationPipe, CommonModule],
  template: `
    <div class="countdown-timer">
      <h3>Countdown Timer</h3>
      
      <div class="target-selector">
        <label>Target Date & Time:</label>
        <temporal-date-time-picker 
          [showSeconds]="true"
          (dateTimeChange)="onTargetChange($event)">
        </temporal-date-time-picker>
      </div>
      
      <div *ngIf="targetDateTime" class="countdown-display">
        <h4>Time Remaining:</h4>
        <p class="countdown-text">{{ timeRemaining | temporalDuration:{style: 'long'} }}</p>
        
        <div class="countdown-details">
          <div class="countdown-item">
            <span class="countdown-value">{{ days }}</span>
            <span class="countdown-label">Days</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-value">{{ hours }}</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-value">{{ minutes }}</span>
            <span class="countdown-label">Minutes</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-value">{{ seconds }}</span>
            <span class="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  private temporalService = inject(TemporalService);
  
  targetDateTime: Temporal.PlainDateTime | null = null;
  timeRemaining: Temporal.Duration = Temporal.Duration.from({ seconds: 0 });
  
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  
  private intervalId?: number;
  
  ngOnInit() {
    this.startCountdown();
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  onTargetChange(dateTime: Temporal.PlainDateTime | null) {
    this.targetDateTime = dateTime;
    this.updateCountdown();
  }
  
  startCountdown() {
    this.intervalId = window.setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
  
  updateCountdown() {
    if (!this.targetDateTime) return;
    
    const now = this.temporalService.now().plainDateTime();
    const diff = now.until(this.targetDateTime);
    
    this.timeRemaining = diff;
    this.days = Math.floor(diff.total('days'));
    this.hours = diff.hours;
    this.minutes = diff.minutes;
    this.seconds = diff.seconds;
  }
}
```

---

### Multi-Timezone Clock

```typescript
@Component({
  selector: 'app-multi-timezone-clock',
  standalone: true,
  imports: [TemporalInstantPipe, CommonModule],
  template: `
    <div class="multi-timezone-clock">
      <h3>World Clock</h3>
      
      <div class="clock-grid">
        <div class="clock-item" *ngFor="let zone of timezones">
          <h4>{{ zone.name }}</h4>
          <p class="clock-time">
            {{ currentTime | temporalInstant:zone.id:{hour: '2-digit', minute: '2-digit', second: '2-digit'} }}
          </p>
          <p class="clock-date">
            {{ currentTime | temporalInstant:zone.id:{dateStyle: 'medium'} }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class MultiTimezoneClockComponent implements OnInit, OnDestroy {
  currentTime = Temporal.Now.instant();
  
  timezones = [
    { name: 'New York', id: 'America/New_York' },
    { name: 'Los Angeles', id: 'America/Los_Angeles' },
    { name: 'London', id: 'Europe/London' },
    { name: 'Paris', id: 'Europe/Paris' },
    { name: 'Tokyo', id: 'Asia/Tokyo' },
    { name: 'Sydney', id: 'Australia/Sydney' },
    { name: 'Dubai', id: 'Asia/Dubai' },
    { name: 'Singapore', id: 'Asia/Singapore' },
  ];
  
  private intervalId?: number;
  
  ngOnInit() {
    this.intervalId = window.setInterval(() => {
      this.currentTime = Temporal.Now.instant();
    }, 1000);
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

---

## Polyfill Utilities

### Checking Polyfill Availability

```typescript
import { Component, OnInit } from '@angular/core';
import { temporalPolyfill } from 'angular-temporal';

@Component({
  selector: 'app-polyfill-check',
  standalone: true,
  template: `
    <div class="polyfill-info">
      <h3>Temporal Polyfill Status</h3>
      <p>Available: {{ isAvailable ? 'Yes' : 'No' }}</p>
      <p>Version: {{ version }}</p>
      
      <h4>Available Features:</h4>
      <ul>
        <li *ngFor="let feature of features">{{ feature }}</li>
      </ul>
      
      <h4>Validation:</h4>
      <p>Valid: {{ validation.isValid ? 'Yes' : 'No' }}</p>
      <ul *ngIf="!validation.isValid">
        <li *ngFor="let missing of validation.missingFeatures">
          Missing: {{ missing }}
        </li>
      </ul>
    </div>
  `
})
export class PolyfillCheckComponent implements OnInit {
  isAvailable = false;
  version = '';
  features: string[] = [];
  validation: any = {};
  
  ngOnInit() {
    this.isAvailable = temporalPolyfill.isAvailable();
    this.version = temporalPolyfill.getVersion();
    this.features = temporalPolyfill.getAvailableFeatures();
    this.validation = temporalPolyfill.validateFeatures();
  }
}
```

### Using Date.prototype.toTemporalInstant

```typescript
@Component({
  selector: 'app-date-extension',
  standalone: true,
  template: `
    <div class="date-extension">
      <h3>Date.prototype.toTemporalInstant()</h3>
      <p>JavaScript Date: {{ jsDate.toISOString() }}</p>
      <p>Temporal Instant: {{ instant.toString() }}</p>
      <p>As ZonedDateTime: {{ zonedDateTime.toString() }}</p>
    </div>
  `
})
export class DateExtensionComponent {
  jsDate = new Date();
  instant = this.jsDate.toTemporalInstant();
  zonedDateTime = this.instant.toZonedDateTimeISO('America/New_York');
}
```

---

## Format Presets

### Using Predefined Format Presets

```typescript
import { Component } from '@angular/core';
import { 
  TemporalDatePipe, 
  getFormatPreset, 
  mergeFormatOptions,
  Temporal 
} from 'angular-temporal';

@Component({
  selector: 'app-format-presets',
  standalone: true,
  imports: [TemporalDatePipe],
  template: `
    <div class="format-presets">
      <h3>Format Presets</h3>
      <p>Date Short: {{ date | temporalDate:dateShort }}</p>
      <p>Date Medium: {{ date | temporalDate:dateMedium }}</p>
      <p>Date Long: {{ date | temporalDate:dateLong }}</p>
      <p>Date Full: {{ date | temporalDate:dateFull }}</p>
      
      <h3>Custom Merged Format</h3>
      <p>Custom: {{ date | temporalDate:customFormat }}</p>
    </div>
  `
})
export class FormatPresetsComponent {
  date = Temporal.PlainDate.from('2024-12-25');
  
  dateShort = getFormatPreset('dateShort');
  dateMedium = getFormatPreset('dateMedium');
  dateLong = getFormatPreset('dateLong');
  dateFull = getFormatPreset('dateFull');
  
  customFormat = mergeFormatOptions(
    getFormatPreset('dateMedium'),
    { weekday: 'long' }
  );
}
```

---

## Best Practices

### 1. Use Signals for Reactive State

```typescript
// Good: Using signals
selectedDate = signal<Temporal.PlainDate | null>(null);

onDateChange(date: Temporal.PlainDate | null) {
  this.selectedDate.set(date);
}

// In template
<p>{{ selectedDate()?.toString() }}</p>
```

### 2. Inject TemporalService

```typescript
// Good: Using inject()
private temporalService = inject(TemporalService);

// Also good: Constructor injection
constructor(private temporalService: TemporalService) {}
```

### 3. Use Type-Safe Form Controls

```typescript
// Good: Typed form controls
dateControl = new FormControl<Temporal.PlainDate | null>(null);
timeControl = new FormControl<Temporal.PlainTime | null>(null);
```

### 4. Leverage Pipe Flexibility

```typescript
// Good: Pipes work with multiple types
<p>{{ plainDate | temporalDate }}</p>
<p>{{ plainDateTime | temporalDate }}</p>
<p>{{ zonedDateTime | temporalDate }}</p>
<p>{{ new Date() | temporalDate }}</p>
```

### 5. Configure Service Globally

```typescript
// Good: Set configuration once
ngOnInit() {
  this.temporalService.setConfig({
    defaultLocale: 'en-US',
    defaultTimezone: 'America/New_York',
    defaultCalendar: 'iso8601'
  });
}
```

---

## Contributing

Found a useful example not covered here? Please [contribute](CONTRIBUTING.md) by opening a pull request!

## License

MIT License - See [LICENSE](LICENSE) file for details
