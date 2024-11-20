import { Subject } from '@prisma/client';
import { AddSubjectHelper } from '../../helpers/subject/add-subject-helper';

export const AddSubjectController = async (
    idProfessor: string,
    academicYear: number,
    name: string,
    institution: string,
    degree: string
): Promise<string> => {
    try {
        return await AddSubjectHelper(idProfessor, academicYear, name, institution, degree);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
