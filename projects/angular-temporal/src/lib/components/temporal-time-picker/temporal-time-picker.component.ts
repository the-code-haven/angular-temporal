import { Component, Input, Output, EventEmitter, forwardRef, inject, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Temporal } from '../../utils/polyfill';
import { TemporalService } from '../../services/temporal.service';
import { TemporalPickerConfig } from '../../types/temporal.types';

@Component({
  selector: 'temporal-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="temporal-time-picker" [ngClass]="customClasses?.['container']">
      <div class="time-selectors" [ngClass]="customClasses?.['timeContainer']">
        <select 
          [(ngModel)]="selectedHour" 
          (ngModelChange)="onTimeChange()"
          [ngClass]="customClasses?.['hourSelect']"
          class="hour-select">
          <option *ngFor="let hour of hours" [value]="hour">{{ formatHour(hour) }}</option>
        </select>
        
        <span class="time-separator">:</span>
        
        <select 
          [(ngModel)]="selectedMinute" 
          (ngModelChange)="onTimeChange()"
          [ngClass]="customClasses?.['minuteSelect']"
          class="minute-select">
          <option *ngFor="let minute of minutes" [value]="minute">{{ formatMinute(minute) }}</option>
        </select>
        
        <select 
          *ngIf="showSeconds"
          [(ngModel)]="selectedSecond" 
          (ngModelChange)="onTimeChange()"
          [ngClass]="customClasses?.['secondSelect']"
          class="second-select">
          <option *ngFor="let second of seconds" [value]="second">{{ formatSecond(second) }}</option>
        </select>
        
        <select 
          *ngIf="use12HourFormat"
          [(ngModel)]="selectedPeriod" 
          (ngModelChange)="onTimeChange()"
          [ngClass]="customClasses?.['periodSelect']"
          class="period-select">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .temporal-time-picker {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .time-selectors {
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }
    
    .time-separator {
      font-weight: bold;
      font-size: 1.2rem;
    }
    
    .hour-select,
    .minute-select,
    .second-select,
    .period-select {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      font-size: 1rem;
    }
    
    .hour-select:focus,
    .minute-select:focus,
    .second-select:focus,
    .period-select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemporalTimePickerComponent),
      multi: true
    }
  ]
})
export class TemporalTimePickerComponent implements ControlValueAccessor, OnInit {
  @Input() showSeconds?: boolean = false;
  @Input() use12HourFormat?: boolean = false;
  @Input() minuteStep?: number = 1;
  @Input() secondStep?: number = 1;
  @Input() customClasses?: Record<string, string>;

  @Output() timeChange = new EventEmitter<Temporal.PlainTime | null>();

  private temporalService = inject(TemporalService);
  private config: TemporalPickerConfig = {
    showSeconds: false,
    use12HourFormat: false,
    minuteStep: 1,
    secondStep: 1
  };

  selectedHour: number = 0;
  selectedMinute: number = 0;
  selectedSecond: number = 0;
  selectedPeriod: 'AM' | 'PM' = 'AM';

  hours: number[] = [];
  minutes: number[] = [];
  seconds: number[] = [];

  private onChange = (value: Temporal.PlainTime | null) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.config = {
      ...this.config,
      showSeconds: this.showSeconds,
      use12HourFormat: this.use12HourFormat,
      minuteStep: this.minuteStep,
      secondStep: this.secondStep
    };

    this.initializeTimeOptions();
  }

  private initializeTimeOptions(): void {
    if (this.config.use12HourFormat) {
      this.hours = Array.from({ length: 12 }, (_, i) => i + 1);
    } else {
      this.hours = Array.from({ length: 24 }, (_, i) => i);
    }

    this.minutes = Array.from(
      { length: 60 / this.config.minuteStep! },
      (_, i) => i * this.config.minuteStep!
    );

    if (this.config.showSeconds) {
      this.seconds = Array.from(
        { length: 60 / this.config.secondStep! },
        (_, i) => i * this.config.secondStep!
      );
    }
  }

  onTimeChange(): void {
    this.emitTimeChange();
  }

  private emitTimeChange(): void {
    try {
      let hour = this.selectedHour;
      
      if (this.config.use12HourFormat) {
        if (this.selectedPeriod === 'AM' && hour === 12) {
          hour = 0;
        } else if (this.selectedPeriod === 'PM' && hour !== 12) {
          hour += 12;
        }
      }

      const plainTime = Temporal.PlainTime.from({
        hour,
        minute: this.selectedMinute,
        second: this.config.showSeconds ? this.selectedSecond : 0
      });
      
      this.onChange(plainTime);
      this.timeChange.emit(plainTime);
    } catch (error) {
      console.warn('TemporalTimePickerComponent: Invalid time', error);
      this.onChange(null);
      this.timeChange.emit(null);
    }
  }

  formatHour(hour: number): string {
    if (this.config.use12HourFormat) {
      return hour.toString().padStart(2, '0');
    }
    return hour.toString().padStart(2, '0');
  }

  formatMinute(minute: number): string {
    return minute.toString().padStart(2, '0');
  }

  formatSecond(second: number): string {
    return second.toString().padStart(2, '0');
  }

  writeValue(value: Temporal.PlainTime | null): void {
    if (!value) {
      const now = this.temporalService.now().plainTime();
      this.selectedHour = now.hour;
      this.selectedMinute = now.minute;
      this.selectedSecond = now.second;
      this.selectedPeriod = now.hour < 12 ? 'AM' : 'PM';
      return;
    }

    this.selectedHour = value.hour;
    this.selectedMinute = value.minute;
    this.selectedSecond = value.second;

    if (this.config.use12HourFormat) {
      if (value.hour === 0) {
        this.selectedHour = 12;
        this.selectedPeriod = 'AM';
      } else if (value.hour < 12) {
        this.selectedHour = value.hour;
        this.selectedPeriod = 'AM';
      } else if (value.hour === 12) {
        this.selectedHour = 12;
        this.selectedPeriod = 'PM';
      } else {
        this.selectedHour = value.hour - 12;
        this.selectedPeriod = 'PM';
      }
    }
  }

  registerOnChange(fn: (value: Temporal.PlainTime | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: Implement disabled state if needed
  }
}
