import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetStudentsBySubjectUseCase } from '../../../../../domain/use-cases/student/get-students-by-subject-use-case';
import { GetClassesBySubjectUseCase } from '../../../../../domain/use-cases/class/get-classes-by-subject-use-case';
import { Class as ClassEntity } from '../../../../../domain/entities/class';
import { Student } from '../../../../../domain/entities/student';
import { AddStudentUseCase, IAddStudentParams } from '../../../../../domain/use-cases/student/add-student-use-case';
import { AddClassUseCase, IAddClassParams } from '../../../../../domain/use-cases/class/add-class-use-case';
import { DeleteClassUseCase } from '../../../../../domain/use-cases/class/delete-class-use-case';
import { UpdateClassUseCase, IUpdateClassParams } from '../../../../../domain/use-cases/class/update-class-use-case';

@Injectable({ providedIn: 'root' })
export class SubjectDetailsViewModelService {
    private studentsSubject = new BehaviorSubject<Student[]>([]);
    public students$: Observable<Student[]> = this.studentsSubject.asObservable();
    private classesSubject = new BehaviorSubject<ClassEntity[]>([]);
    public classes$: Observable<ClassEntity[]> = this.classesSubject.asObservable();

    constructor(
        private getStudentsBySubjectUseCase: GetStudentsBySubjectUseCase,
        private addStudentUseCase: AddStudentUseCase,
        private getClassesBySubjectUseCase: GetClassesBySubjectUseCase,
        private addClassUseCase: AddClassUseCase,
        private deleteClassUseCase: DeleteClassUseCase,
        private updateClassUseCase: UpdateClassUseCase
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

    public addStudent(params: IAddStudentParams): Observable<Student> {
        return this.addStudentUseCase.execute(params);
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

    public updateClass(params: IUpdateClassParams) {
        return this.updateClassUseCase.execute(params);
    }
    public deleteClass(id: string) {
        return this.deleteClassUseCase.execute({ id });
    }
    public createClass(params: IAddClassParams, subjectId?: string) {
        const payload = { ...params, subjectId: subjectId ?? params.subjectId };
        return this.addClassUseCase.execute(payload);
    }
}
