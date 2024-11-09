import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './ui/pages/landing/landing.module';
import { ErrorModule } from './ui/pages/error/error.module';
import { LoginModule } from './ui/pages/login/login.module';
import { SignUpModule } from './ui/pages/sign-up/sign-up.module';
import { DashboardModule } from './ui/pages/dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
        AppRoutingModule,
        MatSnackBarModule,
        CommonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
