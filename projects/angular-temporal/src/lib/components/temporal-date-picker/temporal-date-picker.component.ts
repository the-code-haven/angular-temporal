import { Component, input, output, forwardRef, inject, OnInit, signal, computed, effect } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Temporal } from '../../utils/polyfill';
import { TemporalService } from '../../services/temporal.service';
import { TemporalPickerConfig } from '../../types/temporal.types';

@Component({
  selector: 'temporal-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="temporal-date-picker" [ngClass]="customClasses()?.['container']">
      <div class="date-selectors" [ngClass]="customClasses()?.['dateContainer']">
        <select 
          [ngModel]="selectedYear()" 
          (ngModelChange)="onYearChange($event)"
          [ngClass]="customClasses()?.['yearSelect']"
          class="year-select">
          <option *ngFor="let year of years()" [value]="year">{{ year }}</option>
        </select>
        
        <select 
          [ngModel]="selectedMonth()" 
          (ngModelChange)="onMonthChange($event)"
          [ngClass]="customClasses()?.['monthSelect']"
          class="month-select">
          <option *ngFor="let month of months(); let i = index" [value]="i + 1">
            {{ getMonthName(i + 1) }}
          </option>
        </select>
        
        <select 
          [ngModel]="selectedDay()" 
          (ngModelChange)="onDayChange($event)"
          [ngClass]="customClasses()?.['daySelect']"
          class="day-select">
          <option *ngFor="let day of days()" [value]="day">{{ day }}</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .temporal-date-picker {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .date-selectors {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    
    .year-select,
    .month-select,
    .day-select {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      font-size: 1rem;
    }
    
    .year-select:focus,
    .month-select:focus,
    .day-select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalDatePickerComponent),
      multi: true
    }
  ]
})
export class TemporalDatePickerComponent implements ControlValueAccessor, OnInit {
  minYear = input<number>();
  maxYear = input<number>();
  locale = input<string>();
  calendar = input<string>();
  customClasses = input<Record<string, string>>();

  dateChange = output<Temporal.PlainDate | null>();

  private temporalService = inject(TemporalService);
  
  selectedYear = signal<number>(new Date().getFullYear());
  selectedMonth = signal<number>(new Date().getMonth() + 1);
  selectedDay = signal<number>(new Date().getDate());
  years = computed(() => {
    const currentYear = new Date().getFullYear();
    const minYear = this.minYear() || currentYear - 100;
    const maxYear = this.maxYear() || currentYear + 100;
    
    return Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => minYear + i
    );
  });

  months = computed(() => Array.from({ length: 12 }, (_, i) => i + 1));

  days = computed(() => {
    const daysInMonth = this.temporalService.getDaysInMonth(this.selectedYear(), this.selectedMonth());
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  });

  config = computed<TemporalPickerConfig>(() => ({
    minYear: this.minYear() || 1900,
    maxYear: this.maxYear() || 2100,
    locale: this.locale() || 'en-US',
    calendar: this.calendar() || 'iso8601'
  }));

  private onChange = (value: Temporal.PlainDate | null) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    effect(() => {
      const daysInMonth = this.temporalService.getDaysInMonth(this.selectedYear(), this.selectedMonth());
      const currentDay = this.selectedDay();
      
      if (currentDay > daysInMonth) {
        this.selectedDay.set(daysInMonth);
      }
    });
  }

  onYearChange(year: number): void {
    this.selectedYear.set(year);
    this.emitDateChange();
  }

  onMonthChange(month: number): void {
    this.selectedMonth.set(month);
    this.emitDateChange();
  }

  onDayChange(day: number): void {
    this.selectedDay.set(day);
    this.emitDateChange();
  }

  private emitDateChange(): void {
    try {
      const plainDate = Temporal.PlainDate.from({
        year: this.selectedYear(),
        month: this.selectedMonth(),
        day: this.selectedDay()
      });
      
      this.onChange(plainDate);
      this.dateChange.emit(plainDate);
    } catch (error) {
      console.warn('TemporalDatePickerComponent: Invalid date', error);
      this.onChange(null);
      this.dateChange.emit(null);
    }
  }

  getMonthName(month: number): string {
    const date = new Date(2000, month - 1, 1);
    return date.toLocaleDateString(this.config().locale, { month: 'long' });
  }

  writeValue(value: Temporal.PlainDate | null): void {
    if (!value) {
      const today = this.temporalService.now().plainDate();
      this.selectedYear.set(today.year);
      this.selectedMonth.set(today.month);
      this.selectedDay.set(today.day);
      return;
    }

    this.selectedYear.set(value.year);
    this.selectedMonth.set(value.month);
    this.selectedDay.set(value.day);
  }

  registerOnChange(fn: (value: Temporal.PlainDate | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: Implement disabled state if needed
  }
}
