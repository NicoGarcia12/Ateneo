import { Absence } from './absence';
import { StudentGrade } from './student-grade';

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    dni: bigint;
    email: string;
    absences: Array<Absence>;
    studentGrades: Array<StudentGrade>;
}
