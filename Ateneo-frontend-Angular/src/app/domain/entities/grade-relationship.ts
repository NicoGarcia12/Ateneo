import { Grade } from './grade';

export interface GradeRelationship {
    id: string;
    weight: number;
    derivedGrade: Grade;
    baseGrade: Grade;
}
