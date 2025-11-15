import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginViewModelService } from './login-view-model.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../../shared/services/notify.service';
import { TokenService } from '../../shared/services/token.service';
import { DashboardTitleService } from '../dashboard/dashboard-title.service';
import { emailValidator } from '../../../utils/validators/email.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;
    public loadingLogin: boolean = false;
    public hidePassword: boolean = true;

    public constructor(
        private fb: FormBuilder,
        private loginViewModelService: LoginViewModelService,
        private notifyService: NotifyService,
        private tokenService: TokenService,
        private dashboardTitleService: DashboardTitleService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        if (this.tokenService.getUserFromToken() !== null) {
            this.router.navigate(['/dashboard/subjects']);
        }

        this.dashboardTitleService.setTitle(``);

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, emailValidator()]],
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
        this.loadingLogin = true;

        let user = this.loginForm.value;
        this.loginViewModelService.login(user.email, user.password).subscribe(
            (response) => {
                console.log(response);
                this.tokenService.setToken(response.data);
                this.router.navigate(['/dashboard/subjects']);
                this.loadingLogin = false;
            },
            (error: HttpErrorResponse) => {
                this.notifyService.notify(error.error.message, 'error-notify', 'Cerrar');
                this.loadingLogin = false;
                throw error.error.message;
            }
        );
    }
}
