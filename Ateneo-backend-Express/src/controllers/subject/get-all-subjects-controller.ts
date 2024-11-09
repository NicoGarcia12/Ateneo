import { Subject } from '@prisma/client';
import { GetAllSubjectsByIdProfessorHelper } from '../../helpers/subject/get-all-subjects-helper';

export const GetAllSubjectsByIdProfessorController = async (idProfessor: string): Promise<Array<Subject>> => {
    try {
        return await GetAllSubjectsByIdProfessorHelper(idProfessor);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};
