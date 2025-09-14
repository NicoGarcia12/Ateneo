import { Absence } from './absence';
import { StudentGrade } from './student-grade';

import { Subject } from './subject';
export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    email?: string;
    phone?: string;
    absences: Absence[];
    studentGrades: StudentGrade[];
    subjects: Subject[];
}
