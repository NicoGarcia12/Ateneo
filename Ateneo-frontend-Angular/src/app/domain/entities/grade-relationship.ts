import { Grade } from './grade';

export interface GradeRelationship {
    id: string;
    weight: number;
    derivedGradeId: string;
    derivedGrade?: Grade;
    baseGradeId: string;
    baseGrade?: Grade;
}
