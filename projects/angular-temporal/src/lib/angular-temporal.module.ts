import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Services
import { TemporalService } from './services/temporal.service';

// Pipes
import { TemporalDatePipe } from './pipes/temporal-date.pipe';
import { TemporalTimePipe } from './pipes/temporal-time.pipe';
import { TemporalDateTimePipe } from './pipes/temporal-date-time.pipe';
import { TemporalZonedDateTimePipe } from './pipes/temporal-zoned-date-time.pipe';
import { TemporalDurationPipe } from './pipes/temporal-duration.pipe';
import { TemporalRelativePipe } from './pipes/temporal-relative.pipe';
import { TemporalInstantPipe } from './pipes/temporal-instant.pipe';

// Directives
import { TemporalInputDirective } from './directives/temporal-input.directive';
import { TemporalTimezoneDirective } from './directives/temporal-timezone.directive';

// Components
import { TemporalDatePickerComponent } from './components/temporal-date-picker/temporal-date-picker.component';
import { TemporalTimePickerComponent } from './components/temporal-time-picker/temporal-time-picker.component';
import { TemporalDateTimePickerComponent } from './components/temporal-date-time-picker/temporal-date-time-picker.component';

const PIPES = [
  TemporalDatePipe,
  TemporalTimePipe,
  TemporalDateTimePipe,
  TemporalZonedDateTimePipe,
  TemporalDurationPipe,
  TemporalRelativePipe,
  TemporalInstantPipe
];

const DIRECTIVES = [
  TemporalInputDirective,
  TemporalTimezoneDirective
];

const COMPONENTS = [
  TemporalDatePickerComponent,
  TemporalTimePickerComponent,
  TemporalDateTimePickerComponent
];

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [TemporalService]
})
export class AngularTemporalModule {}
