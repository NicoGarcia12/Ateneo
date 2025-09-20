import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { SubjectDetailsViewModelService } from './subject-details-view-model.service';
import { Student } from '../../../../../domain/entities/student';
import { OpenDialogService } from '../../../../shared/services/open-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardTitleService } from '../../dashboard-title.service';
import { Subscription } from 'rxjs';
import { NotifyService } from '../../../../shared/services/notify.service';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
    public loadedClass: {
        absentStudents: Array<Student & { justificado: boolean }>;
        description: string;
    } = {
        absentStudents: [],
        description: 'Clase sobre funciones matemáticas. Se repasaron ejercicios y se resolvieron dudas.'
    };
    public classDescription: string = '';
    public showAltModal = false;
    public selectedStudent: Student | null = null;
    public idSubject: string = '';
    public selectedDate: Date | null = null;
    public isEditingClass = false;
    private currentDialogRef: any = null;
    public studentsList: Student[] = [];
    public filteredStudents: Student[] = [...this.studentsList];
    public filteredStudentsForEdit: Student[] = [];
    public selectedStudents: Array<Student & { justificado: boolean }> = [];
    public studentSearch: string = '';

    @ViewChild('modalOcupada') modalOcupadaTemplate!: TemplateRef<any>;
    @ViewChild('modalLibre') modalLibreTemplate!: TemplateRef<any>;
    @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

    public specialDates: Date[] = [];

    public displayedColumns: string[] = ['identification', 'name', 'grade1', 'grade2', 'gradeN', 'attendance'];

    public constructor(
        public viewModel: SubjectDetailsViewModelService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService,
        private openDialogService: OpenDialogService,
        private notifyService: NotifyService
    ) {}

    public ngOnInit(): void {
        this.resetModalState();
        this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('idSubject') === null) {
                this.router.navigate(['/dashboard/subjects']);
                return;
            }
            this.idSubject = params.get('idSubject') as string;

            this.viewModel.loadStudents(this.idSubject);
            this.viewModel.loadClasses(this.idSubject);
            this.studentsSubscription = this.viewModel.students$.subscribe((students) => {
                console.log('Loaded students:', students);
                this.studentsList = students;
                this.filterStudents();
            });
            this.classesSubscription = this.viewModel.classes$.subscribe((classes) => {
                console.log('Loaded classes:', classes);
                this.specialDates = classes.map((c) => (c.date ? new Date(c.date) : null)).filter((d): d is Date => d !== null);

                if (this.calendar) {
                    this.calendar.updateTodaysDate();
                }
            });
        });
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }

    private studentsSubscription?: Subscription;
    private classesSubscription?: Subscription;

    public ngOnDestroy(): void {
        this.studentsSubscription?.unsubscribe();
        this.classesSubscription?.unsubscribe();
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
                // Limpiar la selección para permitir re-seleccionar la misma fecha posteriormente
                this.selectedDate = null;
                // Si el calendario existe, limpiar su selección interna y forzar actualización visual
                if (this.calendar) {
                    // limpiar la selección interna del MatCalendar
                    (this.calendar as any).selected = null;
                    try {
                        this.calendar.updateTodaysDate();
                    } catch (e) {
                        // no crítico si updateTodaysDate no está disponible
                    }
                }
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

    public addSelectedStudent(student: Student): void {
        this.selectedStudents = this.viewModel.addSelectedStudent(this.selectedStudents, student);
        this.filterStudents();
        this.selectedStudent = null;
    }

    public toggleModalView(): void {
        this.showAltModal = !this.showAltModal;
    }

    public removeSelectedStudent(student: Student & { justificado: boolean }): void {
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

    public addStudentToLoadedClass(student: Student): void {
        if (!student) return;

        // Verificar si el estudiante ya está en la lista
        const exists = this.loadedClass.absentStudents.some((s) => s.id === student.id);
        if (!exists) {
            this.loadedClass.absentStudents.push({ ...student, justificado: false } as Student & { justificado: boolean });
            // Actualizar ambas listas de estudiantes filtrados
            this.filterStudents();
        }
        // Limpiar la selección
        this.selectedStudent = null;
    }

    public removeStudentFromLoadedClass(student: Student & { justificado: boolean }): void {
        this.loadedClass.absentStudents = this.loadedClass.absentStudents.filter((s) => s.id !== student.id);
        // Actualizar ambas listas de estudiantes filtrados
        this.filterStudents();
    }

    public addNico(): void {
        if (!this.idSubject) {
            console.warn('No subject id available');
            return;
        }
        const random = Math.floor(Math.random() * 1000) + 1; // 1..1000
        const dni = random.toString();
        this.viewModel
            .addStudent({
                firstName: 'Nico',
                lastName: 'Garcia',
                dni: '5',
                subjectId: this.idSubject
            })
            .subscribe({
                next: () => {
                    this.viewModel.loadStudents(this.idSubject);
                    this.notifyService.notify('Alumno creado correctamente', 'success-notify');
                },
                error: (err) => {
                    const message = err?.error?.message || 'Error al crear el alumno';
                    this.notifyService.notify(message, 'error-notify');
                }
            });
    }

    public saveClassChanges(): void {
        console.log('Guardando cambios de la clase...', this.loadedClass);
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
