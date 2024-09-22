import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginViewModelService } from './login-view-model.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    public constructor(
        private fb: FormBuilder,
        private loginViewModelService: LoginViewModelService,
        private router: Router
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

        this.loginViewModelService.login(user.email, user.password).subscribe(
            () => {
                this.router.navigate(['dashboard']);
            },
            (error: HttpErrorResponse) => {
                // throw error;
                console.warn(error.error.message);
            }
        );
    }
}
