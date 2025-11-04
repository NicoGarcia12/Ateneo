import { GetGradesBySubjectHelper } from 'src/helpers/grade/get-grades-by-subject-helper';

export interface GetGradesBySubjectParams {
    subjectId: string;
}

export const GetGradesBySubjectController = async (params: GetGradesBySubjectParams) => {
    const { subjectId } = params;
    const grades = await GetGradesBySubjectHelper({ subjectId });

    // Para cada grade, devolver solo los estudiantes con nota: { student, value }
    return grades.map((grade: any) => ({
        id: grade.id,
        name: grade.name,
        type: grade.type,
        date: grade.date ? grade.date.toISOString() : null,
        description: grade.description,
        subjectId: grade.subjectId,
        studentsGrades: grade.studentGrades.map((sg: any) => ({
            student: sg.student,
            value: sg.value
        }))
    }));
};
