import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { TemporalTimeLike } from '../models/temporal-types';
import { TemporalService } from '../services/temporal.service';
import { Temporal } from '../utils/polyfill';

@Component({
  selector: 'temporal-time-picker',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalTimePickerComponent),
      multi: true,
    },
  ],
  template: `
    <div class="temporal-fusion-time-picker" [formGroup]="timeForm">
      <div class="temporal-fusion-time-controls">
        <select
          class="temporal-fusion-select temporal-fusion-hour-select"
          [ngClass]="customClasses()?.hourSelect"
          formControlName="hour"
        >
          <option *ngFor="let option of hourOptions" [value]="option.value">
            {{ option.label }}
          </option>
        </select>
        <select
          class="temporal-fusion-select temporal-fusion-minute-select"
          [ngClass]="customClasses()?.minuteSelect"
          formControlName="minute"
        >
          <option *ngFor="let option of minuteOptions" [value]="option.value">
            {{ option.label }}
          </option>
        </select>
        <select
          *ngIf="showSeconds()"
          class="temporal-fusion-select temporal-fusion-second-select"
          [ngClass]="customClasses()?.secondSelect"
          formControlName="second"
        >
          <option *ngFor="let option of secondOptions" [value]="option.value">
            {{ option.label }}
          </option>
        </select>
        <select
          *ngIf="use12HourFormat()"
          class="temporal-fusion-select temporal-fusion-period-select"
          [ngClass]="customClasses()?.periodSelect"
          formControlName="period"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  `,
})
export class TemporalTimePickerComponent
  implements ControlValueAccessor, OnInit
{
  readonly showSeconds = input(false);
  readonly use12HourFormat = input(false);
  readonly minuteStep = input(1);
  readonly secondStep = input(1);

  readonly customClasses = input<{
    hourSelect?: string;
    minuteSelect?: string;
    secondSelect?: string;
    periodSelect?: string;
  }>();

  timeForm = new FormGroup({
    hour: new FormControl<number>(0, { nonNullable: true }),
    minute: new FormControl<number>(0, { nonNullable: true }),
    second: new FormControl<number>(0, { nonNullable: true }),
    period: new FormControl<string>('AM', { nonNullable: true }),
  });

  hourOptions: { value: number; label: string }[] = [];
  minuteOptions: { value: number; label: string }[] = [];
  secondOptions: { value: number; label: string }[] = [];

  private onChange: any = () => {};
  private onTouched: any = () => {};
  private value: Temporal.PlainTime = Temporal.Now.plainTimeISO();

  constructor(private temporalService: TemporalService) {}

  ngOnInit(): void {
    this.generateTimeOptions();

    this.timeForm.valueChanges.subscribe(() => {
      this.updateValue();
    });
  }

  private generateTimeOptions(): void {
    // Generate hour options
    this.hourOptions = [];
    const hourLimit = this.use12HourFormat() ? 12 : 24;
    const startHour = this.use12HourFormat() ? 1 : 0;

    for (let h = startHour; h < hourLimit; h++) {
      this.hourOptions.push({
        value: h,
        label: h.toString().padStart(2, '0'),
      });
    }

    this.minuteOptions = [];
    for (let m = 0; m < 60; m += this.minuteStep()) {
      this.minuteOptions.push({
        value: m,
        label: m.toString().padStart(2, '0'),
      });
    }

    this.secondOptions = [];
    for (let s = 0; s < 60; s += this.secondStep()) {
      this.secondOptions.push({
        value: s,
        label: s.toString().padStart(2, '0'),
      });
    }
  }

  private updateValue(): void {
    try {
      const formValue = this.timeForm.getRawValue();
      let hour = formValue.hour;

      if (this.use12HourFormat()) {
        if (formValue.period === 'PM' && hour < 12) {
          hour += 12;
        } else if (formValue.period === 'AM' && hour === 12) {
          hour = 0;
        }
      }

      this.value = Temporal.PlainTime.from({
        hour,
        minute: formValue.minute,
        second: this.showSeconds() ? formValue.second : 0,
      });

      this.onChange(this.value);
      this.onTouched();
    } catch (error) {
      console.error('Invalid time in TemporalTimePicker:', error);
    }
  }

  writeValue(value: TemporalTimeLike): void {
    if (!value) {
      return;
    }

    try {
      this.value = this.temporalService.toPlainTime(value);

      let hour = this.value.hour;
      let period = 'AM';

      if (this.use12HourFormat()) {
        period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // 12 AM/PM instead of 0
      }

      this.timeForm.setValue(
        {
          hour,
          minute: this.value.minute,
          second: this.value.second,
          period,
        },
        { emitEvent: false }
      );
    } catch (error) {
      console.error('Error setting temporal-time-picker value:', error);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.timeForm.disable();
    } else {
      this.timeForm.enable();
    }
  }
}
