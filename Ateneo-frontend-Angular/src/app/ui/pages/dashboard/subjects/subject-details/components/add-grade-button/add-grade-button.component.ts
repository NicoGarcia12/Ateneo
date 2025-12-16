import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Grade } from 'src/app/domain/entities/grade';
import { AddGradeButtonViewModelService, StudentGradeData, GradeFormData, BaseGradeData } from './add-grade-button-view-model.service';
import { Student } from 'src/app/domain/entities/student';

@Component({
    selector: 'app-add-grade-button',
    templateUrl: './add-grade-button.component.html',
    styleUrls: ['./add-grade-button.component.scss']
})
export class AddGradeButtonComponent {
    @ViewChild('addGradeModal') addGradeModalTemplate!: TemplateRef<any>;
    @ViewChild('loadGradesModal') loadGradesModalTemplate!: TemplateRef<any>;
    @Input() grades: Grade[] | null = [];
    @Input() subjectId!: string;
    @Input() students: Student[] = [];
    @Output() gradeAdded = new EventEmitter<void>();

    public gradeData: GradeFormData = {
        name: '',
        description: '',
        type: '',
        date: ''
    };

    public selectedBaseGradeId: string | null = null;
    public baseGrades: BaseGradeData[] = [];
    public studentGrades: StudentGradeData[] = [];

    public constructor(private viewModel: AddGradeButtonViewModelService) {}

    public openModal() {
        this.resetForm();

        this.viewModel.openAddGradeModal(
            this.addGradeModalTemplate,
            () => this.handleSaveGrade(),
            () => this.updateButtonState()
        );
    }

    private resetForm(): void {
        this.gradeData = {
            name: '',
            description: '',
            type: '',
            date: ''
        };
        this.baseGrades = [];
        this.selectedBaseGradeId = null;
    }

    private handleSaveGrade(): void {
        this.viewModel.saveGrade(
            this.gradeData,
            this.baseGrades,
            this.subjectId,
            this.students,
            () => this.gradeAdded.emit(),
            () => this.handleShowConfirmLoadGrades()
        );
    }

    private handleShowConfirmLoadGrades(): void {
        this.viewModel.openConfirmLoadGradesDialog(
            () => this.handleOpenLoadGradesModal(),
            () => this.gradeAdded.emit()
        );
    }

    private handleOpenLoadGradesModal(): void {
        this.studentGrades = this.viewModel.openLoadGradesModal(
            this.loadGradesModalTemplate,
            this.students,
            (studentGrades) => this.handleSaveStudentGrades(studentGrades),
            () => this.gradeAdded.emit()
        );
    }

    private handleSaveStudentGrades(studentGrades: StudentGradeData[]): void {
        this.viewModel.saveStudentGrades(studentGrades, () => this.gradeAdded.emit());
    }

    public onFormChange(): void {
        this.updateButtonState();
    }

    public onTypeChange(): void {
        this.baseGrades = [];
        this.selectedBaseGradeId = null;
        this.updateButtonState();
    }

    public onBaseGradeSelect(gradeId: string): void {
        if (!gradeId) return;

        const grade = this.viewModel.findGradeById(this.grades, gradeId);
        if (!grade) return;

        this.baseGrades = this.viewModel.addBaseGrade(this.baseGrades, grade);

        // Usar setTimeout para asegurar que Angular detecte el cambio
        setTimeout(() => {
            this.selectedBaseGradeId = null;
        }, 0);

        this.updateButtonState();
    }

    public removeBaseGrade(index: number): void {
        this.baseGrades = this.viewModel.removeBaseGrade(this.baseGrades, index);
        this.updateButtonState();
    }

    public onWeightChange(): void {
        this.updateButtonState();
    }

    public getTotalWeight(): number {
        return this.viewModel.getTotalWeight(this.baseGrades);
    }

    public get availableGrades(): Grade[] {
        return this.viewModel.getAvailableGrades(this.grades, this.baseGrades);
    }

    private updateButtonState(): void {
        this.viewModel.updateAddGradeButtonState(this.gradeData, this.baseGrades);
    }

    public onStudentGradeChange(): void {
        this.viewModel.updateLoadGradesButtonState(this.studentGrades);
    }
}
