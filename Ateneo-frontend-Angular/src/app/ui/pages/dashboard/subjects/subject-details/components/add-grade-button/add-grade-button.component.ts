import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { OpenDialogService } from 'src/app/ui/shared/services/open-dialog.service';
import { Grade } from 'src/app/domain/entities/grade';
import { AddGradeButtonViewModelService } from './add-grade-button-view-model.service';
import { NotifyService } from 'src/app/ui/shared/services/notify.service';

@Component({
    selector: 'app-add-grade-button',
    templateUrl: './add-grade-button.component.html',
    styleUrls: ['./add-grade-button.component.scss']
})
export class AddGradeButtonComponent {
    @ViewChild('addGradeModal') addGradeModalTemplate!: TemplateRef<any>;
    @Input() grades: Grade[] | null = [];
    @Input() subjectId!: string;
    @Output() gradeAdded = new EventEmitter<void>();

    public gradeData = {
        name: '',
        description: '',
        type: '',
        date: ''
    };

    public selectedBaseGradeId: string = '';
    public baseGrades: Array<{ gradeId: string; weight: number; gradeName: string }> = [];

    private dialogRef: any = null;

    public constructor(
        private openDialogService: OpenDialogService,
        private viewModel: AddGradeButtonViewModelService,
        private notifyService: NotifyService
    ) {}

    public openModal() {
        this.resetForm();
        this.dialogRef = this.openDialogService.openDialog({
            title: 'Agregar nota',
            contentTemplate: this.addGradeModalTemplate,
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: true,
                text: 'Agregar nota',
                disabled: true,
                loading: false
            }
        });

        this.dialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                this.saveGrade();
            }
        });

        this.updateButtonState();
    }

    private resetForm(): void {
        this.gradeData = {
            name: '',
            description: '',
            type: '',
            date: ''
        };
        this.baseGrades = [];
        this.selectedBaseGradeId = '';
    }

    private saveGrade(): void {
        if (!this.dialogRef?.componentInstance?.data?.primaryButton) return;

        this.dialogRef.componentInstance.data.primaryButton.loading = true;
        this.dialogRef.componentInstance.data.primaryButton.disabled = true;

        const params = {
            name: this.gradeData.name,
            type: this.gradeData.type as any,
            date: this.gradeData.date,
            description: this.gradeData.description || undefined,
            subjectId: this.subjectId,
            baseGrades: this.baseGrades.length > 0 ? this.baseGrades.map((bg) => ({ gradeId: bg.gradeId, weight: bg.weight })) : undefined
        };

        this.viewModel.addGrade(params).subscribe({
            next: () => {
                this.notifyService.notify('Nota agregada correctamente', 'success-notify');
                this.dialogRef.close();
                this.gradeAdded.emit();
            },
            error: (error) => {
                this.notifyService.notify(error?.error?.message || 'Error al agregar la nota', 'error-notify');
                this.dialogRef.componentInstance.data.primaryButton.loading = false;
                this.updateButtonState();
            }
        });
    }

    public onFormChange(): void {
        this.updateButtonState();
    }

    public onTypeChange(): void {
        this.baseGrades = [];
        this.selectedBaseGradeId = '';
        this.updateButtonState();
    }

    public onBaseGradeSelect(gradeId: string): void {
        if (!gradeId) return;

        // Acceder correctamente al array de grades
        const gradesArray = (this.grades as any)?.grades || this.grades;

        if (!Array.isArray(gradesArray)) {
            return;
        }

        const grade = gradesArray.find((g: Grade) => g.id === gradeId);
        if (!grade) return;

        if (this.baseGrades.some((bg) => bg.gradeId === gradeId)) {
            return;
        }

        this.baseGrades.push({
            gradeId: grade.id,
            weight: 0,
            gradeName: grade.name
        });

        this.updateButtonState();
    }

    public removeBaseGrade(index: number): void {
        this.baseGrades.splice(index, 1);
        this.updateButtonState();
    }

    public onWeightChange(): void {
        this.updateButtonState();
    }

    public getTotalWeight(): number {
        return this.baseGrades.reduce((sum, bg) => sum + (bg.weight || 0), 0);
    }

    public get availableGrades(): Grade[] {
        const gradesArray = (this.grades as any)?.grades || this.grades;

        if (!gradesArray || !Array.isArray(gradesArray)) {
            return [];
        }

        return gradesArray.filter((g: Grade) => !this.baseGrades.some((bg) => bg.gradeId === g.id));
    }

    private updateButtonState(): void {
        if (this.dialogRef?.componentInstance?.data?.primaryButton) {
            const basicFieldsValid = !!(this.gradeData.name && this.gradeData.type && this.gradeData.date);

            let isValid = basicFieldsValid;

            if (this.gradeData.type === 'Weighted' || this.gradeData.type === 'Average') {
                const hasEnoughBaseGrades = this.baseGrades.length >= 2;
                isValid = isValid && hasEnoughBaseGrades;

                if (this.gradeData.type === 'Weighted') {
                    const totalWeight = this.getTotalWeight();
                    isValid = isValid && totalWeight === 100;
                }
            }

            this.dialogRef.componentInstance.data.primaryButton.disabled = !isValid;
        }
    }
}
