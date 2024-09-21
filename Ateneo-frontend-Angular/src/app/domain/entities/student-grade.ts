import { Grade } from './grade';
import { Student } from './student';

export interface StudentGrade {
    id: string;
    value: number;
    grade: Grade;
    student: Student;
}
