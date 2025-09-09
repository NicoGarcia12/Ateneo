import { Subject } from '@prisma/client';
import { GetAllSubjectsByIdProfessorHelper } from 'helpers/subject/get-all-subjects-helper';
import { GetProfessorController } from 'controllers/professor/get-professor-controller';

export const GetAllSubjectsByIdProfessorController = async (idProfessor: string): Promise<Array<Subject>> => {
    await GetProfessorController(idProfessor);

    return await GetAllSubjectsByIdProfessorHelper(idProfessor);
};
