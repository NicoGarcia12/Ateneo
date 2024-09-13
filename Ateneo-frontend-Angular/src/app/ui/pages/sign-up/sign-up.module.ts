import { NgModule } from '@angular/core';
import { HeaderModule } from '../../components/header/header.module';
import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    HeaderModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  exports: [SignUpComponent],
})
export class SignUpModule {}
