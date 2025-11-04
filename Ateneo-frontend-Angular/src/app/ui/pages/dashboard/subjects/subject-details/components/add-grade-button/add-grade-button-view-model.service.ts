import { Injectable, TemplateRef } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AddGradeUseCase, IAddGradeParams } from 'src/app/domain/use-cases/grade/add-grade-use-case';
import { Grade } from 'src/app/domain/entities/grade';
import { Student } from 'src/app/domain/entities/student';
import { AddStudentGradeUseCase } from 'src/app/domain/use-cases/grade/add-student-grade-use-case';
import { OpenDialogService } from 'src/app/ui/shared/services/open-dialog.service';
import { NotifyService } from 'src/app/ui/shared/services/notify.service';

export interface StudentGradeData {
    studentId: string;
    studentName: string;
    value: number | null;
}

export interface GradeFormData {
    name: string;
    description: string;
    type: string;
    date: string;
}

export interface BaseGradeData {
    gradeId: string;
    weight: number;
    gradeName: string;
}

@Injectable({
    providedIn: 'root'
})
export class AddGradeButtonViewModelService {
    private createdGradeId: string = '';
    private createdGradeName: string = '';
    private addGradeDialogRef: any = null;
    private confirmDialogRef: any = null;
    private loadGradesDialogRef: any = null;

    constructor(
        private addGradeUseCase: AddGradeUseCase,
        private addStudentGradeUseCase: AddStudentGradeUseCase,
        private openDialogService: OpenDialogService,
        private notifyService: NotifyService
    ) {}

    public addGrade(params: IAddGradeParams): Observable<Grade> {
        return this.addGradeUseCase.execute(params);
    }

    public setCreatedGradeInfo(id: string, name: string): void {
        this.createdGradeId = id;
        this.createdGradeName = name;
    }

    public getCreatedGradeId(): string {
        return this.createdGradeId;
    }

    public getCreatedGradeName(): string {
        return this.createdGradeName;
    }

    public initializeStudentGrades(students: Student[]): StudentGradeData[] {
        return students.map((student) => ({
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            value: null
        }));
    }

    public validateAllGrades(studentGrades: StudentGradeData[]): boolean {
        return studentGrades.every((sg) => {
            return sg.value !== null && sg.value >= 1 && sg.value <= 10;
        });
    }

    public saveAllStudentGrades(studentGrades: StudentGradeData[]): Observable<any[]> {
        const requests = studentGrades.map((sg) =>
            this.addStudentGradeUseCase.execute({
                gradeId: this.createdGradeId,
                studentId: sg.studentId,
                value: sg.value!
            })
        );

        return forkJoin(requests);
    }

    public validateAddGradeForm(gradeData: GradeFormData, baseGrades: BaseGradeData[]): boolean {
        const basicFieldsValid = !!(gradeData.name && gradeData.type && gradeData.date);

        let isValid = basicFieldsValid;

        if (gradeData.type === 'Weighted' || gradeData.type === 'Average') {
            const hasEnoughBaseGrades = baseGrades.length >= 2;
            isValid = isValid && hasEnoughBaseGrades;

            if (gradeData.type === 'Weighted') {
                const totalWeight = this.getTotalWeight(baseGrades);
                isValid = isValid && totalWeight === 100;
            }
        }

        return isValid;
    }

    public getTotalWeight(baseGrades: BaseGradeData[]): number {
        return baseGrades.reduce((sum, bg) => sum + (bg.weight || 0), 0);
    }

    public getAvailableGrades(allGrades: Grade[] | null, baseGrades: BaseGradeData[]): Grade[] {
        const gradesArray = (allGrades as any)?.grades || allGrades;

        if (!gradesArray || !Array.isArray(gradesArray)) {
            return [];
        }

        return gradesArray.filter((g: Grade) => !baseGrades.some((bg) => bg.gradeId === g.id));
    }

    public findGradeById(allGrades: Grade[] | null, gradeId: string): Grade | undefined {
        const gradesArray = (allGrades as any)?.grades || allGrades;

        if (!Array.isArray(gradesArray)) {
            return undefined;
        }

        return gradesArray.find((g: Grade) => g.id === gradeId);
    }

    public addBaseGrade(baseGrades: BaseGradeData[], grade: Grade): BaseGradeData[] {
        if (baseGrades.some((bg) => bg.gradeId === grade.id)) {
            return baseGrades;
        }

        return [
            ...baseGrades,
            {
                gradeId: grade.id,
                weight: 0,
                gradeName: grade.name
            }
        ];
    }

    public removeBaseGrade(baseGrades: BaseGradeData[], index: number): BaseGradeData[] {
        return baseGrades.filter((_, i) => i !== index);
    }

    public buildGradeParams(gradeData: GradeFormData, baseGrades: BaseGradeData[], subjectId: string): IAddGradeParams {
        return {
            name: gradeData.name,
            type: gradeData.type as any,
            date: gradeData.date,
            description: gradeData.description || undefined,
            subjectId: subjectId,
            baseGrades: baseGrades.length > 0 ? baseGrades.map((bg) => ({ gradeId: bg.gradeId, weight: bg.weight })) : undefined
        };
    }

    public shouldShowStudentGradesModal(gradeType: string, hasStudents: boolean): boolean {
        return gradeType === 'Final' && hasStudents;
    }

    public clearCreatedGradeInfo(): void {
        this.createdGradeId = '';
        this.createdGradeName = '';
    }

