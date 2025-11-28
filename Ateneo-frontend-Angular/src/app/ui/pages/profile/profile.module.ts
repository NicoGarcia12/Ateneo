import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  exports: [ProfileComponent]
})
export class ProfileModule {}
