import { Component, OnInit } from '@angular/core';
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
    public idSubject: string = '';

    public displayedColumns: string[] = ['identification', 'name', 'grade1', 'grade2', 'gradeN', 'attendance'];

    public dataSource: StudentData[] = [
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

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService
    ) {}

    public ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('idSubject') === null) {
                this.router.navigate(['/dashboard/subjects']);
            }

            this.idSubject = params.get('idSubject') as string;
        });

        // TODO Tengo que cambiar para que muestre la materia que está, eso lo hago porque la pido al principio y cuando tengo los datos muestro el name
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }
}
