import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { SubjectDetailsViewModelService } from './subject-details-view-model.service';
import { Student } from '../../../../../domain/entities/student';
import { OpenDialogService } from '../../../../shared/services/open-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardTitleService } from '../../dashboard-title.service';
import { Subscription } from 'rxjs';
import { NotifyService } from '../../../../shared/services/notify.service';
import { MatCalendar } from '@angular/material/datepicker';
import { Class } from 'src/app/domain/entities/class';
import { Absence } from '../../../../../domain/entities/absence';

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
    public selectedClassId: string | null = null;
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
                this.studentsList = students;
                this.filterStudents();
            });
            this.classesSubscription = this.viewModel.classes$.subscribe((classes) => {
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

    private formatDateToDDMMYYYY(date: Date): string {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    }

    public onDateSelected(date: Date | null): void {
        if (!date) return;
        const fecha = date.toISOString();
        const fechaFormateada = this.formatDateToDDMMYYYY(date);
        const ocupada = this.specialDates.some((s) => s.toISOString() === fecha);
        if (ocupada) {
            let classes: Array<Class> = [];
            this.viewModel.classes$.subscribe((val) => (classes = val)).unsubscribe();
            const clase = classes.find((c) => c.date && c.date === fecha);
            this.selectedClassId = clase?.id || null;
            this.loadedClass.description = clase?.description || '';
            this.loadedClass.absentStudents = (clase?.absences || []).map((abs: Absence) => {
                const student = abs.student;
                return {
                    id: student?.id || abs.studentId,
                    firstName: student?.firstName || '',
                    lastName: student?.lastName || '',
                    dni: student?.dni || '',
                    absences: student?.absences || [],
                    studentGrades: student?.studentGrades || [],
                    subjects: student?.subjects || [],
                    justificado: abs.justified
                };
            });
        }
        this.currentDialogRef = this.openDialogService.openDialog({
            title: ocupada ? 'Clase del día ' + fechaFormateada : 'Puedes cargar la clase y las inasistencias de ella:',
            contentTemplate: ocupada ? this.modalOcupadaTemplate : this.modalLibreTemplate,
            secondaryButtonText: 'Cerrar',
            primaryButton: {
                show: true,
                text: ocupada ? (this.isEditingClass ? 'Guardar cambios' : 'Borrar clase') : 'Guardar clase',
                disabled: false,
                loading: false
            }
        });
        if (this.currentDialogRef && this.currentDialogRef.afterClosed) {
            this.currentDialogRef.afterClosed().subscribe((result: string | undefined) => {
                if (result === 'PRIMARY') {
                    if (ocupada) {
                        if (this.isEditingClass) {
                            this.saveClassChanges();
                        } else {
                            this.confirmDeleteClass();
                        }
                    } else {
                        const payload = {
                            date: fecha,
                            description: this.classDescription,
                            absentStudents: this.selectedStudents.map((s) => ({
                                id: s.id,
                                justificado: s.justificado
                            })),
                            subjectId: this.idSubject
                        };
                        this.viewModel.createClass(payload, this.idSubject).subscribe({
                            next: (res) => {
                                this.notifyService.notify(res?.message || 'Clase creada correctamente', 'success-notify');
                                if (this.idSubject) {
                                    this.viewModel.loadClasses(this.idSubject);
                                }
                                this.resetModalState();
                                this.selectedDate = null;
                                if (this.calendar) {
                                    try {
                                        (this.calendar as any).selected = null;
                                        this.calendar.updateTodaysDate();
                                    } catch (e) {
                                        console.warn('No se pudo actualizar la fecha del calendario:', e);
                                    }
                                }
                            },
                            error: (err) => {
                                const message = err?.error?.message || 'Error al crear la clase';
                                this.notifyService.notify(message, 'error-notify');
                            }
                        });
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
        const nombres = ['Nico', 'Juan', 'Lucía', 'María', 'Pedro'];
        const apellidos = ['García', 'Pérez', 'López', 'Martínez', 'Rodríguez'];
        const randomNombre = nombres[Math.floor(Math.random() * nombres.length)];
        const randomApellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const randomDni = (Math.floor(Math.random() * 1000) + 1).toString();
        this.viewModel
            .addStudent({
                firstName: randomNombre,
                lastName: randomApellido,
                dni: randomDni,
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
        if (!this.selectedClassId) {
            this.notifyService.notify('No hay clase seleccionada para editar', 'error-notify');
            return;
        }
        const payload = {
            classId: this.selectedClassId,
            description: this.loadedClass.description,
            absentStudents: this.loadedClass.absentStudents.map((s) => ({
                id: s.id,
                justificado: s.justificado
            }))
        };
        this.viewModel.updateClass(payload).subscribe({
            next: (res) => {
                this.notifyService.notify(res?.message || 'Clase actualizada correctamente', 'success-notify');
                if (this.idSubject) {
                    this.viewModel.loadClasses(this.idSubject);
                }
                this.isEditingClass = false;
                if (this.currentDialogRef) {
                    this.currentDialogRef.close();
                }
            },
            error: (err) => {
                const message = err?.error?.message || 'Error al actualizar la clase';
                this.notifyService.notify(message, 'error-notify');
            }
        });
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
        if (!this.selectedClassId) {
            this.notifyService.notify('No se encontró la clase a borrar', 'error-notify');
            return;
        }
        this.viewModel.deleteClass(this.selectedClassId).subscribe({
            next: () => {
                this.notifyService.notify('Clase eliminada correctamente', 'success-notify');
                if (this.idSubject) {
                    this.viewModel.loadClasses(this.idSubject);
                }
                this.selectedClassId = null;
                if (this.currentDialogRef) {
                    this.currentDialogRef.close();
                }
            },
            error: (err) => {
                const message = err?.error?.message || 'Error al borrar la clase';
                this.notifyService.notify(message, 'error-notify');
            }
        });
    }
}
