import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ResolutionService } from '../../shared/services/resolution.service';
import { SignUpViewModelService } from './sign-up-view-model.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotifyService } from '../../shared/services/notify.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    public signUpForm!: FormGroup;
    public isMobile: boolean = false;

    public constructor(
        private fb: FormBuilder,
        private router: Router,
        private resolutionService: ResolutionService,
        private signUpViewModelService: SignUpViewModelService,
        private notifyService: NotifyService
    ) {}

    public ngOnInit(): void {
        this.signUpForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/)]]
        });

        this.resolutionService.screenWidth$.subscribe((width) => {
            this.isMobile = width <= 600;
        });
    }

    public hasError(field: string, errorType: string): boolean | undefined {
        const control = this.signUpForm.get(field);

        if (!control) {
            return undefined;
        }

        if (field === 'password' && errorType === 'pattern') {
            if (control.hasError('minlength')) {
                return false;
            }
        }

        return control.hasError(errorType) && control.touched;
    }

    public signUp(): void {
        if (!this.signUpForm.valid) {
            return;
        }

        const { firstName, lastName, email, password } = this.signUpForm.value;

        this.signUpViewModelService.signUp(email, password, firstName, lastName).subscribe({
            next: (success) => {
                console.log(success);
                // this.notifyService.notify(message,"success","Cerrar",5)
                this.router.navigate(['/login']);
            },
            error: (error: HttpErrorResponse) => {
                this.notifyService.notify(error.error.message, 'error', 'Cerrar');
            }
        });
    }
}
