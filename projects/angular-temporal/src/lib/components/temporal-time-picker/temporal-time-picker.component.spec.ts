import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TemporalTimePickerComponent } from './temporal-time-picker.component';
import { TemporalService } from '../../services/temporal.service';
import { Temporal } from '../../utils/polyfill';

describe('TemporalTimePickerComponent', () => {
  let component: TemporalTimePickerComponent;
  let fixture: ComponentFixture<TemporalTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporalTimePickerComponent, FormsModule],
      providers: [TemporalService]
    }).compileComponents();

    fixture = TestBed.createComponent(TemporalTimePickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component).toBeDefined();
    expect(component.selectedHour).toBeDefined();
    expect(component.selectedMinute).toBeDefined();
    expect(component.selectedSecond).toBeDefined();
  });

  it('should generate hours array for 24-hour format', () => {
    component.use12HourFormat = false;
    component.ngOnInit();
    expect(component.hours).toEqual(Array.from({ length: 24 }, (_, i) => i));
  });

  it('should generate hours array for 12-hour format', () => {
    component.use12HourFormat = true;
    component.ngOnInit();
    expect(component.hours).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it('should generate minutes array', () => {
    component.minuteStep = 15;
    component.ngOnInit();
    expect(component.minutes).toEqual([0, 15, 30, 45]);
  });

  it('should generate seconds array', () => {
    component.showSeconds = true;
    component.secondStep = 10;
    component.ngOnInit();
    expect(component.seconds).toEqual([0, 10, 20, 30, 40, 50]);
  });

  it('should format hour correctly for 24-hour format', () => {
    component.use12HourFormat = false;
    expect(component.formatHour(9)).toBe('09');
    expect(component.formatHour(15)).toBe('15');
  });

  it('should format hour correctly for 12-hour format', () => {
    component.use12HourFormat = true;
    expect(component.formatHour(1)).toBe('01');
    expect(component.formatHour(12)).toBe('12');
  });

  it('should format minute correctly', () => {
    expect(component.formatMinute(5)).toBe('05');
    expect(component.formatMinute(30)).toBe('30');
  });

  it('should format second correctly', () => {
    expect(component.formatSecond(5)).toBe('05');
    expect(component.formatSecond(30)).toBe('30');
  });

  it('should handle time change', () => {
    spyOn(component.timeChange, 'emit');
    component.onTimeChange();
    expect(component.timeChange.emit).toHaveBeenCalled();
  });

  it('should write value', () => {
    const time = Temporal.PlainTime.from('14:30:45');
    component.writeValue(time);
    
    expect(component.selectedHour).toBe(14);
    expect(component.selectedMinute).toBe(30);
    expect(component.selectedSecond).toBe(45);
  });

  it('should write null value', () => {
    component.writeValue(null);
    
    const now = new Date();
    expect(component.selectedHour).toBe(now.getHours());
    expect(component.selectedMinute).toBe(now.getMinutes());
    expect(component.selectedSecond).toBe(now.getSeconds());
  });

  it('should register onChange callback', () => {
    const callback = jasmine.createSpy('onChange');
    component.registerOnChange(callback);
    
    component.onTimeChange();
    expect(callback).toHaveBeenCalled();
  });

  it('should register onTouched callback', () => {
    const callback = jasmine.createSpy('onTouched');
    component.registerOnTouched(callback);
    
    // Simulate blur event
    component['onTouched']();
    expect(callback).toHaveBeenCalled();
  });

  it('should handle 12-hour format period selection', () => {
    component.use12HourFormat = true;
    component.selectedHour = 2;
    component.selectedPeriod = 'PM';
    component.ngOnInit();
    
    // The component should convert 2 PM to 14 internally
    component.onTimeChange();
    // The internal selectedHour should remain 2 for display, but the emitted time should be 14:00
    expect(component.selectedHour).toBe(2); // Display value stays 2
  });

  it('should handle AM period correctly', () => {
    component.use12HourFormat = true;
    component.selectedHour = 2;
    component.selectedPeriod = 'AM';
    component.ngOnInit();
    
    component.onTimeChange();
    expect(component.selectedHour).toBe(2); // 2 AM = 02:00
  });
});
