import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professor } from 'src/app/domain/entities/professor';
import { TokenService } from '../../shared/services/token.service';
import { ProfileViewModelService } from './profile-view-model.service';
import { NotifyService } from '../../shared/services/notify.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup;
    professor: Professor | null = null;
    isEditing = false;
    isLoading = false;
    isSaving = false;
    showNewPassword = false;

    constructor(
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private profileViewModel: ProfileViewModelService,
        private notifyService: NotifyService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadProfessorData();
    }

    private initForm(): void {
        this.profileForm = this.formBuilder.group({
            firstName: [{ value: '', disabled: true }, Validators.required],
            lastName: [{ value: '', disabled: true }, Validators.required],
            email: [{ value: '', disabled: true }],
            password: ['', Validators.required],
            changePassword: [false],
            newPassword: ['']
        });

        this.profileForm.get('changePassword')?.valueChanges.subscribe((checked) => {
            this.showNewPassword = checked;
            const newPasswordControl = this.profileForm.get('newPassword');
            if (checked) {
                newPasswordControl?.setValidators([
                    Validators.required,
                    Validators.minLength(10),
                    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/)
                ]);
            } else {
                newPasswordControl?.clearValidators();
                newPasswordControl?.setValue('');
            }
            newPasswordControl?.updateValueAndValidity();
        });
    }

    private loadProfessorData(): void {
        const professor = this.tokenService.getUserFromToken();
        if (professor?.id) {
            this.isLoading = true;
            this.profileViewModel.getProfessor(professor.id).subscribe({
                next: (data) => {
                    this.professor = data;
                    this.profileForm.patchValue({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email
                    });
                    this.isLoading = false;
                },
                error: () => {
                    this.notifyService.notify('Error al cargar los datos del profesor', 'error-notify', 'Cerrar');
                    this.isLoading = false;
                }
            });
        }
    }

    onEdit(): void {
        this.isEditing = true;
        this.profileForm.get('firstName')?.enable();
        this.profileForm.get('lastName')?.enable();
    }

    getNewPasswordError(): string | null {
        const control = this.profileForm.get('newPassword');
        if (!control || !control.touched) return null;
        if (control.hasError('required')) return 'La nueva contraseña es obligatoria';
        if (control.hasError('minlength')) return 'La contraseña debe tener al menos 10 caracteres';
        if (control.hasError('pattern')) return 'La contraseña debe tener al menos una letra y un número';
        return null;
    }

    onCancel(): void {
        this.isEditing = false;
        this.showNewPassword = false;
        this.profileForm.get('firstName')?.disable();
        this.profileForm.get('lastName')?.disable();
        this.profileForm.patchValue({
            firstName: this.professor?.firstName,
            lastName: this.professor?.lastName,
            password: '',
            changePassword: false,
            newPassword: ''
        });
    }

    onSave(): void {
        if (this.profileForm.invalid) {
            this.notifyService.notify('Por favor completa todos los campos obligatorios', 'error-notify', 'Cerrar');
            return;
        }

        const formValue = this.profileForm.getRawValue();
        const professor = this.tokenService.getUserFromToken();

        if (!professor?.id) {
            this.notifyService.notify('Error: no se pudo identificar al profesor', 'error-notify', 'Cerrar');
            return;
        }

        const updateParams: any = {
            professorId: professor.id,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            password: formValue.password
        };

        if (formValue.changePassword && formValue.newPassword) {
            updateParams.resetPassword = formValue.newPassword;
        }

        this.isSaving = true;
        this.profileViewModel.updateProfessor(updateParams).subscribe({
            next: (response) => {
                this.notifyService.notify(response.message || 'Profesor actualizado correctamente', 'success-notify');
                this.isEditing = false;
                this.showNewPassword = false;
                this.profileForm.get('firstName')?.disable();
                this.profileForm.get('lastName')?.disable();
                this.profileForm.patchValue({
                    password: '',
                    changePassword: false,
                    newPassword: ''
                });
                this.loadProfessorData();
                this.isSaving = false;
            },
            error: (error) => {
                const errorMessage = error.error?.message || 'Error al actualizar el profesor';
                this.notifyService.notify(errorMessage, 'error-notify', 'Cerrar');
                this.isSaving = false;
            }
        });
    }
}
