import { Subject } from '@prisma/client';
import { getAllSubjectsByIdProffessorHelper } from '../../helpers/subject/get-all-helper';

export const getAllSubjectsByIdProffessorController = async (idProffessor: string): Promise<Array<Subject>> => {
    try {
        return await getAllSubjectsByIdProffessorHelper(idProffessor);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};
