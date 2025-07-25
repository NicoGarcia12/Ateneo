import { Injectable } from '@angular/core';

export interface StudentData {
    identification: string;
    name: string;
    grade1: number | string;
    grade2: number | string;
    gradeN: number | string;
    attendance: string;
}

@Injectable({ providedIn: 'root' })
export class SubjectDetailsViewModelService {
    public filterStudents(
        studentsList: StudentData[],
        selectedStudents: Array<StudentData & { justificado: boolean }>,
        studentSearch: string
    ): StudentData[] {
        const search = studentSearch.trim().toLowerCase();
        if (!search) {
            return studentsList.filter(
                (student) => !selectedStudents.some((sel) => sel.identification === student.identification)
            );
        } else {
            return studentsList.filter(
                (student) =>
                    !selectedStudents.some((sel) => sel.identification === student.identification) &&
                    student.name.toLowerCase().includes(search)
            );
        }
    }

    public addSelectedStudent(
        selectedStudents: Array<StudentData & { justificado: boolean }>,
        student: StudentData
    ): Array<StudentData & { justificado: boolean }> {
        if (!student) return selectedStudents;
        if (!selectedStudents.some((s) => s.identification === student.identification)) {
            return [...selectedStudents, { ...student, justificado: false }];
        }
        return selectedStudents;
    }

    public removeSelectedStudent(
        selectedStudents: Array<StudentData & { justificado: boolean }>,
        student: StudentData & { justificado: boolean }
    ): Array<StudentData & { justificado: boolean }> {
        return selectedStudents.filter((s) => s.identification !== student.identification);
    }
}
