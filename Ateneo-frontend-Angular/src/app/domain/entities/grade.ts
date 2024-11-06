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
    studentGrades: Array<StudentGrade>;
    derivedGradeRel: Array<GradeRelationship>;
    baseGradeRel: Array<GradeRelationship>;
}

export enum GradeType {
    Final = 'Final',
    Weighted = 'Weighted',
    Arithmetic = 'Arithmetic'
}
