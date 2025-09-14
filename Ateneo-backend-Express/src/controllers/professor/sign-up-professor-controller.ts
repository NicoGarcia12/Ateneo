import { SignUpProfessorHelper } from 'src/helpers/professor/sign-up-professor-helper';
import bcrypt from 'bcrypt';
import { InternalError, ConflictError } from 'src/utils/custom-errors';
import { GetProfessorByEmailController } from 'src/controllers/professor/get-professor-by-email-controller';

export interface SignUpProfessorControllerParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const SignUpProfessorController = async (params: SignUpProfessorControllerParams): Promise<string> => {
    const { email } = params;
    const password = await bcrypt.hash(params.password, 10);

    try {
        await GetProfessorByEmailController({ email });
        throw new ConflictError('El email ya está registrado');
    } catch (error: any) {
        if (error.name !== 'NotFoundError') {
            throw error;
        }
    }

    return await SignUpProfessorHelper(email, password, params.firstName, params.lastName);
};
