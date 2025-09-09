import { GetProfessorHelper } from 'helpers/professor/get-professor-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export const GetProfessorController = async (idProfessor: string) => {
    const professor = await GetProfessorHelper(idProfessor);
    if (!professor) {
        throw new NotFoundError('No existe un profesor con ese id');
    }
    return professor;
};
