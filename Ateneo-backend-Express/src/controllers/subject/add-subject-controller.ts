import { Subject } from '@prisma/client';
import { addSubjectHelper } from '../../helpers/subject/add-subject-helper';

export const AddSubjectController = async (
    idProfessor: string,
    academicYear: number,
    name: string,
    institution: string,
    degree: string
): Promise<string> => {
    try {
        return await addSubjectHelper(idProfessor, academicYear, name, institution, degree);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
