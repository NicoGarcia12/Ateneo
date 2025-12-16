import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Student } from 'src/app/domain/entities/student';
import { AcademicSummaryPanelViewModelService } from './academic-summary-panel-view-model.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-academic-summary-panel',
    templateUrl: './academic-summary-panel.component.html',
    styleUrls: ['./academic-summary-panel.component.scss']
})
export class AcademicSummaryPanelComponent implements OnInit, OnDestroy {
    @Input() students: Student[] = [];
    @Input() subjectId: string = '';
    @Output() onComplete = new EventEmitter<void>();

    private destroy$ = new Subject<void>();

    public sendToAll: boolean = false;
    public sendToSome: boolean = false;

    public availableStudents: Student[] = [];
    public selectedStudents: Student[] = [];
    public selectedStudentId: string | null = null;
    public showSelect: boolean = true;
    public isGeneratingPDF: boolean = false;
    public isSendingEmailToMe: boolean = false;
    public isSendingEmailToStudents: boolean = false;
    public hasGrades: boolean = false;
    public studentsWithEmail: Student[] = [];
    public studentsWithoutEmail: Student[] = [];
    public showEmailWarning: boolean = false;
    public canSendEmailToStudents: boolean = false;

    constructor(public viewModel: AcademicSummaryPanelViewModelService) {}

    ngOnInit() {
        this.availableStudents = [...this.students];
        this.hasGrades = this.students.some((s) => (Array.isArray((s as any).studentGrades) ? (s as any).studentGrades.length > 0 : false));
        this.studentsWithEmail = this.students.filter((s) => this.hasEmail(s));
        this.studentsWithoutEmail = this.students.filter((s) => !this.hasEmail(s));

        this.viewModel.isGeneratingPDF$.pipe(takeUntil(this.destroy$)).subscribe((isGenerating) => {
            this.isGeneratingPDF = isGenerating;
        });

        this.viewModel.isSendingEmailToMe$.pipe(takeUntil(this.destroy$)).subscribe((isLoading) => {
            this.isSendingEmailToMe = isLoading;
        });

        this.viewModel.isSendingEmailToStudents$.pipe(takeUntil(this.destroy$)).subscribe((isLoading) => {
            this.isSendingEmailToStudents = isLoading;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onSendToAllChange(): void {
        if (this.sendToAll) {
            this.sendToSome = false;
            this.selectedStudents = [];
            this.availableStudents = [...this.students];
            this.checkEmailWarning();
        }
        this.updateCanSendEmailToStudents();
    }

    public onSendToSomeChange(): void {
        if (this.sendToSome) {
            this.sendToAll = false;
        } else {
            this.selectedStudents = [];
            this.availableStudents = [...this.students];
        }
        this.checkEmailWarning();
        this.updateCanSendEmailToStudents();
    }

    public onStudentSelect(): void {
        if (!this.selectedStudentId) return;

        const student = this.availableStudents.find((s) => s.id === this.selectedStudentId);
        if (student) {
            this.selectedStudents.push(student);
            this.availableStudents = this.availableStudents.filter((s) => s.id !== student.id);
            this.selectedStudentId = null;
            this.checkEmailWarning();
            this.updateCanSendEmailToStudents();
        }
    }

    public removeStudent(student: Student): void {
        this.selectedStudents = this.selectedStudents.filter((s) => s.id !== student.id);

        if (!this.availableStudents.some((s) => s.id === student.id)) {
            this.availableStudents.push(student);
            this.availableStudents.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
        }

        this.showSelect = false;
        this.selectedStudentId = null;
        setTimeout(() => {
            this.showSelect = true;
        }, 0);

        this.checkEmailWarning();
        this.updateCanSendEmailToStudents();
    }

    private checkEmailWarning(): void {
        if (this.sendToAll) {
            this.showEmailWarning = this.studentsWithoutEmail.length > 0;
        } else if (this.sendToSome) {
            const selectedWithoutEmail = this.selectedStudents.filter((s) => !this.hasEmail(s));
            this.showEmailWarning = selectedWithoutEmail.length > 0;
        } else {
            this.showEmailWarning = false;
        }
    }

    private updateCanSendEmailToStudents(): void {
        if (!this.canGenerateOrSend) {
            this.canSendEmailToStudents = false;
            return;
        }

        if (this.sendToAll) {
            this.canSendEmailToStudents = this.studentsWithEmail.length > 0;
        } else if (this.sendToSome) {
            this.canSendEmailToStudents = this.selectedStudents.some((s) => this.hasEmail(s));
        } else {
            this.canSendEmailToStudents = false;
        }
    }

    private getStudentIds(): string[] | undefined {
        return this.sendToAll ? undefined : this.selectedStudents.map((s) => s.id);
    }

    public hasEmail(student: Student): boolean {
        return !!student.email && student.email.trim() !== '';
    }

    public cancel(): void {
        this.onComplete.emit();
    }

    public generatePDF(): void {
        this.viewModel.generatePDF(this.subjectId, this.getStudentIds());
    }

    public sendEmailToMe(): void {
        this.viewModel.sendEmailToMe(this.subjectId, this.getStudentIds());
    }

    public sendEmailToStudents(): void {
        this.viewModel.sendEmailToStudents(this.subjectId, this.getStudentIds());
    }

    public get isAnyActionInProgress(): boolean {
        return this.isGeneratingPDF || this.isSendingEmailToMe || this.isSendingEmailToStudents;
    }

    public get canGeneratePDF(): boolean {
        return this.canGenerateOrSend && !this.isAnyActionInProgress && this.students.length > 0 && this.hasGrades;
    }

    public get canSendToMe(): boolean {
        return this.canGenerateOrSend && !this.isAnyActionInProgress;
    }

    public get canSendToStudentsButton(): boolean {
        return this.canSendEmailToStudents && !this.isAnyActionInProgress;
    }

    public get isSelectDisabled(): boolean {
        return !this.sendToSome || this.availableStudents.length === 0;
    }

    public get canGenerateOrSend(): boolean {
        if (this.sendToAll) return true;
        if (this.sendToSome && this.selectedStudents.length > 0) return true;
        return false;
    }
}
