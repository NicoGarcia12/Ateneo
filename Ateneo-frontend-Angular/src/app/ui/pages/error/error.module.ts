import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ErrorComponent],
  imports: [MatButtonModule, CommonModule],
  exports: [ErrorComponent],
})
export class ErrorModule {}
