import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TemporalService } from '../../services/temporal.service';
import { Temporal } from '../../utils/polyfill';
import { TemporalDateTimePickerComponent } from './temporal-date-time-picker.component';

describe('TemporalDateTimePickerComponent', () => {
  let component: TemporalDateTimePickerComponent;
  let fixture: ComponentFixture<TemporalDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporalDateTimePickerComponent, FormsModule],
      providers: [TemporalService]
    }).compileComponents();

    fixture = TestBed.createComponent(TemporalDateTimePickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component).toBeDefined();
    expect(component.selectedDate).toBeDefined();
    expect(component.selectedTime).toBeDefined();
  });

  it('should handle date change', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    spyOn(component.dateTimeChange, 'emit');
    
    component.onDateChange(date);
    
    expect(component.selectedDate).toBe(date);
    expect(component.dateTimeChange.emit).toHaveBeenCalled();
  });

  it('should handle time change', () => {
    const time = Temporal.PlainTime.from('14:30:45');
    spyOn(component.dateTimeChange, 'emit');
    
    component.onTimeChange(time);
    
    expect(component.selectedTime).toBe(time);
    expect(component.dateTimeChange.emit).toHaveBeenCalled();
  });

  it('should write value with PlainDateTime', () => {
    const dateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    component.writeValue(dateTime);
    
    expect(component.selectedDate).toEqual(Temporal.PlainDate.from('2023-12-25'));
    expect(component.selectedTime).toEqual(Temporal.PlainTime.from('14:30:45'));
  });

  it('should write null value', () => {
    component.writeValue(null);
    
    const now = new Date();
    expect(component.selectedDate).toBeDefined();
    expect(component.selectedTime).toBeDefined();
  });

  it('should register onChange callback', () => {
    const callback = jasmine.createSpy('onChange');
    component.registerOnChange(callback);
    
    component.onDateChange(Temporal.PlainDate.from('2023-12-25'));
    expect(callback).toHaveBeenCalled();
  });

  it('should register onTouched callback', () => {
    const callback = jasmine.createSpy('onTouched');
    component.registerOnTouched(callback);
    
    // Simulate blur event
    component['onTouched']();
    expect(callback).toHaveBeenCalled();
  });

  it('should emit dateTimeChange when both date and time are set', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    const time = Temporal.PlainTime.from('14:30:45');
    spyOn(component.dateTimeChange, 'emit');
    
    component.selectedDate = date;
    component.selectedTime = time;
    component.onDateChange(date); // This will trigger emitDateTimeChange internally
    
    const expectedDateTime = Temporal.PlainDateTime.from('2023-12-25T14:30:45');
    expect(component.dateTimeChange.emit).toHaveBeenCalledWith(expectedDateTime);
  });

  it('should handle configuration properties', () => {
    component.minYear = 2020;
    component.maxYear = 2030;
    component.locale = 'fr-FR';
    component.calendar = 'iso8601';
    component.showSeconds = true;
    component.use12HourFormat = true;
    component.minuteStep = 15;
    component.secondStep = 10;
    
    expect(component.minYear).toBe(2020);
    expect(component.maxYear).toBe(2030);
    expect(component.locale).toBe('fr-FR');
    expect(component.calendar).toBe('iso8601');
    expect(component.showSeconds).toBe(true);
    expect(component.use12HourFormat).toBe(true);
    expect(component.minuteStep).toBe(15);
    expect(component.secondStep).toBe(10);
  });

  it('should handle custom classes', () => {
    const customClasses = { container: 'custom-container' };
    const customDateClasses = { container: 'custom-date' };
    const customTimeClasses = { container: 'custom-time' };
    
    component.customClasses = customClasses;
    component.customDateClasses = customDateClasses;
    component.customTimeClasses = customTimeClasses;
    
    expect(component.customClasses).toBe(customClasses);
    expect(component.customDateClasses).toBe(customDateClasses);
    expect(component.customTimeClasses).toBe(customTimeClasses);
  });
});
