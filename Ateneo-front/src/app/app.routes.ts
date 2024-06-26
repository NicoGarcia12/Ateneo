import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    {
        path: 'dashboard', component: DashboardComponent, children: [
        ]
    },
    { path: '**', component: ErrorPageComponent }
];
