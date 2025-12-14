import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Student } from '../../../../../../../domain/entities/student';
import { OpenDialogService } from '../../../../../../shared/services/open-dialog.service';
import { NotifyService } from '../../../../../../shared/services/notify.service';
import { IResponse } from 'src/app/domain/use-cases/use-case.interface';
import { ActionsTableStudentsViewModelService } from './actions-table-students-view-model.service';
import { UpdateStudentUseCase } from 'src/app/domain/use-cases/student/update-student-use-case';

@Component({
    selector: 'app-actions-table-students',
    templateUrl: './actions-table-students.component.html',
    styleUrls: ['./actions-table-students.component.scss']
})
export class ActionsTableStudentsComponent implements AfterViewInit {
    @Input() student!: Student;
    @Input() subjectId!: string;
    @Output() studentRemoved = new EventEmitter<void>();

    public studentToDelete: Student | null = null;
    private deleteStudentDialogRef: any = null;
    public isDeleting = false;

    // Modal de edición
    public studentForm!: FormGroup;
    public isEditMode = false;
    private originalData: any = {};
    private editStudentDialogRef: any = null;

    @ViewChild('deleteStudentModal', { static: false }) deleteStudentModalTemplate!: TemplateRef<any>;
    @ViewChild('editStudentModal', { static: false }) editStudentModalTemplate!: TemplateRef<any>;

    constructor(
        private viewModel: ActionsTableStudentsViewModelService,
        private openDialogService: OpenDialogService,
        private notifyService: NotifyService,
        private fb: FormBuilder,
        private updateStudentUseCase: UpdateStudentUseCase
    ) {}

    ngAfterViewInit(): void {}

    public onStudentUpdated(): void {
        this.studentRemoved.emit(); // Reutilizamos el mismo evento para refrescar datos
    }

    public editStudent(student: Student): void {
        this.isEditMode = false;
        this.originalData = {
            firstName: student.firstName,
            lastName: student.lastName,
            dni: student.dni,
            email: student.email || '',
            phone: student.phone || ''
        };

        this.studentForm = this.fb.group({
            firstName: [{ value: student.firstName, disabled: true }, Validators.required],
            lastName: [{ value: student.lastName, disabled: true }, Validators.required],
            dni: [{ value: student.dni, disabled: true }, [Validators.required, Validators.pattern(/^\d+$/)]],
            email: [{ value: student.email || '', disabled: true }, [Validators.email]],
            phone: [{ value: student.phone || '', disabled: true }]
        });

        this.showEditModal();
    }

    private showEditModal(): void {
        this.editStudentDialogRef = this.openDialogService.openDialog({
            title: 'Datos del estudiante',
            contentTemplate: this.editStudentModalTemplate,
            primaryButton: {
                show: true,
                text: this.isEditMode ? 'Guardar cambios' : 'Editar',
                disabled: false,
                loading: false
            },
            secondaryButtonText: this.isEditMode ? 'Cancelar' : 'Cerrar'
        });

        this.editStudentDialogRef.afterClosed().subscribe((result: string | undefined) => {
            this.handleEditModalResult(result);
        });
    }

    private handleEditModalResult(result: string | undefined): void {
        if (result === 'PRIMARY') {
            if (this.isEditMode) {
                // Guardar cambios
                if (this.studentForm.invalid) {
                    this.studentForm.markAllAsTouched();
                    setTimeout(() => this.showEditModal(), 0);
                    return;
                }
                const formValue = this.studentForm.getRawValue();
                this.saveStudentChanges(formValue);
            } else {
                // Cambiar a modo edición
                this.isEditMode = true;
                Object.keys(this.studentForm.controls).forEach((key) => {
                    if (key !== 'dni') {
                        // DNI no se puede editar
                        this.studentForm.get(key)?.enable();
                    }
                });
                setTimeout(() => this.showEditModal(), 0);
            }
        } else if (result === 'SECONDARY') {
            if (this.isEditMode) {
                // Cancelar edición y volver a vista
                this.isEditMode = false;
                this.studentForm.setValue({ ...this.originalData });
                Object.keys(this.studentForm.controls).forEach((key) => {
                    this.studentForm.get(key)?.disable();
                });
                setTimeout(() => this.showEditModal(), 0);
            }
        }
    }

