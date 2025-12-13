import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password.component';
import { HeaderModule } from '../../components/header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SubmitModule } from '../../components/submit/submit.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        HeaderModule,
        SubmitModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        CommonModule,
        MatButtonModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
