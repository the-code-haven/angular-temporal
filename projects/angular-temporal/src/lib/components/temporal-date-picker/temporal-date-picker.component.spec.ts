import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TemporalService } from '../../services/temporal.service';
import { Temporal } from '../../utils/polyfill';
import { TemporalDatePickerComponent } from './temporal-date-picker.component';

describe('TemporalDatePickerComponent', () => {
  let component: TemporalDatePickerComponent;
  let fixture: ComponentFixture<TemporalDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporalDatePickerComponent, FormsModule],
      providers: [TemporalService]
    }).compileComponents();

    fixture = TestBed.createComponent(TemporalDatePickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component).toBeDefined();
    expect(component.selectedYear()).toBeDefined();
    expect(component.selectedMonth()).toBeDefined();
    expect(component.selectedDay()).toBeDefined();
  });

  it('should generate years array', () => {
    const years = component.years();
    expect(Array.isArray(years)).toBe(true);
    expect(years.length).toBeGreaterThan(0);
  });

  it('should generate months array', () => {
    const months = component.months();
    expect(months).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('should generate days for selected month', () => {
    component.selectedYear.set(2023);
    component.selectedMonth.set(2); // February
    const days = component.days();
    expect(Array.isArray(days)).toBe(true);
    expect(days.length).toBeGreaterThan(0);
  });

  it('should handle year change', () => {
    const initialYear = component.selectedYear();
    component.onYearChange(2024);
    expect(component.selectedYear()).toBe(2024);
  });

  it('should handle month change', () => {
    component.selectedYear.set(2023);
    component.onMonthChange(2);
    expect(component.selectedMonth()).toBe(2);
  });

  it('should handle day change', () => {
    component.onDayChange(15);
    expect(component.selectedDay()).toBe(15);
  });

  it('should get month name', () => {
    const monthName = component.getMonthName(1);
    expect(typeof monthName).toBe('string');
    expect(monthName.length).toBeGreaterThan(0);
  });

  it('should write value', () => {
    const date = Temporal.PlainDate.from('2023-12-25');
    component.writeValue(date);
    
    expect(component.selectedYear()).toBe(2023);
    expect(component.selectedMonth()).toBe(12);
    expect(component.selectedDay()).toBe(25);
  });

  it('should write null value', () => {
    component.writeValue(null);
    
    const currentYear = new Date().getFullYear();
    expect(component.selectedYear()).toBe(currentYear);
  });

  it('should register onChange callback', () => {
    const callback = jasmine.createSpy('onChange');
    component.registerOnChange(callback);
    
    component.onDayChange(15);
    expect(callback).toHaveBeenCalled();
  });

  it('should register onTouched callback', () => {
    const callback = jasmine.createSpy('onTouched');
    component.registerOnTouched(callback);
    
    // Simulate blur event
    component['onTouched']();
    expect(callback).toHaveBeenCalled();
  });
});
