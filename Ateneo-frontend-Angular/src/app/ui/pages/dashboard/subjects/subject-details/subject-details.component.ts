import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SubjectDetailsViewModelService, StudentData } from './subject-details-view-model.service';
import { OpenDialogService } from '../../../../shared/services/open-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardTitleService } from '../../dashboard-title.service';

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
    public classDescription: string = '';
    public showAltModal = false;
    public selectedStudent: StudentData | null = null;
    public idSubject: string = '';
    public selectedDate: Date | null = new Date();

    public studentsList: StudentData[] = [
        {
            identification: '12345678',
            name: 'Ana García Rodríguez',
            grade1: 8.5,
            grade2: 9.2,
            gradeN: 7.8,
            attendance: '95%'
        },
        {
            identification: '87654321',
            name: 'Carlos López Martínez',
            grade1: 7.3,
            grade2: 8.1,
            gradeN: 8.9,
            attendance: '88%'
        },
        {
            identification: '11223344',
            name: 'María José Fernández',
            grade1: 9.1,
            grade2: 8.7,
            gradeN: 9.5,
            attendance: '92%'
        },
        {
            identification: '44332211',
            name: 'Juan Pablo Morales',
            grade1: 6.8,
            grade2: 7.5,
            gradeN: 7.2,
            attendance: '85%'
        }
    ];

    public filteredStudents: StudentData[] = [...this.studentsList];
    public selectedStudents: Array<StudentData & { justificado: boolean }> = [];
    public studentSearch: string = '';

    @ViewChild('modalOcupada') modalOcupadaTemplate!: TemplateRef<any>;
    @ViewChild('modalLibre') modalLibreTemplate!: TemplateRef<any>;

    public specialDates: Date[] = [
        new Date('2025-07-01'),
        new Date('2025-07-02'),
        new Date('2025-07-03'),
        new Date('2025-07-04'),
        new Date('2025-07-05'),
        new Date('2025-07-06'),
        new Date('2025-07-07'),
        new Date('2025-07-08'),
        new Date('2025-07-09'),
        new Date('2025-07-10')
    ];

    public displayedColumns: string[] = ['identification', 'name', 'grade1', 'grade2', 'gradeN', 'attendance'];

    public constructor(
        public viewModel: SubjectDetailsViewModelService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService,
        private openDialogService: OpenDialogService
    ) {}

    public ngOnInit(): void {
        this.resetModalState();
        this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('idSubject') === null) {
                this.router.navigate(['/dashboard/subjects']);
            }
            this.idSubject = params.get('idSubject') as string;
        });
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }

    public filterStudents(): void {
        this.filteredStudents = this.viewModel.filterStudents(
            this.studentsList,
            this.selectedStudents,
            this.studentSearch
        );
        if (this.filteredStudents.length === 0) {
            this.selectedStudent = null;
        }
    }

    public dateClass = (d: Date) => {
        const fecha = d.toISOString().split('T')[0];
        return this.specialDates.some((s) => s.toISOString().split('T')[0] === fecha) ? 'special-date' : '';
    };

    public onDateSelected(date: Date | null): void {
        if (!date) return;
        const fecha = date.toISOString().split('T')[0];
        const ocupada = this.specialDates.some((s) => s.toISOString().split('T')[0] === fecha);
        const dialogRef = this.openDialogService.openDialog({
            title: ocupada ? 'Fecha ocupada' : 'Puedes cargar la clase y las inasistencias de ella:',
            contentTemplate: ocupada ? this.modalOcupadaTemplate : this.modalLibreTemplate,
            secondaryButtonText: 'Cerrar',
            primaryButton: { text: 'Aceptar', show: true }
        });
        if (dialogRef && dialogRef.afterClosed) {
            dialogRef.afterClosed().subscribe(() => this.resetModalState());
        }
    }

    public resetModalState(): void {
        this.selectedStudents = [];
        this.studentSearch = '';
        this.filteredStudents = [...this.studentsList];
        this.selectedStudent = null;
        this.showAltModal = false;
        this.classDescription = '';
    }

    public addSelectedStudent(student: StudentData): void {
        this.selectedStudents = this.viewModel.addSelectedStudent(this.selectedStudents, student);
        this.filterStudents();
        this.selectedStudent = null;
    }

    public toggleModalView(): void {
        this.showAltModal = !this.showAltModal;
    }

    public removeSelectedStudent(student: StudentData & { justificado: boolean }): void {
        this.selectedStudents = this.viewModel.removeSelectedStudent(this.selectedStudents, student);
        this.filterStudents();
    }
}
