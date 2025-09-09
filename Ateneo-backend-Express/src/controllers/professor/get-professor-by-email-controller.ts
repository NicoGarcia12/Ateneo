import { GetProfessorByEmailHelper } from 'helpers/professor/get-professor-by-email-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export const GetProfessorByEmailController = async (email: string) => {
    const professor = await GetProfessorByEmailHelper(email);

    if (!professor) {
        throw new NotFoundError('No existe un profesor con ese email');
    }

    return professor;
};
