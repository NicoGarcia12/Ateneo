import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../../shared/services/notify.service';
import { ResetPasswordViewModelService } from './reset-password-view-model.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public resetForm!: FormGroup;
    public loadingReset = false;
    public hidePassword = true;
    public email = '';
    public code = '';

    constructor(
        private fb: FormBuilder,
        private resetPasswordViewModel: ResetPasswordViewModelService,
        private notifyService: NotifyService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.email = params['email'] || '';
            this.code = params['code'] || '';
        });
        this.resetForm = this.fb.group({
            newPassword: [
                '',
                [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/)]
            ]
        });
    }

    hasError(field: string, errorType: string): boolean | undefined {
        const control = this.resetForm.get(field);
        if (!control) return undefined;
        if (field === 'newPassword' && errorType === 'pattern') {
            if (control.hasError('minlength')) {
                return false;
            }
        }
        return control.hasError(errorType) && control.touched;
    }

    resetPassword(): void {
        if (!this.resetForm.valid) {
            return;
        }
        this.loadingReset = true;
        this.resetPasswordViewModel.resetPassword(this.email, this.code, this.resetForm.value.newPassword).subscribe(
            () => {
                this.notifyService.notify('Contraseña actualizada correctamente', 'success-notify', 'Cerrar');
                this.router.navigate(['/login']);
                this.loadingReset = false;
            },
            (error: HttpErrorResponse) => {
                this.notifyService.notify(error.error.message, 'error-notify', 'Cerrar');
                this.loadingReset = false;
            }
        );
    }
}
