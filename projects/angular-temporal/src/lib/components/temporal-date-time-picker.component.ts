import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { TemporalDateTimeLike } from '../models/temporal-types';
import { TemporalService } from '../services/temporal.service';
import { Temporal } from '../utils/polyfill';
import { TemporalDatePickerComponent } from './temporal-date-picker.component';
import { TemporalTimePickerComponent } from './temporal-time-picker.component';

@Component({
  selector: 'temporal-date-time-picker',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TemporalDatePickerComponent,
    TemporalTimePickerComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalDateTimePickerComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="temporal-date-time-picker"
      [ngClass]="customClasses()?.container"
    >
      <div
        class="temporal-date-container"
        [ngClass]="customClasses()?.dateContainer"
      >
        <temporal-date-picker
          [minYear]="minYear()"
          [maxYear]="maxYear()"
          [locale]="locale()"
          [customClasses]="customDateClasses()"
          [(ngModel)]="date"
          (ngModelChange)="onDateChange($event)"
        ></temporal-date-picker>
      </div>

      <div
        class="temporal-time-container"
        [ngClass]="customClasses()?.timeContainer"
      >
        <temporal-time-picker
          [showSeconds]="showSeconds()"
          [use12HourFormat]="use12HourFormat()"
          [minuteStep]="minuteStep()"
          [secondStep]="secondStep()"
          [customClasses]="customTimeClasses()"
          [(ngModel)]="time"
          (ngModelChange)="onTimeChange($event)"
        ></temporal-time-picker>
      </div>
    </div>
  `,
})
export class TemporalDateTimePickerComponent implements ControlValueAccessor {
  readonly minYear = input(1900);
  readonly maxYear = input(2100);
  readonly locale = input('en-US');
  readonly showSeconds = input(true);
  readonly use12HourFormat = input(true);
  readonly minuteStep = input(1);
  readonly secondStep = input(1);

  readonly customClasses = input<{
    container?: string;
    dateContainer?: string;
    timeContainer?: string;
  }>();

  readonly customDateClasses = input<{
    yearSelect?: string;
    monthSelect?: string;
    daySelect?: string;
  }>();

  readonly customTimeClasses = input<{
    hourSelect?: string;
    minuteSelect?: string;
    secondSelect?: string;
    periodSelect?: string;
  }>();

  date: Temporal.PlainDate = Temporal.Now.plainDateISO();
  time: Temporal.PlainTime = Temporal.Now.plainTimeISO();

  private onChange: any = () => {};
  private onTouched: any = () => {};
  private value: Temporal.PlainDateTime = Temporal.Now.plainDateTimeISO();

  constructor(private temporalService: TemporalService) {}

  onDateChange(date: Temporal.PlainDate): void {
    this.date = date;
    this.updateDateTime();
  }

  onTimeChange(time: Temporal.PlainTime): void {
    this.time = time;
    this.updateDateTime();
  }

  private updateDateTime(): void {
    try {
      this.value = Temporal.PlainDateTime.from({
        year: this.date.year,
        month: this.date.month,
        day: this.date.day,
        hour: this.time.hour,
        minute: this.time.minute,
        second: this.time.second,
        millisecond: this.time.millisecond,
        microsecond: this.time.microsecond,
        nanosecond: this.time.nanosecond,
      });

      this.onChange(this.value);
    } catch (error) {
      console.error(
        'Error updating date-time in TemporalDateTimePickerComponent:',
        error
      );
    }
  }

  writeValue(value: TemporalDateTimeLike): void {
    if (!value) {
      return;
    }

    try {
      this.value = this.temporalService.toPlainDateTime(value);
      this.date = this.value.toPlainDate();
      this.time = this.value.toPlainTime();
    } catch (error) {
      console.error('Error setting temporal-date-time-picker value:', error);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // This component doesn't directly handle disabled state
    // as it's delegated to the child components
  }
}
