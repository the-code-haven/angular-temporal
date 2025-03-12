import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TemporalServicesModule } from './services/temporal-services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TemporalServicesModule
  ],
  exports: [
    TemporalServicesModule
  ]
})
export class AngularTemporalModule { }
