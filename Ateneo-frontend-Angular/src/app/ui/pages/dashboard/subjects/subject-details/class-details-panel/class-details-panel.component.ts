import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Class } from 'src/app/domain/entities/class';
import { Student } from 'src/app/domain/entities/student';
import { NotifyService } from 'src/app/ui/shared/services/notify.service';
import { ClassDetailsPanelViewModelService } from './class-details-panel-view-model.service';

interface StudentAttendance {
    student: Student;
    isPresent: boolean;
    isJustifiedAbsence: boolean;
}

@Component({
    selector: 'app-class-details-panel',
    templateUrl: './class-details-panel.component.html',
    styleUrls: ['./class-details-panel.component.scss'],
    providers: [ClassDetailsPanelViewModelService]
})
export class ClassDetailsPanelComponent implements OnInit, OnChanges {
    @Input() classData: Class | null = null;
    @Input() selectedDate: Date | null = null;
    @Input() students: Student[] = [];
    @Input() subjectId: string = '';
    @Output() onComplete = new EventEmitter<void>();
    @Output() onClassSaved = new EventEmitter<{ date: string }>();

    public studentAttendance: StudentAttendance[] = [];
    public description: string = '';
    public isSaving: boolean = false;
    public isEditMode: boolean = false;

    constructor(
        private viewModel: ClassDetailsPanelViewModelService,
        private notifyService: NotifyService
    ) {}

    ngOnInit() {
        this.initializeAttendance();
        // Si es una clase nueva, activar modo edición
        if (this.isNewClass) {
            this.isEditMode = true;
        }
    }

    ngOnChanges() {
        this.initializeAttendance();
        // Si es una clase nueva, activar modo edición
        if (this.isNewClass) {
            this.isEditMode = true;
        }
    }

    private initializeAttendance() {
        if (this.classData) {
            // Clase existente: delegar al ViewModel
            this.description = this.classData.description || '';
            this.studentAttendance = this.viewModel.initializeExistingClassAttendance(this.classData, this.students);
        } else {
            // Clase nueva: delegar al ViewModel
            this.description = '';
            this.studentAttendance = this.viewModel.initializeNewClassAttendance(this.students);
        }
    }

    public onPresentChange(attendance: StudentAttendance) {
        if (attendance.isPresent) {
            attendance.isJustifiedAbsence = false;
        }
    }

    public createClass() {
        if (!this.selectedDate || this.isSaving) return;

        this.isSaving = true;

        this.viewModel.createClass(
            this.selectedDate,
            this.description,
            this.studentAttendance,
            this.subjectId
        ).subscribe({
            next: (response) => {
                this.notifyService.notify(response?.message || 'Clase creada correctamente', 'success-notify');
                this.viewModel.reloadClasses(this.subjectId);
                this.isSaving = false;
                this.isEditMode = false;
                // Emitir evento con la fecha para que el padre recargue los datos
                this.onClassSaved.emit({ date: this.selectedDate!.toISOString() });
            },
            error: (err) => {
                const message = err?.error?.message || 'Error al crear la clase';
                this.notifyService.notify(message, 'error-notify');
                this.isSaving = false;
            }
        });
    }

    public updateClass() {
        if (!this.selectedDate || this.isSaving || !this.classData) return;

        this.isSaving = true;

        this.viewModel.updateClass(
            this.classData.id,
            this.description,
            this.studentAttendance
        ).subscribe({
            next: (response) => {
                this.notifyService.notify(response?.message || 'Clase actualizada correctamente', 'success-notify');
                this.viewModel.reloadClasses(this.subjectId);
                this.isSaving = false;
                this.isEditMode = false;
                // Emitir evento con la fecha para que el padre recargue los datos
                this.onClassSaved.emit({ date: this.selectedDate!.toISOString() });
            },
            error: (err) => {
                const message = err?.error?.message || 'Error al actualizar la clase';
                this.notifyService.notify(message, 'error-notify');
                this.isSaving = false;
            }
        });
    }

    public saveClass() {
        if (this.isNewClass) {
            this.createClass();
        } else {
            this.updateClass();
        }
    }

    public cancel() {
        if (this.isNewClass) {
            // Si es nueva clase, simplemente cerrar
            this.onComplete.emit();
        } else {
            // Si es clase existente, salir del modo edición y restaurar datos originales
            this.isEditMode = false;
            this.initializeAttendance();
        }
    }

    public goBack() {
        this.onComplete.emit();
    }

    public enableEditMode() {
        this.isEditMode = true;
    }

    public get isNewClass(): boolean {
        return !this.classData;
    }
}
