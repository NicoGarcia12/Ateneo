import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './ui/pages/landing/landing.component';
import { ErrorComponent } from './ui/pages/error/error.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { SignUpComponent } from './ui/pages/sign-up/sign-up.component';
import { DashboardComponent } from './ui/pages/dashboard/dashboard.component';
import { AuthGuard } from './ui/shared/auth.guard';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
        // children: [
        //   { path: 'profile', component: ProfileComponent },
        //   { path: 'subject ', component: MateriaComponent },
        //   { path: '', redirectTo: 'profile', pathMatch: 'full' },
        // ],
    },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
