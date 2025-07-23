import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OpenDialogService } from '../../../../shared/services/open-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardTitleService } from '../../dashboard-title.service';

interface StudentData {
    identification: string;
    name: string;
    grade1: number | string;
    grade2: number | string;
    gradeN: number | string;
    attendance: string;
}

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrl: './subject-details.component.scss'
})
export class SubjectDetailsComponent implements OnInit {
    public showAltModal = false;
    public toggleModalView(): void {
        this.showAltModal = !this.showAltModal;
    }
    public studentSearch: string = '';
    public filteredStudents: StudentData[] = [];
    public selectedStudent: StudentData | null = null;
    public selectedStudents: Array<StudentData & { justificado: boolean }> = [];
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
        },
        {
            identification: '55667788',
            name: 'Sofía Elena Vargas',
            grade1: 9.3,
            grade2: 9.0,
            gradeN: 8.8,
            attendance: '97%'
        },
        {
            identification: '99887766',
            name: 'Diego Alejandro Cruz',
            grade1: 7.9,
            grade2: 8.4,
            gradeN: 8.2,
            attendance: '90%'
        },
        {
            identification: '33445566',
            name: 'Valentina Isabel Ruiz',
            grade1: 8.2,
            grade2: 7.8,
            gradeN: 8.6,
            attendance: '93%'
        },
        {
            identification: '77889900',
            name: 'Andrés Felipe Herrera',
            grade1: 7.1,
            grade2: 7.7,
            gradeN: 7.5,
            attendance: '87%'
        },
        {
            identification: '22334455',
            name: 'Camila Andrea Sánchez',
            grade1: 8.9,
            grade2: 9.1,
            gradeN: 8.4,
            attendance: '94%'
        },
        {
            identification: '66778899',
            name: 'Sebastián David Torres',
            grade1: 7.6,
            grade2: 8.0,
            gradeN: 7.9,
            attendance: '89%'
        }
    ];

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

    public dataSource: StudentData[] = [...this.studentsList];

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService,
        private openDialogService: OpenDialogService
    ) {}

    public ngOnInit(): void {
        // El select filtra sobre studentsList, excluyendo los que ya están en la tabla
        this.filterStudents();
        this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('idSubject') === null) {
                this.router.navigate(['/dashboard/subjects']);
            }

            this.idSubject = params.get('idSubject') as string;
        });

        // TODO Tengo que cambiar para que muestre la materia que está, eso lo hago porque la pido al principio y cuando tengo los datos muestro el name
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }

    public filterStudents(): void {
        const search = this.studentSearch.trim().toLowerCase();
        this.filteredStudents = this.studentsList
            .filter((student) => !this.dataSource.some((s) => s.identification === student.identification))
            .filter((student) => student.name.toLowerCase().includes(search));
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
        this.selectedStudent = null;
        this.filteredStudents = [...this.dataSource];
        this.showAltModal = false;
    }
    public addSelectedStudent(student: StudentData): void {
        if (!student) return;
        if (!this.selectedStudents.some((s) => s.identification === student.identification)) {
            this.selectedStudents.push({ ...student, justificado: false });
            this.filterStudents();
            this.selectedStudent = null;
        }
    }

    public removeSelectedStudent(student: StudentData & { justificado: boolean }): void {
        this.selectedStudents = this.selectedStudents.filter((s) => s.identification !== student.identification);
        this.filterStudents();
    }
}
