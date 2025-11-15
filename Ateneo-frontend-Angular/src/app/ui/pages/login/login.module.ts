import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HeaderModule } from '../../components/header/header.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SubmitModule } from '../../components/submit/submit.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        HeaderModule,
        SubmitModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule
    ],
    exports: [LoginComponent]
})
export class LoginModule {}
