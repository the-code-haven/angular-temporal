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

import { TemporalDateLike } from '../models/temporal-types';
import { TemporalService } from '../services/temporal.service';
import { Temporal } from '../utils/polyfill';

@Component({
  selector: 'temporal-date-picker',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalDatePickerComponent),
      multi: true,
    },
  ],
  template: `
    <div class="temporal-date-picker" [formGroup]="dateForm">
      <div class="temporal-date-controls">
        <select
          class="temporal-select temporal-year-select"
          [ngClass]="customClasses()?.yearSelect"
          formControlName="year"
          (change)="onYearChange()"
        >
          <option *ngFor="let year of yearOptions" [value]="year">
            {{ year }}
          </option>
        </select>
        <select
          class="temporal-select temporal-month-select"
          [ngClass]="customClasses()?.monthSelect"
          formControlName="month"
          (change)="onMonthChange()"
        >
          <option *ngFor="let month of monthOptions" [value]="month.value">
            {{ month.label }}
          </option>
        </select>
        <select
          class="temporal-select temporal-day-select"
          [ngClass]="customClasses()?.daySelect"
          formControlName="day"
          (change)="onDayChange()"
        >
          <option *ngFor="let day of dayOptions" [value]="day">
            {{ day }}
          </option>
        </select>
      </div>
    </div>
  `,
})
export class TemporalDatePickerComponent
  implements ControlValueAccessor, OnInit
{
  readonly minYear = input(1900);
  readonly maxYear = input(2100);
  readonly locale = input('en-US');

  readonly customClasses = input<{
    yearSelect?: string;
    monthSelect?: string;
    daySelect?: string;
  }>();

  dateForm = new FormGroup({
    year: new FormControl<number>(0, { nonNullable: true }),
    month: new FormControl<number>(1, { nonNullable: true }),
    day: new FormControl<number>(1, { nonNullable: true }),
  });

  yearOptions: number[] = [];
  monthOptions: { value: number; label: string }[] = [];
  dayOptions: number[] = [];

  private onChange: any = () => {};
  private onTouched: any = () => {};
  private value: Temporal.PlainDate = Temporal.Now.plainDateISO();

  constructor(private temporalService: TemporalService) {}

  ngOnInit(): void {
    this.generateYearOptions();
    this.generateMonthOptions();
    this.generateDayOptions();

    this.dateForm.valueChanges.subscribe(() => {
      this.updateValue();
    });
  }

  private generateYearOptions(): void {
    this.yearOptions = [];
    for (let year = this.minYear(); year <= this.maxYear(); year++) {
      this.yearOptions.push(year);
    }
  }

  private generateMonthOptions(): void {
    this.monthOptions = [];
    const formatter = new Intl.DateTimeFormat(this.locale(), { month: 'long' });

    for (let month = 1; month <= 12; month++) {
      const tempDate = new Date(2000, month - 1, 1);
      this.monthOptions.push({
        value: month,
        label: formatter.format(tempDate),
      });
    }
  }

  private generateDayOptions(): void {
    const year = this.dateForm.get('year')?.value || this.value.year;
    const month = this.dateForm.get('month')?.value || this.value.month;

    const daysInMonth = Temporal.PlainDate.from({
      year,
      month,
      day: 1,
    }).daysInMonth;

    this.dayOptions = [];
    for (let day = 1; day <= daysInMonth; day++) {
      this.dayOptions.push(day);
    }
  }

  onYearChange(): void {
    this.generateDayOptions();
  }

  onMonthChange(): void {
    this.generateDayOptions();
  }

  onDayChange(): void {
    // Handled by the valueChanges subscription
  }

  private updateValue(): void {
    const { year, month, day } = this.dateForm.getRawValue();

    if (year && month && day) {
      try {
        this.value = Temporal.PlainDate.from({ year, month, day });
        this.onChange(this.value);
      } catch (error) {
        console.error('Invalid date in TemporalDatePicker:', error);
      }
    }
  }

  writeValue(value: TemporalDateLike): void {
    if (!value) {
      return;
    }

    try {
      this.value = this.temporalService.toPlainDate(value);

      this.dateForm.setValue(
        {
          year: this.value.year,
          month: this.value.month,
          day: this.value.day,
        },
        { emitEvent: false }
      );

      this.generateDayOptions();
    } catch (error) {
      console.error('Error setting temporal-date-picker value:', error);
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
      this.dateForm.disable();
    } else {
      this.dateForm.enable();
    }
  }
}
