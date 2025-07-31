import { GradeRelationship } from './grade-relationship';
import { StudentGrade } from './student-grade';
import { Subject } from './subject';

export interface Grade {
    id: string;
    name: string;
    type: GradeType;
    date: string;
    description: string;
    subjectId: string;
    subject?: Subject;
    studentGrades: StudentGrade[];
    derivedGradeRel: GradeRelationship[];
    baseGradeRel: GradeRelationship[];
}

export type GradeType = 'Final' | 'Weighted' | 'Arithmetic';
