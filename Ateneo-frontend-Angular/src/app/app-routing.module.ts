import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './ui/pages/landing/landing.component';
import { ErrorComponent } from './ui/pages/error/error.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { SignUpComponent } from './ui/pages/sign-up/sign-up.component';
import { AuthGuard } from './ui/shared/auth.guard';
import { DashboardComponent } from './ui/pages/dashboard/dashboard.component';
import { SubjectsComponent } from './ui/pages/dashboard/subjects/subjects.component';
import { SubjectDetailsComponent } from './ui/pages/dashboard/subjects/subject-details/subject-details.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'subjects', pathMatch: 'full' },
            { path: 'subjects', component: SubjectsComponent },
            { path: 'subject/:idSubject', component: SubjectDetailsComponent }
        ]
    },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
