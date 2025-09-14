import { GetClassesBySubjectHelper } from 'src/helpers/class/get-classes-by-subject-helper';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';

export interface GetClassesBySubjectControllerParams {
    subjectId: string;
}

export const GetClassesBySubjectController = async (params: GetClassesBySubjectControllerParams) => {
    const { subjectId } = params;

    await GetSubjectController({ subjectId });

    return await GetClassesBySubjectHelper(subjectId);
};
