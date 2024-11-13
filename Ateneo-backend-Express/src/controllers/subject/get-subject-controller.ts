import { Subject } from '@prisma/client';
import { GetSubjectHelper } from '../../helpers/subject/get-subject-helper';

export const GetSubjectController = async (idSubject: string): Promise<Subject | null> => {
    try {
        return await GetSubjectHelper(idSubject);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
