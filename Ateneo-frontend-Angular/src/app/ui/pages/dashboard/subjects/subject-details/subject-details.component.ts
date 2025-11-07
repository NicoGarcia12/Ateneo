import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { SubjectDetailsViewModelService } from './subject-details-view-model.service';
import { Student } from '../../../../../domain/entities/student';
import { OpenDialogService } from '../../../../shared/services/open-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardTitleService } from '../../dashboard-title.service';
import { Subscription, forkJoin } from 'rxjs';
import { NotifyService } from '../../../../shared/services/notify.service';
import { MatCalendar } from '@angular/material/datepicker';
import { Class } from 'src/app/domain/entities/class';
import { Absence } from '../../../../../domain/entities/absence';
import { isValidEmail } from '../../../../../utils/validators/email.validator';
import { Grade } from 'src/app/domain/entities/grade';
import { UpdateGradeUseCase } from 'src/app/domain/use-cases/grade/update-grade-use-case';
import { AddStudentGradeUseCase } from 'src/app/domain/use-cases/grade/add-student-grade-use-case';
import { IResponse } from 'src/app/domain/use-cases/use-case.interface';

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
    trackByGradeId(_index: number, grade: { id: string }) {
        return grade.id;
    }

    public getStudentGradeValue(student: Student, gradeId: string): string | number {
        const grade = this.grades.find((g) => g.id === gradeId);
        if (!grade) return '-';
        const studentsGrades = grade.studentsGrades || [];
        const studentGrade = studentsGrades.find((sg: any) => String(sg.student.id) === String(student.id));
        if (!studentGrade || studentGrade.value === null || studentGrade.value === undefined) return '-';
        return studentGrade.value;
    }
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
    private addStudentDialogRef: any = null;
    public dniInput: string = '';
    public isSearchingStudent: boolean = false;
    public searchedDni: string = '';
    public foundStudent: Student | null = null;
    private refreshInterval: any = null;
    private readonly REFRESH_INTERVAL_MS = 60000;
    public specialDates: Date[] = [];
    public displayedColumns: string[] = ['identification', 'name', 'attendance'];
    public grades: Array<Grade> = [];
    public gradesList: Array<{ id: string; name: string }> = [];
    public gradeColumns: Array<string> = [];

    public editGradeData: {
        id: string;
        name: string;
        description: string;
        type: string;
        date: Date | null;
    } = {
        id: '',
        name: '',
        description: '',
        type: '',
        date: null
    };
    public editBaseGrades: Array<{ gradeId: string; weight: number; gradeName: string }> = [];
    public selectedEditBaseGradeId: string | null = null;
    private editGradeDialogRef: any = null;

    public loadStudentGradesData: Array<{ studentId: string; studentName: string; value: number | null }> = [];
    private loadStudentGradesDialogRef: any = null;
    private currentGradeIdForStudentGrades: string = '';

    @ViewChild('modalOcupada') modalOcupadaTemplate!: TemplateRef<any>;
    @ViewChild('modalLibre') modalLibreTemplate!: TemplateRef<any>;
    @ViewChild('addStudentModal') dniModalTemplate!: TemplateRef<any>;
    @ViewChild('editGradeModal') editGradeModalTemplate!: TemplateRef<any>;
    @ViewChild('loadStudentGradesModal') loadStudentGradesModalTemplate!: TemplateRef<any>;
    @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

    public constructor(
        public viewModel: SubjectDetailsViewModelService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService,
        private openDialogService: OpenDialogService,
        private notifyService: NotifyService,
        private updateGradeUseCase: UpdateGradeUseCase,
        private addStudentGradeUseCase: AddStudentGradeUseCase
    ) {}

    public ngOnInit(): void {
        this.resetModalState();
        this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('idSubject') === null) {
                this.router.navigate(['/dashboard/subjects']);
                return;
            }
            this.idSubject = params.get('idSubject') as string;

            this.loadAllData();
            this.startAutoRefresh();

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
            this.gradesSubscription = this.viewModel.grades$.subscribe((grades: Grade[]) => {
                const sortedGrades = [...grades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                this.grades = sortedGrades;
                this.gradesList = sortedGrades.map((g) => ({ id: g.id, name: g.name }));
                this.gradeColumns = sortedGrades.map((g) => g.id);
                this.displayedColumns = ['identification', 'name', ...this.gradeColumns, 'attendance'];
            });
        });
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }

    private loadAllData(): void {
        this.viewModel.loadStudents(this.idSubject);
        this.viewModel.loadClasses(this.idSubject);
        this.viewModel.loadGrades(this.idSubject);
    }

    private startAutoRefresh(): void {
        this.stopAutoRefresh();
        this.refreshInterval = setInterval(() => {
            this.loadAllData();
        }, this.REFRESH_INTERVAL_MS);
    }

    private stopAutoRefresh(): void {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    public onDataChanged(): void {
        this.loadAllData();
        this.startAutoRefresh();
    }
    public isStudentInSubject(student: Student): boolean {
        return this.studentsList.some((s) => s.dni === student.dni);
    }

    public openAddStudentModal(): void {
        this.resetAddStudentModalState();
        this.addStudentDialogRef = this.openDialogService.openDialog({
            title: 'Agregar alumno',
            contentTemplate: this.dniModalTemplate,
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: false,
                text: 'Agregar alumno',
                disabled: true,
                loading: false
            }
        });
        if (this.addStudentDialogRef && this.addStudentDialogRef.afterClosed) {
            this.addStudentDialogRef.afterClosed().subscribe((result: string | undefined) => {
                if (result === 'PRIMARY') {
                    this.addStudent();
                }
                this.resetAddStudentModalState();
            });
        }
    }

    private resetAddStudentModalState(): void {
        this.dniInput = '';
        this.searchedDni = '';
        this.foundStudent = null;
        this.newStudent = { firstName: '', lastName: '', email: '', phone: '' };
        this.isSearchingStudent = false;
    }

    private studentsSubscription?: Subscription;
    private classesSubscription?: Subscription;
    private gradesSubscription?: Subscription;

    public ngOnDestroy(): void {
        this.studentsSubscription?.unsubscribe();
        this.classesSubscription?.unsubscribe();
        this.gradesSubscription?.unsubscribe();
        this.stopAutoRefresh();
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
                            next: (response) => {
                                this.notifyService.notify(response?.message || 'Clase creada correctamente', 'success-notify');
                                if (this.idSubject) {
                                    this.viewModel.loadClasses(this.idSubject);
                                }
                                this.resetModalState();
                                this.selectedDate = null;
                                if (this.calendar) {
                                    try {
                                        (this.calendar as any).selected = null;
                                        this.calendar.updateTodaysDate();
                                    } catch (e) {}
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

    public addStudent(): void {
        if (!this.idSubject) {
            return;
        }

        if (this.foundStudent && this.isStudentInSubject(this.foundStudent)) {
            return;
        }

        if (!this.foundStudent && !this.isNewStudentFormValid) {
            return;
        }

        const addStudentObservable = this.foundStudent
            ? this.viewModel.addStudentToSubject({
                  studentId: this.foundStudent.id,
                  subjectId: this.idSubject
              })
            : this.viewModel.addStudent({
                  firstName: this.newStudent.firstName,
                  lastName: this.newStudent.lastName,
                  dni: this.searchedDni,
                  email: this.newStudent.email || '',
                  phone: this.newStudent.phone || '',
                  subjectId: this.idSubject
              });

        addStudentObservable.subscribe({
            next: (response: IResponse) => {
                this.viewModel.loadStudents(this.idSubject);
                this.notifyService.notify(response?.message || 'Alumno agregado correctamente', 'success-notify');
                this.resetAddStudentModalState();
                if (this.addStudentDialogRef) {
                    this.addStudentDialogRef.close();
                }
            },
            error: (err) => {
                const message = err?.error?.message || 'Error al agregar el alumno';
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
            next: (res: IResponse) => {
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

    public newStudent = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };

    public get isFirstNameInvalid(): boolean {
        return Boolean(this.searchedDni && !this.foundStudent && this.newStudent.firstName.length === 0);
    }

    public get isLastNameInvalid(): boolean {
        return Boolean(this.searchedDni && !this.foundStudent && this.newStudent.lastName.length === 0);
    }

    public get isEmailInvalid(): boolean {
        // Muestra error si hay texto Y es inválido
        return this.newStudent.email.length > 0 && !isValidEmail(this.newStudent.email);
    }

    public get isNewStudentFormValid(): boolean {
        const hasRequiredFields = Boolean(this.newStudent && this.newStudent.firstName && this.newStudent.lastName && this.searchedDni);
        const hasValidEmail = isValidEmail(this.newStudent.email);
        return hasRequiredFields && hasValidEmail;
    }

    public searchStudentByDni(): void {
        // Prevenir ejecución si el botón está deshabilitado
        if (this.isSearchingStudent || !this.dniInput) {
            return;
        }

        const dni = this.dniInput.trim();

        // Validar que sea numérico
        if (!dni || !/^\d+$/.test(dni)) {
            this.notifyService.notify('Por favor, ingresa un DNI válido (solo números)', 'error-notify');

            return;
        }

        this.isSearchingStudent = true;
        this.searchedDni = dni;

        this.viewModel.getStudentByDni(dni).subscribe({
            next: (student) => {
                this.isSearchingStudent = false;
                this.foundStudent = student;
                if (this.addStudentDialogRef && this.addStudentDialogRef.componentInstance) {
                    this.addStudentDialogRef.componentInstance.data.primaryButton.show = true;
                    this.addStudentDialogRef.componentInstance.data.primaryButton.disabled = this.isStudentInSubject(student);
                }
            },
            error: () => {
                this.isSearchingStudent = false;
                this.foundStudent = null;
                // Si el modal está abierto y no se encontró el alumno, mostrar el formulario y controlar el botón por validez
                if (this.addStudentDialogRef && this.addStudentDialogRef.componentInstance) {
                    this.addStudentDialogRef.componentInstance.data.primaryButton.show = true;
                    this.addStudentDialogRef.componentInstance.data.primaryButton.disabled = !this.isNewStudentFormValid;
                }
            }
        });
    }

    // Llamar este método en cada cambio de input del formulario de nuevo estudiante
    public onNewStudentFormChange(): void {
        if (this.addStudentDialogRef && this.addStudentDialogRef.componentInstance && !this.foundStudent) {
            this.addStudentDialogRef.componentInstance.data.primaryButton.disabled = !this.isNewStudentFormValid;
        }
    }

    public isGradeFinal(gradeId: string): boolean {
        const grade = this.grades.find((g) => g.id === gradeId);
        return grade?.type === 'Final';
    }

    public openEditGradeModal(gradeId: string): void {
        const grade = this.grades.find((g) => g.id === gradeId);
        if (!grade) {
            this.notifyService.notify('No se pudo encontrar la nota', 'error-notify');
            return;
        }

        let dateObj: Date | null = null;
        if (grade.date) {
            try {
                dateObj = new Date(grade.date);
                if (isNaN(dateObj.getTime())) {
                    dateObj = null;
                }
            } catch (error) {
                dateObj = null;
            }
        }
        this.editGradeData = {
            id: grade.id,
            name: grade.name,
            description: grade.description || '',
            type: grade.type,
            date: dateObj
        };

        // Cargar notas base si existen (ahora viene en baseGrades del backend)
        const baseGrades = grade.baseGrades || [];
        this.editBaseGrades = baseGrades.map((bg: any) => ({
            gradeId: bg.id,
            weight: bg.weight || 0,
            gradeName: bg.name
        }));
        
        // Resetear el select
        this.selectedEditBaseGradeId = null;

        this.editGradeDialogRef = this.openDialogService.openDialog({
            title: 'Editar nota',
            contentTemplate: this.editGradeModalTemplate,
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: true,
                text: 'Guardar cambios',
                disabled: !this.validateEditGradeForm(),
                loading: false
            }
        });

        this.editGradeDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                this.saveEditGrade();
            }
        });
    }

    public onEditGradeFormChange(): void {
        if (this.editGradeDialogRef?.componentInstance?.data?.primaryButton) {
            this.editGradeDialogRef.componentInstance.data.primaryButton.disabled = !this.validateEditGradeForm();
        }
    }

    public onEditGradeTypeChange(): void {
        this.editBaseGrades = [];
        this.onEditGradeFormChange();
    }

    public onEditBaseGradeSelect(gradeId: string): void {
        if (!gradeId) return;

        const grade = this.grades.find((g) => g.id === gradeId);
        if (!grade) return;

        if (this.editBaseGrades.some((bg) => bg.gradeId === grade.id)) {
            return;
        }

        this.editBaseGrades.push({
            gradeId: grade.id,
            weight: 0,
            gradeName: grade.name
        });
        
        // Resetear el select
        this.selectedEditBaseGradeId = null;
        this.onEditGradeFormChange();
    }

    public removeEditBaseGrade(index: number): void {
        this.editBaseGrades.splice(index, 1);
        // Resetear el select para que pueda volver a seleccionar la nota eliminada
        this.selectedEditBaseGradeId = null;
        this.onEditGradeFormChange();
    }

    public onEditWeightChange(): void {
        this.onEditGradeFormChange();
    }

    public getEditTotalWeight(): number {
        return this.editBaseGrades.reduce((sum, bg) => sum + (bg.weight || 0), 0);
    }

    public get availableGradesForEdit(): Grade[] {
        return this.grades.filter((g) => g.id !== this.editGradeData.id && !this.editBaseGrades.some((bg) => bg.gradeId === g.id));
    }

    private validateEditGradeForm(): boolean {
        const basicFieldsValid = !!(this.editGradeData.name && this.editGradeData.type && this.editGradeData.date);

        let isValid = basicFieldsValid;

        if (this.editGradeData.type === 'Weighted' || this.editGradeData.type === 'Average') {
            const hasEnoughBaseGrades = this.editBaseGrades.length >= 2;
            isValid = isValid && hasEnoughBaseGrades;

            if (this.editGradeData.type === 'Weighted') {
                const totalWeight = this.getEditTotalWeight();
                isValid = isValid && totalWeight === 100;
            }
        }

        return isValid;
    }

    private saveEditGrade(): void {
        if (this.editGradeDialogRef?.componentInstance?.data?.primaryButton) {
            this.editGradeDialogRef.componentInstance.data.primaryButton.loading = true;
            this.editGradeDialogRef.componentInstance.data.primaryButton.disabled = true;
        }

        const updateParams = {
            gradeId: this.editGradeData.id,
            name: this.editGradeData.name,
            date: this.editGradeData.date ? this.editGradeData.date.toISOString() : '',
            description: this.editGradeData.description || undefined,
            baseGrades:
                this.editBaseGrades.length > 0 ? this.editBaseGrades.map((bg) => ({ gradeId: bg.gradeId, weight: bg.weight })) : undefined
        };

        this.updateGradeUseCase.execute(updateParams).subscribe({
            next: (res: IResponse) => {
                this.notifyService.notify(res?.message || 'Nota actualizada correctamente', 'success-notify');
                if (this.editGradeDialogRef) {
                    this.editGradeDialogRef.close();
                }
                this.onDataChanged();
            },
            error: (error) => {
                this.notifyService.notify(error?.error?.message || 'Error al actualizar la nota', 'error-notify');
                if (this.editGradeDialogRef?.componentInstance?.data?.primaryButton) {
                    this.editGradeDialogRef.componentInstance.data.primaryButton.loading = false;
                    this.editGradeDialogRef.componentInstance.data.primaryButton.disabled = false;
                }
            }
        });
    }

    /**
     * Abre el modal para cargar notas de alumnos para una nota Final
     */
    public openLoadStudentGradesModal(gradeId: string): void {
        const grade = this.grades.find((g) => g.id === gradeId);
        if (!grade) {
            this.notifyService.notify('No se pudo encontrar la nota', 'error-notify');
            return;
        }
        if (grade.type !== 'Final') {
            this.notifyService.notify('Solo se pueden cargar notas para notas de tipo Final', 'error-notify');
            return;
        }

        this.currentGradeIdForStudentGrades = gradeId;

        // Inicializar datos de estudiantes con sus notas actuales
        const studentsGrades = grade.studentsGrades || [];
        this.loadStudentGradesData = this.studentsList.map((student) => {
            const studentGrade = studentsGrades.find((sg: any) => String(sg.student.id) === String(student.id));
            return {
                studentId: student.id,
                studentName: `${student.firstName} ${student.lastName}`,
                value: studentGrade ? studentGrade.value : null
            };
        });

        this.loadStudentGradesDialogRef = this.openDialogService.openDialog({
            title: grade.name,
            contentTemplate: this.loadStudentGradesModalTemplate,
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: true,
                text: 'Guardar notas',
                disabled: false,
                loading: false
            }
        });

        this.loadStudentGradesDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                this.saveLoadStudentGrades();
            }
        });
    }

    public onLoadStudentGradeChange(): void {
        if (this.loadStudentGradesDialogRef?.componentInstance?.data?.primaryButton) {
            this.loadStudentGradesDialogRef.componentInstance.data.primaryButton.disabled = false;
        }
    }

    private validateLoadStudentGrades(): boolean {
        // Permitir guardar si al menos un alumno tiene nota válida
        return this.loadStudentGradesData.some((sg) => sg.value !== null && sg.value >= 1 && sg.value <= 10);
    }

    private saveLoadStudentGrades(): void {
        if (this.loadStudentGradesDialogRef?.componentInstance?.data?.primaryButton) {
            this.loadStudentGradesDialogRef.componentInstance.data.primaryButton.loading = true;
            this.loadStudentGradesDialogRef.componentInstance.data.primaryButton.disabled = true;
        }

        // Enviar todos los alumnos, si value es null, se debe actualizar/quitar la nota
        const saveRequests = this.loadStudentGradesData.map((sg) =>
            this.addStudentGradeUseCase.execute({
                gradeId: this.currentGradeIdForStudentGrades,
                studentId: sg.studentId,
                value: sg.value === null ? null : sg.value
            })
        );

        // Ejecutar todas las peticiones en paralelo (aunque sean null)
        forkJoin(saveRequests).subscribe({
            next: () => {
                this.notifyService.notify('Notas de alumnos actualizadas correctamente', 'success-notify');
                if (this.loadStudentGradesDialogRef) {
                    this.loadStudentGradesDialogRef.close();
                }
                this.onDataChanged();
            },
            error: (error) => {
                this.notifyService.notify(error?.error?.message || 'Error al actualizar las notas de los alumnos', 'error-notify');
                if (this.loadStudentGradesDialogRef?.componentInstance?.data?.primaryButton) {
                    this.loadStudentGradesDialogRef.componentInstance.data.primaryButton.loading = false;
                    this.loadStudentGradesDialogRef.componentInstance.data.primaryButton.disabled = false;
                }
            }
        });
    }
}
