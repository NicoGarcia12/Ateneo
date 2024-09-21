import { Class } from './class';
import { Student } from './student';

export interface Absence {
    id: string;
    class: Class;
    student: Student;
    justified: boolean;
}
