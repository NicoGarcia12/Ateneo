import { Injectable, TemplateRef } from '@angular/core';
import { OpenDialogService } from 'src/app/ui/shared/services/open-dialog.service';
import { NotifyService } from 'src/app/ui/shared/services/notify.service';
import { GetSubjectUseCase } from 'src/app/domain/use-cases/subject/get-subject-use-case';
import { UpdateSubjectUseCase } from 'src/app/domain/use-cases/subject/update-subject-use-case';
import { DeleteSubjectUseCase } from 'src/app/domain/use-cases/subject/delete-subject-use-case';

export interface SubjectFormData {
    name: string;
    academicYear: number;
    institution: string;
    degree: string;
}

@Injectable({
    providedIn: 'root'
})
export class SubjectDataModalViewModelService {
    private dialogRef: any = null;
    private deleteDialogRef: any = null;

    constructor(
        private openDialogService: OpenDialogService,
        private notifyService: NotifyService,
        private getSubjectUseCase: GetSubjectUseCase,
        private updateSubjectUseCase: UpdateSubjectUseCase,
        private deleteSubjectUseCase: DeleteSubjectUseCase
    ) {}

    public loadSubjectData(subjectId: string, onSuccess: (data: SubjectFormData) => void): void {
        this.getSubjectUseCase.execute({ subjectId }).subscribe({
            next: (response) => {
                const data: SubjectFormData = {
                    name: response.name,
                    academicYear: response.academicYear,
                    institution: response.institution,
                    degree: response.degree
                };
                onSuccess(data);
            },
            error: (error) => {
                this.notifyService.notify(
                    error?.error?.message || 'Error al cargar los datos de la materia',
                    'error-notify'
                );
            }
        });
    }

    public openSubjectDataModal(
        template: TemplateRef<any>,
        primaryButtonText: string,
        secondaryButtonText: string,
        onClosed: (result: string | undefined) => void
    ): void {
        this.dialogRef = this.openDialogService.openDialog({
            title: 'Datos de la materia',
            contentTemplate: template,
            primaryButton: {
                show: true,
                text: primaryButtonText,
                disabled: false,
                loading: false
            },
            secondaryButtonText: secondaryButtonText
        });

        this.dialogRef.afterClosed().subscribe((result: string | undefined) => {
            onClosed(result);
        });
    }

    public closeModal(): void {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    public updateSubject(subjectId: string, data: SubjectFormData, onSuccess: () => void): void {
        if (this.dialogRef?.componentInstance?.data?.primaryButton) {
            this.dialogRef.componentInstance.data.primaryButton.loading = true;
            this.dialogRef.componentInstance.data.primaryButton.disabled = true;
        }

        this.updateSubjectUseCase.execute({ subjectId, ...data }).subscribe({
            next: (response) => {
                this.notifyService.notify(
                    response.message || 'Materia actualizada correctamente',
                    'success-notify'
                );
                if (this.dialogRef) {
                    this.dialogRef.close();
                }
                onSuccess();
            },
            error: (error) => {
                this.notifyService.notify(
                    error?.error?.message || 'Error al actualizar la materia',
                    'error-notify'
                );
                if (this.dialogRef?.componentInstance?.data?.primaryButton) {
                    this.dialogRef.componentInstance.data.primaryButton.loading = false;
                    this.dialogRef.componentInstance.data.primaryButton.disabled = false;
                }
            }
        });
    }

    public openDeleteSubjectModal(template: TemplateRef<any>, onConfirm: () => void): void {
        this.deleteDialogRef = this.openDialogService.openDialog({
            title: 'Confirmar eliminación',
            contentTemplate: template,
            primaryButton: {
                show: true,
                text: 'Eliminar',
                disabled: false,
                loading: false
            },
            secondaryButtonText: 'Cancelar'
        });

        this.deleteDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                onConfirm();
            }
        });
    }

    public deleteSubject(subjectId: string, onSuccess: () => void): void {
        if (this.deleteDialogRef?.componentInstance?.data?.primaryButton) {
            this.deleteDialogRef.componentInstance.data.primaryButton.loading = true;
            this.deleteDialogRef.componentInstance.data.primaryButton.disabled = true;
        }

        this.deleteSubjectUseCase.execute({ subjectId }).subscribe({
            next: (response) => {
                this.notifyService.notify(
                    response.message || 'Materia eliminada correctamente',
                    'success-notify'
                );
                if (this.deleteDialogRef) {
                    this.deleteDialogRef.close();
                }
                if (this.dialogRef) {
                    this.dialogRef.close();
                }
                onSuccess();
            },
            error: (error) => {
                this.notifyService.notify(
                    error?.error?.message || 'Error al eliminar la materia',
                    'error-notify'
                );
                if (this.deleteDialogRef?.componentInstance?.data?.primaryButton) {
                    this.deleteDialogRef.componentInstance.data.primaryButton.loading = false;
                    this.deleteDialogRef.componentInstance.data.primaryButton.disabled = false;
                }
            }
        });
    }
}
