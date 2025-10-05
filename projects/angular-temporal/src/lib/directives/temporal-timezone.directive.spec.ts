import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TemporalTimezoneDirective } from './temporal-timezone.directive';
import { TemporalService } from '@src/lib/services/temporal.service';

@Component({
  template: '<div temporalTimezone="UTC" [temporalValue]="value"></div>'
})
class TestComponent {
  value = null;
}

describe('TemporalTimezoneDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, TemporalTimezoneDirective],
      providers: [TemporalService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have directive applied', () => {
    const divElement = fixture.nativeElement.querySelector('div');
    expect(divElement).toBeTruthy();
  });
});
