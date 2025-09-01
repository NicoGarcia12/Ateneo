import { Subject } from '@prisma/client';
import { GetSubjectHelper } from '../../helpers/subject/get-subject-helper';
import { NotFoundError, InternalError } from '../../utils/custom-errors';

export const GetSubjectController = async (idSubject: string): Promise<Subject | null> => {
    try {
        const subject = await GetSubjectHelper(idSubject);

        if (!subject) {
            throw new NotFoundError('No existe una materia con ese id');
        }

        return subject;
    } catch (error: any) {
        throw error;
    }
};
