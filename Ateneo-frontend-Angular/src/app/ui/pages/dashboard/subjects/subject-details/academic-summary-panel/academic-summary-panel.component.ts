import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/domain/entities/student';
import { AcademicSummaryPanelViewModelService } from './academic-summary-panel-view-model.service';

@Component({
    selector: 'app-academic-summary-panel',
    templateUrl: './academic-summary-panel.component.html',
    styleUrls: ['./academic-summary-panel.component.scss']
})
export class AcademicSummaryPanelComponent implements OnInit {
    @Input() students: Student[] = [];
    @Input() subjectId: string = '';
    @Output() onComplete = new EventEmitter<void>();

    public sendToAll: boolean = false;
    public sendToSome: boolean = false;

    public availableStudents: Student[] = [];
    public selectedStudents: Student[] = [];
    public selectedStudentId: string | null = null;
    public isGeneratingPDF: boolean = false;
    public hasGrades: boolean = false;

    constructor(public viewModel: AcademicSummaryPanelViewModelService) {}

    ngOnInit() {
        this.availableStudents = [...this.students];
        this.hasGrades = this.students.some((s) => (Array.isArray((s as any).studentGrades) ? (s as any).studentGrades.length > 0 : false));
        this.viewModel.isGeneratingPDF$.subscribe((isGenerating) => {
            this.isGeneratingPDF = isGenerating;
        });
    }

    public onSendToAllChange(): void {
        if (this.sendToAll) {
            this.sendToSome = false;
            this.selectedStudents = [];
            this.availableStudents = [...this.students];
        }
    }

    public onSendToSomeChange(): void {
        if (this.sendToSome) {
            this.sendToAll = false;
        } else {
            this.selectedStudents = [];
            this.availableStudents = [...this.students];
        }
    }

    public onStudentSelect(): void {
        if (!this.selectedStudentId) return;

        const student = this.availableStudents.find((s) => s.id === this.selectedStudentId);
        if (student) {
            this.selectedStudents.push(student);
            this.availableStudents = this.availableStudents.filter((s) => s.id !== student.id);
            this.selectedStudentId = null;
        }
    }

    public removeStudent(student: Student): void {
        this.selectedStudents = this.selectedStudents.filter((s) => s.id !== student.id);
        this.availableStudents.push(student);
        this.availableStudents.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
    }

    public cancel(): void {
        this.onComplete.emit();
    }

    public generatePDF(): void {
        const studentIds = this.sendToAll ? undefined : this.selectedStudents.map((s) => s.id);
        this.viewModel.generatePDF(this.subjectId, studentIds);
    }

    public sendEmailToMe(): void {
        console.log('Enviar informe a mi correo:', {
            sendToAll: this.sendToAll,
            sendToSome: this.sendToSome,
            selectedStudents: this.selectedStudents,
            subjectId: this.subjectId,
            destino: 'profesor'
        });
    }

    public sendEmailToStudents(): void {
        console.log('Enviar informe a estudiantes:', {
            sendToAll: this.sendToAll,
            sendToSome: this.sendToSome,
            selectedStudents: this.selectedStudents,
            subjectId: this.subjectId,
            destino: 'estudiantes'
        });
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
