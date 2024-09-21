import { Class } from './class';
import { Grade } from './grade';
import { Professor } from './professor';

export interface Subject {
    id: string;
    name: string;
    academicYear: number;
    institution: string;
    degree: string;
    professor: Professor;
    classes: Class[];
    grades: Grade[];
}
