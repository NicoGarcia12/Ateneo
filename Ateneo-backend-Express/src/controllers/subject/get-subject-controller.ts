import { GetSubjectHelper } from 'helpers/subject/get-subject-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export const GetSubjectController = async (idSubject: string) => {
    const subject = await GetSubjectHelper(idSubject);

    if (!subject) {
        throw new NotFoundError('No existe una materia con ese id');
    }

    return subject;
};
