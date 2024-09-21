import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../../domain/use-cases/professor-use-cases/login-use-case';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    public constructor(
        private fb: FormBuilder,
        private router: Router,
        private loginUseCase: LoginUseCase
    ) {}

    public ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
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
        const response = '';
        this.loginUseCase.execute(user).subscribe(
            () => {
                this.router.navigate(['dashboard']);
            },
            (error) => {
                console.error(error);
            }
        );
    }
}
