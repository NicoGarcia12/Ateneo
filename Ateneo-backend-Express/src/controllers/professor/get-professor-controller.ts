import { GetProfessorHelper } from 'src/helpers/professor/get-professor-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export interface GetProfessorControllerParams {
    professorId: string;
}

export const GetProfessorController = async (params: GetProfessorControllerParams) => {
    const { professorId } = params;
    const professor = await GetProfessorHelper(professorId);
    if (!professor) {
        throw new NotFoundError('No existe un profesor con ese id');
    }
    return professor;
};
