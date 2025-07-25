import { Class } from './class';
import { Grade } from './grade';
import { Professor } from './professor';

import { Student } from './student';
export interface Subject {
    id: string;
    name: string;
    academicYear: number;
    institution: string;
    degree: string;
    professorId: string;
    professor?: Professor;
    classes: Class[];
    grades: Grade[];
    students: Student[];
}
