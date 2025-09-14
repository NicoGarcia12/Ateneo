import { Subject } from '@prisma/client';
import { GetAllSubjectsByIdProfessorHelper } from 'src/helpers/subject/get-all-subjects-helper';
import { GetProfessorController } from 'src/controllers/professor/get-professor-controller';

export interface GetAllSubjectsByIdProfessorControllerParams {
    professorId: string;
}

export const GetAllSubjectsByIdProfessorController = async (
    params: GetAllSubjectsByIdProfessorControllerParams
): Promise<Array<Subject>> => {
    const { professorId } = params;
    await GetProfessorController({ professorId });

    return await GetAllSubjectsByIdProfessorHelper(professorId);
};
