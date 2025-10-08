import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TemporalService } from '../../services/temporal.service';
import { TemporalPickerConfig } from '../../types/temporal.types';
import { Temporal } from '../../utils/polyfill';
import {
    TemporalDatePickerComponent
} from '../temporal-date-picker/temporal-date-picker.component';
import {
    TemporalTimePickerComponent
} from '../temporal-time-picker/temporal-time-picker.component';

@Component({
  selector: 'temporal-date-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, TemporalDatePickerComponent, TemporalTimePickerComponent],
  template: `
    <div class="temporal-date-time-picker" [ngClass]="customClasses?.['container']">
      <div class="date-time-container" [ngClass]="customClasses?.['dateTimeContainer']">
        <temporal-date-picker
          [(ngModel)]="selectedDate"
          [minYear]="minYear"
          [maxYear]="maxYear"
          [locale]="locale"
          [calendar]="calendar"
          [customClasses]="customDateClasses"
          (dateChange)="onDateChange($event)">
        </temporal-date-picker>
        
        <temporal-time-picker
          [(ngModel)]="selectedTime"
          [showSeconds]="showSeconds"
          [use12HourFormat]="use12HourFormat"
          [minuteStep]="minuteStep"
          [secondStep]="secondStep"
          [customClasses]="customTimeClasses"
          (timeChange)="onTimeChange($event)">
        </temporal-time-picker>
      </div>
    </div>
  `,
  styles: [`
    .temporal-date-time-picker {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .date-time-container {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    
    @media (max-width: 768px) {
      .date-time-container {
        flex-direction: column;
      }
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalDateTimePickerComponent),
      multi: true
    }
  ]
})
export class TemporalDateTimePickerComponent implements ControlValueAccessor, OnInit {
  @Input() minYear?: number;
  @Input() maxYear?: number;
  @Input() locale?: string;
  @Input() calendar?: string;
  @Input() timezone?: string;
  @Input() showSeconds?: boolean = false;
  @Input() use12HourFormat?: boolean = false;
  @Input() minuteStep?: number = 1;
  @Input() secondStep?: number = 1;
  @Input() customClasses?: Record<string, string>;
  @Input() customDateClasses?: Record<string, string>;
  @Input() customTimeClasses?: Record<string, string>;

  @Output() dateTimeChange = new EventEmitter<Temporal.PlainDateTime | null>();

  private temporalService = inject(TemporalService);
  private config: TemporalPickerConfig = {
    minYear: 1900,
    maxYear: 2100,
    locale: 'en-US',
    calendar: 'iso8601',
    timezone: 'UTC',
    showSeconds: false,
    use12HourFormat: false,
    minuteStep: 1,
    secondStep: 1
  };

  selectedDate: Temporal.PlainDate | null = null;
  selectedTime: Temporal.PlainTime | null = null;

  private onChange = (value: Temporal.PlainDateTime | null) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.config = {
      ...this.config,
      minYear: this.minYear,
      maxYear: this.maxYear,
      locale: this.locale,
      calendar: this.calendar,
      timezone: this.timezone,
      showSeconds: this.showSeconds,
      use12HourFormat: this.use12HourFormat,
      minuteStep: this.minuteStep,
      secondStep: this.secondStep
    };

    this.selectedDate = this.temporalService.now().plainDate();
    this.selectedTime = this.temporalService.now().plainTime();
  }

  onDateChange(date: Temporal.PlainDate | null): void {
    this.selectedDate = date;
    this.emitDateTimeChange();
  }

  onTimeChange(time: Temporal.PlainTime | null): void {
    this.selectedTime = time;
    this.emitDateTimeChange();
  }

  private emitDateTimeChange(): void {
    if (!this.selectedDate || !this.selectedTime) {
      this.onChange(null);
      this.dateTimeChange.emit(null);
      return;
    }

    try {
      const plainDateTime = this.selectedDate.toPlainDateTime(this.selectedTime);
      this.onChange(plainDateTime);
      this.dateTimeChange.emit(plainDateTime);
    } catch (error) {
      console.warn('TemporalDateTimePickerComponent: Invalid datetime', error);
      this.onChange(null);
      this.dateTimeChange.emit(null);
    }
  }

  writeValue(value: Temporal.PlainDateTime | null): void {
    if (!value) {
      const now = this.temporalService.now();
      this.selectedDate = now.plainDate();
      this.selectedTime = now.plainTime();
      return;
    }

    this.selectedDate = value.toPlainDate();
    this.selectedTime = value.toPlainTime();
  }

  registerOnChange(fn: (value: Temporal.PlainDateTime | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: Implement disabled state if needed
  }
}
