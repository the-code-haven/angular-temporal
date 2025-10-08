import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Services
import { TemporalService } from './services/temporal.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [TemporalService]
})
export class AngularTemporalModule {}
