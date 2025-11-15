import { GetGradesBySubjectHelper } from 'src/helpers/grade/get-grades-by-subject-helper';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export interface GetGradesBySubjectParams {
    subjectId: string;
}

export const GetGradesBySubjectController = async (params: GetGradesBySubjectParams) => {
    const { subjectId } = params;
    const grades = await GetGradesBySubjectHelper({ subjectId });

    const gradesSanitized = grades.map((grade: any) => {
        let baseGrades = [];
        if (grade.derivedGradeRel && Array.isArray(grade.derivedGradeRel) && grade.derivedGradeRel.length > 0) {
            baseGrades = grade.derivedGradeRel.map((rel: any) => ({
                id: rel.baseGrade.id,
                name: rel.baseGrade.name,
                weight: rel.weight,
                type: rel.baseGrade.type
            }));
        }
        return {
            id: grade.id,
            name: grade.name,
            type: grade.type,
            date: grade.date ? grade.date.toISOString() : null,
            description: grade.description,
            subjectId: grade.subjectId,
            studentsGrades: grade.studentGrades.map((sg: any) => ({
                student: sg.student,
                value: sg.value
            })),
            baseGrades
        };
    });
    return convertBigIntToString(gradesSanitized);
};
