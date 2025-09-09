import { SignUpProfessorHelper } from 'helpers/professor/sign-up-professor-helper';
import bcrypt from 'bcrypt';
import { InternalError, ConflictError } from 'src/utils/custom-errors';
import { GetProfessorByEmailHelper } from 'src/helpers/professor/get-professor-by-email-helper';

export const SignUpProfessorController = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
    password = await bcrypt.hash(password, 10);

    const existingProfessor = await GetProfessorByEmailHelper(email);

    if (existingProfessor) {
        throw new ConflictError('El email ya está registrado');
    }

    return await SignUpProfessorHelper(email, password, firstName, lastName);
};
