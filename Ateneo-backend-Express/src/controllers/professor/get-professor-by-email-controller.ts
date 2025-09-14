import { GetProfessorByEmailHelper } from 'src/helpers/professor/get-professor-by-email-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export interface GetProfessorByEmailControllerParams {
    email: string;
}

export const GetProfessorByEmailController = async (params: GetProfessorByEmailControllerParams) => {
    const { email } = params;
    const professor = await GetProfessorByEmailHelper(email);

    if (!professor) {
        throw new NotFoundError('No existe un profesor con ese email');
    }

    return professor;
};
