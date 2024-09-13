import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  public constructor(private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public hasError(field: string, errorType: string): boolean | undefined {
    const control = this.loginForm.get(field);
    return control?.hasError(errorType) && control?.touched;
  }

  public login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const user = this.loginForm.value;

    if (
      user.email === 'nicolasgarcia9812@hotmail.com' &&
      user.password === '1234567890'
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Credenciales incorrectas');
    }
  }
}
