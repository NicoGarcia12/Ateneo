export type GradeType = 'Final' | 'Weighted' | 'Average';

export interface Grade {
    id: string;
    name: string;
    type: GradeType;
    date: string;
    description?: string;
    subjectId: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}
