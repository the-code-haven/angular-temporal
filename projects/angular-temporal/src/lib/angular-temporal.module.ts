import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { TemporalService } from './services/temporal.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [TemporalService]
})
export class AngularTemporalModule {}
