import { Student } from './student';

export type GradeType = 'Final' | 'Weighted' | 'Average';

export interface Grade {
    id: string;
    name: string;
    type: GradeType;
    date: string;
    description?: string;
    subjectId: string;
    baseGrades?: Array<{ id: string; name: string; weight: number; type: string }>;
    studentsGrades?: Array<{ student: Student; value: number }>;
}
