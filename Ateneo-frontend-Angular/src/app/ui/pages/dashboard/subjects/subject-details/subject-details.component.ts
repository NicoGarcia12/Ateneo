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
    public loadedClass: {
        absentStudents: Array<StudentData & { justificado: boolean }>;
        description: string;
    } = {
        absentStudents: [
            {
                identification: '12345678',
                name: 'Ana García Rodríguez',
                grade1: 8.5,
                grade2: 9.2,
                gradeN: 7.8,
                attendance: '95%',
                justificado: false
            },
            {
                identification: '87654321',
                name: 'Carlos López Martínez',
                grade1: 7.3,
                grade2: 8.1,
                gradeN: 8.9,
                attendance: '88%',
                justificado: true
            }
        ],
        description: 'Clase sobre funciones matemáticas. Se repasaron ejercicios y se resolvieron dudas.'
    };
    public classDescription: string = '';
    public showAltModal = false;
    public selectedStudent: StudentData | null = null;
    public idSubject: string = '';
    public selectedDate: Date | null = new Date();
    public isEditingClass = false;
    private currentDialogRef: any = null;

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
    public filteredStudentsForEdit: StudentData[] = [];
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
        new Date('2025-08-10')
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
        // En modo edición de clase cargada, excluir también los estudiantes que ya están en loadedClass.absentStudents
        const allAbsentStudents = this.isEditingClass
            ? [...this.selectedStudents, ...this.loadedClass.absentStudents]
            : this.selectedStudents;
        this.filteredStudents = this.viewModel.filterStudents(this.studentsList, allAbsentStudents, this.studentSearch);
        if (this.filteredStudents.length === 0) {
            this.selectedStudent = null;
        }

        // Filtrar estudiantes para el modo edición (solo excluir los que ya están en la clase)
        this.filteredStudentsForEdit = this.viewModel.filterStudents(
            this.studentsList,
            this.loadedClass.absentStudents,
            this.studentSearch
        );
    }

    public dateClass = (d: Date) => {
        const fecha = d.toISOString().split('T')[0];
        return this.specialDates.some((s) => s.toISOString().split('T')[0] === fecha) ? 'special-date' : '';
    };

    public onDateSelected(date: Date | null): void {
        if (!date) return;
        const fecha = date.toISOString().split('T')[0];
        const ocupada = this.specialDates.some((s) => s.toISOString().split('T')[0] === fecha);
        this.currentDialogRef = this.openDialogService.openDialog({
            title: ocupada ? 'Clase del día ' + fecha : 'Puedes cargar la clase y las inasistencias de ella:',
            contentTemplate: ocupada ? this.modalOcupadaTemplate : this.modalLibreTemplate,
            secondaryButtonText: 'Cerrar',
            primaryButton: {
                show: ocupada ? true : false,
                text: ocupada ? (this.isEditingClass ? 'Guardar cambios' : 'Borrar clase') : '',
                disabled: false,
                loading: false
            }
        });
        if (this.currentDialogRef && this.currentDialogRef.afterClosed) {
            this.currentDialogRef.afterClosed().subscribe((result: string | undefined) => {
                if (result === 'PRIMARY' && ocupada) {
                    if (this.isEditingClass) {
                        this.saveClassChanges();
                    } else {
                        this.confirmDeleteClass();
                    }
                }
                this.resetModalState();
            });
        }
    }

    public resetModalState(): void {
        this.selectedStudents = [];
        this.studentSearch = '';
        this.filteredStudents = [...this.studentsList];
        this.selectedStudent = null;
        this.showAltModal = false;
        this.classDescription = '';
        this.isEditingClass = false;
        this.currentDialogRef = null;
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

    public toggleEditMode(): void {
        this.isEditingClass = !this.isEditingClass;

        // Actualizar el botón primario del diálogo actual
        if (this.currentDialogRef && this.currentDialogRef.componentInstance) {
            this.currentDialogRef.componentInstance.data.primaryButton = {
                show: true,
                text: this.isEditingClass ? 'Guardar cambios' : 'Borrar clase',
                disabled: false,
                loading: false
            };
        }
    }

    public addStudentToLoadedClass(student: StudentData): void {
        if (!student) return;

        // Verificar si el estudiante ya está en la lista
        const exists = this.loadedClass.absentStudents.some((s) => s.identification === student.identification);
        if (!exists) {
            this.loadedClass.absentStudents.push({ ...student, justificado: false });
            // Actualizar ambas listas de estudiantes filtrados
            this.filterStudents();
        }
        // Limpiar la selección
        this.selectedStudent = null;
    }

    public removeStudentFromLoadedClass(student: StudentData & { justificado: boolean }): void {
        this.loadedClass.absentStudents = this.loadedClass.absentStudents.filter((s) => s.identification !== student.identification);
        // Actualizar ambas listas de estudiantes filtrados
        this.filterStudents();
    }

    public saveClassChanges(): void {
        // Aquí iría la lógica para guardar los cambios en el backend
        console.log('Guardando cambios de la clase...', this.loadedClass);
        // Por ejemplo: this.classService.updateClass(this.loadedClass)
    }

    public confirmDeleteClass(): void {
        // Mostrar diálogo de confirmación para borrar la clase
        const confirmDialogRef = this.openDialogService.openDialog({
            title: 'Confirmar eliminación',
            text: '¿Estás seguro de que quieres borrar esta clase? Esta acción no se puede deshacer.',
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: true,
                text: 'Borrar',
                disabled: false,
                loading: false
            }
        });

        confirmDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                this.deleteClass();
            }
        });
    }

    public deleteClass(): void {
        // Aquí iría la lógica para borrar la clase del backend
        console.log('Borrando clase...');
        // Por ejemplo: this.classService.deleteClass(classId)

        // Remover la fecha seleccionada de specialDates para que no aparezca marcada
        if (this.selectedDate) {
            const fechaSeleccionada = this.selectedDate.toISOString().split('T')[0];
            this.specialDates = this.specialDates.filter((date) => date.toISOString().split('T')[0] !== fechaSeleccionada);
        }

        // Cerrar el modal principal después de borrar
        if (this.currentDialogRef) {
            this.currentDialogRef.close();
        }
    }
}
