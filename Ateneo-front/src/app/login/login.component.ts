import { Component } from '@angular/core';
import { NavbarLandingComponent } from "../navbars/navbar-landing/navbar-landing.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorService } from '../services/professor/professor.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [NavbarLandingComponent, ReactiveFormsModule]
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(private professorService: ProfessorService, private form: FormBuilder) {
    this.formLogin = this.form.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.email]]
    })
  }
  logIn() {

    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;

    this.professorService.logIn(email, password)
      .subscribe({
        next: (response) => {
          console.log(response);

        },
        error: (error) => {
          console.log(error.error)
        },
      });

  }
}
