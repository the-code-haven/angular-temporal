import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalService } from '../services/temporal.service';
import { TemporalInputDirective } from './temporal-input.directive';

@Component({
  template: '<input temporalInput="date" [temporalConfig]="config" [temporalValue]="value">'
})
class TestComponent {
  config = {};
  value = null;
}

describe('TemporalInputDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, TemporalInputDirective],
      providers: [TemporalService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have directive applied', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
  });
});
