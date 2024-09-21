import { GradeRelationship } from './grade-relationship';
import { StudentGrade } from './student-grade';
import { Subject } from './subject';

export interface Grade {
    id: string;
    name: string;
    type: GradeType;
    date: Date;
    description: string;
    subject: Subject;
    studentGrades: StudentGrade[];
    derivedGradeRel: GradeRelationship[];
    baseGradeRel: GradeRelationship[];
}

export enum GradeType {
    Final = 'Final',
    Weighted = 'Weighted',
    Arithmetic = 'Arithmetic'
}
