import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './ui/pages/landing/landing.component';
import { ErrorComponent } from './ui/pages/error/error.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  // { path: 'sign-up', component: SignUpComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   children: [
  //     { path: 'profile', component: ProfileComponent },
  //     { path: 'subject ', component: MateriaComponent },
  //     { path: '', redirectTo: 'profile', pathMatch: 'full' },
  //   ],
  // },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
