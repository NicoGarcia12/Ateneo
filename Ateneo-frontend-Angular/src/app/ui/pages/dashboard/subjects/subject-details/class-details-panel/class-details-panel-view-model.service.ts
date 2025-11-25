import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class as ClassEntity } from '../../../../../../domain/entities/class';
import { Student } from '../../../../../../domain/entities/student';
import { IResponse } from '../../../../../../domain/use-cases/use-case.interface';
import { SubjectDetailsViewModelService } from '../subject-details-view-model.service';

interface StudentAttendance {
    student: Student;
    isPresent: boolean;
    isJustifiedAbsence: boolean;
}

@Injectable()
export class ClassDetailsPanelViewModelService {
    constructor(private subjectDetailsViewModel: SubjectDetailsViewModelService) {}

    // Lógica de negocio para preparar los datos de asistencia
    public prepareAbsencesData(studentAttendance: StudentAttendance[]): Array<{ id: string; justificado: boolean }> {
        return studentAttendance
            .filter(a => !a.isPresent)
            .map(a => ({
                id: a.student.id,
                justificado: a.isJustifiedAbsence
            }));
    }

    // Inicializar asistencia para clase existente
    public initializeExistingClassAttendance(
        classData: ClassEntity, 
        students: Student[]
    ): StudentAttendance[] {
        return students.map(student => {
            const absence = classData.absences?.find(a => a.student?.id === student.id);
            return {
                student,
                isPresent: !absence,
                isJustifiedAbsence: absence?.justified || false
            };
        });
    }

    // Inicializar asistencia para clase nueva (todos ausentes por defecto)
    public initializeNewClassAttendance(students: Student[]): StudentAttendance[] {
        return students.map(student => ({
            student,
            isPresent: false,
            isJustifiedAbsence: false
        }));
    }

    // Crear una nueva clase
    public createClass(
        selectedDate: Date,
        description: string,
        studentAttendance: StudentAttendance[],
        subjectId: string
    ): Observable<IResponse> {
        const absences = this.prepareAbsencesData(studentAttendance);
        
        const createPayload = {
            date: selectedDate.toISOString(),
            description: description,
            absentStudents: absences,
            subjectId: subjectId
        };

        return this.subjectDetailsViewModel.createClass(createPayload, subjectId);
    }

    // Actualizar una clase existente
    public updateClass(
        classId: string,
        description: string,
        studentAttendance: StudentAttendance[]
    ): Observable<IResponse> {
        const absences = this.prepareAbsencesData(studentAttendance);
        
        const updatePayload = {
            classId: classId,
            description: description,
            absentStudents: absences
        };

        return this.subjectDetailsViewModel.updateClass(updatePayload);
    }

    // Recargar clases después de crear/actualizar
    public reloadClasses(subjectId: string): void {
        this.subjectDetailsViewModel.loadClasses(subjectId);
    }
}
