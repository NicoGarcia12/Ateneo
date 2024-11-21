import { Subject } from '@prisma/client';
import { GetSubjectHelper } from '../../helpers/subject/get-subject-helper';

export const GetSubjectController = async (idSubject: string): Promise<Subject | null> => {
    try {
        const subject = await GetSubjectHelper(idSubject);

        if (!subject) {
            throw new Error('No existe una materia con ese id');
        }

        return subject;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
