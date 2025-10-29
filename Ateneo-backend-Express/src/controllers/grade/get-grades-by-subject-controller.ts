import { GetGradesBySubjectHelper } from 'src/helpers/grade/get-grades-by-subject-helper';

export interface GetGradesBySubjectParams {
    subjectId: string;
}

export const GetGradesBySubjectController = async (params: GetGradesBySubjectParams) => {
    const { subjectId } = params;

    return await GetGradesBySubjectHelper({ subjectId });
};
