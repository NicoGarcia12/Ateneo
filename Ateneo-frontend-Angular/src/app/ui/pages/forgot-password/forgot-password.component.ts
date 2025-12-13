import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../../shared/services/notify.service';
import { ForgotPasswordViewModelService } from './forgot-password-view-model.service';
import { emailValidator } from '../../../utils/validators/email.validator';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    public emailForm!: FormGroup;
    public codeForm!: FormGroup;
    public loadingRequest = false;
    public loadingVerify = false;
    public showCodeInput = false;
    public email = '';

    constructor(
        private fb: FormBuilder,
        private forgotPasswordViewModel: ForgotPasswordViewModelService,
        private notifyService: NotifyService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, emailValidator()]]
        });
        this.codeForm = this.fb.group({
            code: ['', [Validators.required]]
        });
    }

    hasError(form: FormGroup, field: string, errorType: string): boolean | undefined {
        const control = form.get(field);
        return control?.hasError(errorType) && control?.touched;
    }

    requestReset(): void {
        if (!this.emailForm.valid) {
            return;
        }
        this.loadingRequest = true;
        this.email = this.emailForm.value.email;
        this.forgotPasswordViewModel.requestReset(this.email).subscribe(
            () => {
                this.notifyService.notify('Se ha enviado un código a tu email', 'success-notify', 'Cerrar');
                this.showCodeInput = true;
                this.loadingRequest = false;
            },
            (error: HttpErrorResponse) => {
                this.notifyService.notify(error.error.message, 'error-notify', 'Cerrar');
                this.loadingRequest = false;
            }
        );
    }

    verifyCode(): void {
        if (!this.codeForm.valid) {
            return;
        }
        this.loadingVerify = true;
        this.forgotPasswordViewModel.verifyCode(this.email, this.codeForm.value.code).subscribe(
            () => {
                this.notifyService.notify('Código verificado correctamente', 'success-notify', 'Cerrar');
                this.router.navigate(['/reset-password'], { queryParams: { email: this.email, code: this.codeForm.value.code } });
                this.loadingVerify = false;
            },
            (error: HttpErrorResponse) => {
                this.notifyService.notify(error.error.message, 'error-notify', 'Cerrar');
                this.loadingVerify = false;
            }
        );
    }
}
