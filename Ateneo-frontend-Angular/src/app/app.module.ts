import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './ui/pages/landing/landing.module';
import { ErrorModule } from './ui/pages/error/error.module';
import { LoginModule } from './ui/pages/login/login.module';
import { SignUpModule } from './ui/pages/sign-up/sign-up.module';
import { DashboardModule } from './ui/pages/dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalDialogModule } from './ui/components/modal-dialog/modal-dialog.module';
import { ForgotPasswordModule } from './ui/pages/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './ui/pages/reset-password/reset-password.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        ErrorModule,
        LandingModule,
        LoginModule,
        SignUpModule,
        DashboardModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        AppRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        ModalDialogModule,
        CommonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
