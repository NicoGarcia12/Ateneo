import { GetSubjectHelper } from 'src/helpers/subject/get-subject-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export interface GetSubjectControllerParams {
    subjectId: string;
}

export const GetSubjectController = async (params: GetSubjectControllerParams) => {
    const { subjectId } = params;
    const subject = await GetSubjectHelper(subjectId);

    if (!subject) {
        throw new NotFoundError('No existe una materia con ese id');
    }

    return subject;
};
