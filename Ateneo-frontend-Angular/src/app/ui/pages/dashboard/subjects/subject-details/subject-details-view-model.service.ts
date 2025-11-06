import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetStudentsBySubjectUseCase } from '../../../../../domain/use-cases/student/get-students-by-subject-use-case';
import { GetClassesBySubjectUseCase } from '../../../../../domain/use-cases/class/get-classes-by-subject-use-case';
import { Class as ClassEntity } from '../../../../../domain/entities/class';
import { Student } from '../../../../../domain/entities/student';
import { AddStudentUseCase, IAddStudentParams } from '../../../../../domain/use-cases/student/add-student-use-case';
import { AddClassUseCase, IAddClassParams } from '../../../../../domain/use-cases/class/add-class-use-case';
import { IResponse } from '../../../../../domain/use-cases/use-case.interface';
import { DeleteClassUseCase } from '../../../../../domain/use-cases/class/delete-class-use-case';
import { UpdateClassUseCase, IUpdateClassParams } from '../../../../../domain/use-cases/class/update-class-use-case';
import { GetStudentByDniUseCase } from '../../../../../domain/use-cases/student/get-student-by-dni-use-case';
import {
    AddStudentToSubjectUseCase,
    IAddStudentToSubjectParams
} from '../../../../../domain/use-cases/subject/add-student-to-subject-use-case';
import { GetGradesBySubjectUseCase } from '../../../../../domain/use-cases/grade/get-grades-by-subject-use-case';
import { Grade } from '../../../../../domain/entities/grade';

@Injectable({ providedIn: 'root' })
export class SubjectDetailsViewModelService {
    private studentsSubject = new BehaviorSubject<Student[]>([]);
    public students$: Observable<Student[]> = this.studentsSubject.asObservable();
    private classesSubject = new BehaviorSubject<ClassEntity[]>([]);
    public classes$: Observable<ClassEntity[]> = this.classesSubject.asObservable();
    private gradesSubject = new BehaviorSubject<Grade[]>([]);
    public grades$: Observable<Grade[]> = this.gradesSubject.asObservable();

    constructor(
        private getStudentsBySubjectUseCase: GetStudentsBySubjectUseCase,
        private addStudentUseCase: AddStudentUseCase,
        private addStudentToSubjectUseCase: AddStudentToSubjectUseCase,
        private getClassesBySubjectUseCase: GetClassesBySubjectUseCase,
        private addClassUseCase: AddClassUseCase,
        private deleteClassUseCase: DeleteClassUseCase,
        private getStudentByDniUseCase: GetStudentByDniUseCase,
        private updateClassUseCase: UpdateClassUseCase,
        private getGradesBySubjectUseCase: GetGradesBySubjectUseCase
    ) {}

    public loadStudents(subjectId: string): void {
        this.getStudentsBySubjectUseCase.execute({ subjectId }).subscribe({
            next: (students: Student[]) => {
                this.studentsSubject.next(students);
            },
            error: () => {
                this.studentsSubject.next([]);
            }
        });
    }

    public loadClasses(subjectId: string): void {
        this.getClassesBySubjectUseCase.execute({ subjectId }).subscribe({
            next: (classes: ClassEntity[]) => {
                this.classesSubject.next(classes || []);
            },
            error: () => {
                this.classesSubject.next([]);
            }
        });
    }

    public loadGrades(subjectId: string): void {
        this.getGradesBySubjectUseCase.execute({ subjectId }).subscribe({
            next: (grades: Grade[]) => {
                this.gradesSubject.next(grades || []);
            },
            error: () => {
                this.gradesSubject.next([]);
            }
        });
    }

    public addStudent(params: IAddStudentParams): Observable<IResponse> {
        return this.addStudentUseCase.execute(params);
    }

    public addStudentToSubject(params: IAddStudentToSubjectParams): Observable<IResponse> {
        return this.addStudentToSubjectUseCase.execute(params);
    }

    public getStudentByDni(dni: string): Observable<Student> {
        return this.getStudentByDniUseCase.execute({ dni });
    }

    public filterStudents(
        studentsList: Student[],
        selectedStudents: Array<Student & { justificado: boolean }>,
        studentSearch: string
    ): Student[] {
        const search = studentSearch.trim().toLowerCase();
        if (!search) {
            return studentsList.filter((student) => !selectedStudents.some((sel) => sel.id === student.id));
        } else {
            return studentsList.filter(
                (student) =>
                    !selectedStudents.some((sel) => sel.id === student.id) &&
                    `${student.firstName} ${student.lastName}`.toLowerCase().includes(search)
            );
        }
    }

    public addSelectedStudent(
        selectedStudents: Array<Student & { justificado: boolean }>,
        student: Student
    ): Array<Student & { justificado: boolean }> {
        if (!student) return selectedStudents;
        if (!selectedStudents.some((s) => s.id === student.id)) {
            return [...selectedStudents, { ...student, justificado: false }];
        }
        return selectedStudents;
    }

    public removeSelectedStudent(
        selectedStudents: Array<Student & { justificado: boolean }>,
        student: Student & { justificado: boolean }
    ): Array<Student & { justificado: boolean }> {
        return selectedStudents.filter((s) => s.id !== student.id);
    }

    public updateClass(params: IUpdateClassParams): Observable<IResponse> {
        return this.updateClassUseCase.execute(params);
    }
    public deleteClass(id: string) {
        return this.deleteClassUseCase.execute({ id });
    }
    public createClass(params: IAddClassParams, subjectId?: string): Observable<IResponse> {
        const payload = { ...params, subjectId: subjectId ?? params.subjectId };
        return this.addClassUseCase.execute(payload);
    }
}