    private saveStudentChanges(formValue: any): void {
        if (this.editStudentDialogRef?.componentInstance?.data?.primaryButton) {
            this.editStudentDialogRef.componentInstance.data.primaryButton.loading = true;
            this.editStudentDialogRef.componentInstance.data.primaryButton.disabled = true;
        }

        this.updateStudentUseCase
            .execute({
                studentId: this.student.id,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                dni: formValue.dni,
                email: formValue.email || undefined,
                phone: formValue.phone || undefined
            })
            .subscribe({
                next: (response: IResponse) => {
                    this.notifyService.notify(response.message || 'Estudiante actualizado correctamente', 'success-notify');
                    if (this.editStudentDialogRef) {
                        this.editStudentDialogRef.close();
                    }
                    this.studentRemoved.emit(); // Refrescar datos
                },
                error: (error) => {
                    this.notifyService.notify(error?.error?.message || 'Error al actualizar el estudiante', 'error-notify');
                    if (this.editStudentDialogRef?.componentInstance?.data?.primaryButton) {
                        this.editStudentDialogRef.componentInstance.data.primaryButton.loading = false;
                        this.editStudentDialogRef.componentInstance.data.primaryButton.disabled = false;
                    }
                }
            });
    }

    public hasError(field: string, errorType: string): boolean | undefined {
        const control = this.studentForm.get(field);
        return control?.hasError(errorType) && control?.touched;
    }

    public openDeleteStudentModal(student: Student): void {
        this.studentToDelete = student;
        this.isDeleting = false;
        setTimeout(() => {
            if (!this.deleteStudentModalTemplate) return;
            this.deleteStudentDialogRef = this.openDialogService.openDialog({
                title: 'Confirmar eliminación',
                contentTemplate: this.deleteStudentModalTemplate,
                secondaryButtonText: 'Cancelar',
                primaryButton: {
                    show: true,
                    text: 'Eliminar',
                    disabled: this.isDeleting,
                    loading: this.isDeleting
                }
            });

            this.deleteStudentDialogRef.afterClosed().subscribe((result: string | undefined) => {
                if (result === 'PRIMARY') {
                    this.confirmDeleteStudent();
                } else {
                    this.studentToDelete = null;
                    this.isDeleting = false;
                }
            });
        });
    }

    private confirmDeleteStudent(): void {
        if (!this.studentToDelete || !this.deleteStudentDialogRef) return;
        this.isDeleting = true;
        if (this.deleteStudentDialogRef.componentInstance?.data?.primaryButton) {
            this.deleteStudentDialogRef.componentInstance.data.primaryButton.loading = true;
            this.deleteStudentDialogRef.componentInstance.data.primaryButton.disabled = true;
        }

        this.viewModel.removeStudentFromSubject(this.subjectId, this.studentToDelete.id).subscribe({
            next: (response: IResponse) => {
                this.notifyService.notify(response.message || 'Alumno eliminado de la materia correctamente', 'success-notify');
                if (this.deleteStudentDialogRef) {
                    this.deleteStudentDialogRef.close();
                }
                this.studentToDelete = null;
                this.studentRemoved.emit();
                this.isDeleting = false;
            },
            error: (error) => {
                this.notifyService.notify(error?.error?.message || 'Error al eliminar el alumno de la materia', 'error-notify');
                this.isDeleting = false;
                if (this.deleteStudentDialogRef?.componentInstance?.data?.primaryButton) {
                    this.deleteStudentDialogRef.componentInstance.data.primaryButton.loading = false;
                    this.deleteStudentDialogRef.componentInstance.data.primaryButton.disabled = false;
                }
                this.isDeleting = false;
            }
        });
    }
}
