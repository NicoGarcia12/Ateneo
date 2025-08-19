import { Grade } from './grade';
import { Student } from './student';

export interface StudentGrade {
    id: string;
    value: number;
    gradeId: string;
    grade?: Grade;
    studentId: string;
    student?: Student;
}
