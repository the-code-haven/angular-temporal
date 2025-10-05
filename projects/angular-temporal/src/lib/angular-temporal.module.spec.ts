import { TestBed } from '@angular/core/testing';
import { AngularTemporalModule } from './angular-temporal.module';

describe('AngularTemporalModule', () => {
  let module: AngularTemporalModule;

  beforeEach(() => {
    module = new AngularTemporalModule();
  });

  it('should create', () => {
    expect(module).toBeTruthy();
  });

  it('should be an instance of AngularTemporalModule', () => {
    expect(module).toBeInstanceOf(AngularTemporalModule);
  });
});
