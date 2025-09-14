import { Class } from './class';
import { Student } from './student';

export interface Absence {
    id: string;
    classId: string;
    class?: Class;
    studentId: string;
    student?: Student;
    justified: boolean;
}