    public openAddGradeModal(
        template: TemplateRef<any>,
        onSave: (isValid: boolean) => void,
        onUpdateButton: (isValid: boolean) => void
    ): void {
        this.addGradeDialogRef = this.openDialogService.openDialog({
            title: 'Agregar nota',
            contentTemplate: template,
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: true,
                text: 'Agregar nota',
                disabled: true,
                loading: false
            }
        });

        this.addGradeDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                onSave(true);
            }
        });

        // Llamar al callback para actualizar el estado inicial del botón
        onUpdateButton(false);
    }

    public updateAddGradeButtonState(gradeData: GradeFormData, baseGrades: BaseGradeData[]): void {
        if (this.addGradeDialogRef?.componentInstance?.data?.primaryButton) {
            const isValid = this.validateAddGradeForm(gradeData, baseGrades);
            this.addGradeDialogRef.componentInstance.data.primaryButton.disabled = !isValid;
        }
    }

    public setAddGradeLoading(loading: boolean): void {
        if (this.addGradeDialogRef?.componentInstance?.data?.primaryButton) {
            this.addGradeDialogRef.componentInstance.data.primaryButton.loading = loading;
            this.addGradeDialogRef.componentInstance.data.primaryButton.disabled = loading;
        }
    }

    public closeAddGradeModal(): void {
        if (this.addGradeDialogRef) {
            this.addGradeDialogRef.close();
        }
    }

    public saveGrade(
        gradeData: GradeFormData,
        baseGrades: BaseGradeData[],
        subjectId: string,
        students: Student[],
        onSuccess: () => void,
        onShowConfirm: () => void
    ): void {
        this.setAddGradeLoading(true);

        const params = this.buildGradeParams(gradeData, baseGrades, subjectId);

        this.addGradeUseCase.execute(params).subscribe({
            next: (response) => {
                this.notifyService.notify('Nota agregada correctamente', 'success-notify');
                this.closeAddGradeModal();

                // Guardar el ID y nombre de la nota creada
                this.setCreatedGradeInfo(response.id, gradeData.name);

                // Si es una nota Final, preguntar si quiere cargar las notas de los alumnos
                if (this.shouldShowStudentGradesModal(gradeData.type, students.length > 0)) {
                    onShowConfirm();
                } else {
                    this.clearCreatedGradeInfo();
                    onSuccess();
                }
            },
            error: (error) => {
                this.notifyService.notify(error?.error?.message || 'Error al agregar la nota', 'error-notify');
                this.setAddGradeLoading(false);
            }
        });
    }

    public openConfirmLoadGradesDialog(onConfirm: () => void, onCancel: () => void): void {
        this.confirmDialogRef = this.openDialogService.openDialog({
            title: 'Cargar notas de alumnos',
            text: '¿Desea cargar las notas de los alumnos ahora?',
            secondaryButtonText: 'No',
            primaryButton: {
                show: true,
                text: 'Sí',
                disabled: false,
                loading: false
            }
        });

        this.confirmDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                onConfirm();
            } else {
                onCancel();
            }
        });
    }

    public openLoadGradesModal(
        template: TemplateRef<any>,
        students: Student[],
        onSave: (studentGrades: StudentGradeData[]) => void,
        onCancel: () => void
    ): StudentGradeData[] {
        const studentGrades = this.initializeStudentGrades(students);

        this.loadGradesDialogRef = this.openDialogService.openDialog({
            title: this.getCreatedGradeName(),
            contentTemplate: template,
            secondaryButtonText: 'Cancelar',
            primaryButton: {
                show: true,
                text: 'Guardar notas',
                disabled: true,
                loading: false
            }
        });

        this.loadGradesDialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result === 'PRIMARY') {
                onSave(studentGrades);
            } else {
                this.clearCreatedGradeInfo();
                onCancel();
            }
        });

        return studentGrades;
    }

    public updateLoadGradesButtonState(studentGrades: StudentGradeData[]): void {
        if (this.loadGradesDialogRef?.componentInstance?.data?.primaryButton) {
            const atLeastOneValid = studentGrades.some((sg) => sg.value !== null && sg.value >= 1 && sg.value <= 10);
            this.loadGradesDialogRef.componentInstance.data.primaryButton.disabled = !atLeastOneValid;
        }
    }

    public setLoadGradesLoading(loading: boolean): void {
        if (this.loadGradesDialogRef?.componentInstance?.data?.primaryButton) {
            this.loadGradesDialogRef.componentInstance.data.primaryButton.loading = loading;
            this.loadGradesDialogRef.componentInstance.data.primaryButton.disabled = loading;
        }
    }

    public closeLoadGradesModal(): void {
        if (this.loadGradesDialogRef) {
            this.loadGradesDialogRef.close();
        }
    }

    public saveStudentGrades(studentGrades: StudentGradeData[], onSuccess: () => void): void {
        this.setLoadGradesLoading(true);
        // Filtrar solo los alumnos que tienen nota válida
        const gradesToSave = studentGrades.filter((sg) => sg.value !== null && sg.value >= 1 && sg.value <= 10);
        if (gradesToSave.length === 0) {
            this.notifyService.notify('No hay notas válidas para guardar', 'error-notify');
            this.setLoadGradesLoading(false);
            return;
        }
        this.saveAllStudentGrades(gradesToSave).subscribe({
            next: () => {
                this.notifyService.notify('Notas de alumnos cargadas correctamente', 'success-notify');
                this.closeLoadGradesModal();
                this.clearCreatedGradeInfo();
                onSuccess();
            },
            error: (error: any) => {
                this.notifyService.notify(error?.error?.message || 'Error al cargar las notas de los alumnos', 'error-notify');
                this.setLoadGradesLoading(false);
            }
        });
    }
}
