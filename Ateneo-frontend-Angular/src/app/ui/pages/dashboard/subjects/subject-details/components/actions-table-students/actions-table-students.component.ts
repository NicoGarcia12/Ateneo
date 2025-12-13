import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from '../../../../../../../domain/entities/student';
import { OpenDialogService } from '../../../../../../shared/services/open-dialog.service';
import { NotifyService } from '../../../../../../shared/services/notify.service';
import { SubjectDetailsViewModelService } from '../../subject-details-view-model.service';
import { IResponse } from 'src/app/domain/use-cases/use-case.interface';

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

    @ViewChild('deleteStudentModal', { static: false }) deleteStudentModalTemplate!: TemplateRef<any>;

    constructor(
        private viewModel: SubjectDetailsViewModelService,
        private openDialogService: OpenDialogService,
        private notifyService: NotifyService
    ) {}

    ngAfterViewInit(): void {}

    public editStudent(student: Student): void {
        console.log('Editar', student.firstName, student.lastName);
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
