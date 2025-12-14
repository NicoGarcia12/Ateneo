import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SubjectDataModalViewModelService } from './subject-data-modal-view-model.service';

@Component({
    selector: 'app-subject-data-button',
    templateUrl: './subject-data-modal.component.html',
    styleUrls: ['./subject-data-modal.component.scss']
})
export class SubjectDataButtonComponent {
    @ViewChild('subjectDataModal') subjectDataModalTemplate!: TemplateRef<any>;
    @ViewChild('deleteSubjectModal') deleteSubjectModalTemplate!: TemplateRef<any>;
    @Input() subjectId!: string;
    @Output() subjectUpdated = new EventEmitter<void>();
    @Output() subjectDeleted = new EventEmitter<void>();


    public subjectForm!: FormGroup;
    public isEditMode = false;
    private originalData = { name: '', academicYear: 0, institution: '', degree: '' };

    constructor(
        public viewModel: SubjectDataModalViewModelService,
        private fb: FormBuilder
    ) {}

    public openModal(): void {
        this.isEditMode = false;
        this.viewModel.loadSubjectData(this.subjectId, (data) => {
            this.originalData = { ...data };
            this.subjectForm = this.fb.group({
                name: [{ value: data.name, disabled: true }, Validators.required],
                academicYear: [{ value: data.academicYear, disabled: true }, [Validators.required, this.academicYearValidator]],
                institution: [{ value: data.institution, disabled: true }, Validators.required],
                degree: [{ value: data.degree, disabled: true }, Validators.required]
            });
            this.showModal();
        });
    }

    private showModal(): void {
        this.viewModel.openSubjectDataModal(
            this.subjectDataModalTemplate,
            this.isEditMode ? 'Guardar cambios' : 'Editar',
            this.isEditMode ? 'Cancelar' : 'Cerrar',
            (result) => this.handleModalResult(result)
        );
    }

    private handleModalResult(result: string | undefined): void {
        if (result === 'PRIMARY') {
            if (this.isEditMode) {
                if (this.subjectForm.invalid) {
                    this.subjectForm.markAllAsTouched();
                    setTimeout(() => this.showModal(), 0);
                    return;
                }
                const formValue = this.subjectForm.getRawValue();
                this.viewModel.updateSubject(this.subjectId, formValue, () => {
                    this.subjectUpdated.emit();
                });
            } else {
                this.isEditMode = true;
                Object.keys(this.subjectForm.controls).forEach(key => {
                    this.subjectForm.get(key)?.enable();
                });
                setTimeout(() => this.showModal(), 0);
            }
        } else if (result === 'SECONDARY') {
            if (this.isEditMode) {
                this.isEditMode = false;
                this.subjectForm.setValue({ ...this.originalData });
                Object.keys(this.subjectForm.controls).forEach(key => {
                    this.subjectForm.get(key)?.disable();
                });
                setTimeout(() => this.showModal(), 0);
            }
        }
    }

    public hasError(field: string, errorType: string): boolean | undefined {
        const control = this.subjectForm.get(field);
        return control?.hasError(errorType) && control?.touched;
    }

    public academicYearValidator(control: AbstractControl): ValidationErrors | null {
        const year = control.value;
        if (!year) {
            return null;
        }
        if (year < 1970) {
            return { invalidYear: true };
        }
        return null;
    }

    public openDeleteModal(): void {
        this.viewModel.openDeleteSubjectModal(
            this.deleteSubjectModalTemplate,
            () => this.confirmDelete()
        );
    }

    private confirmDelete(): void {
        this.viewModel.deleteSubject(this.subjectId, () => {
            this.subjectDeleted.emit();
        });
    }

    public getPrimaryButtonText(): string {
        return this.isEditMode ? 'Guardar cambios' : 'Editar';
    }
}
