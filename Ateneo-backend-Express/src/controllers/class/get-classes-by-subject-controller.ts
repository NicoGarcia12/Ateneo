import { GetClassesBySubjectHelper } from 'helpers/class/get-classes-by-subject-helper';
import { GetSubjectController } from 'controllers/subject/get-subject-controller';

export const GetClassesBySubjectController = async (subjectId: string) => {
    await GetSubjectController(subjectId);

    return await GetClassesBySubjectHelper(subjectId);
};
