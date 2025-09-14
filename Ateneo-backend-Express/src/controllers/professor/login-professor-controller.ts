import { Professor } from '@prisma/client';
import { LoginProfessorHelper, PartialProfessor } from 'src/helpers/professor/login-professor-helper';
import bcrypt from 'bcrypt';
import { UnauthorizedError, InternalError } from 'src/utils/custom-errors';

export interface LoginProfessorControllerParams {
    email: string;
    password: string;
}

export const LoginProfessorController = async (params: LoginProfessorControllerParams): Promise<PartialProfessor> => {
    const { email, password } = params;
    const professor: PartialProfessor | null = await LoginProfessorHelper(email);

    const passwordMatch = professor ? await bcrypt.compare(password, professor.password) : false;

    if (!professor || !passwordMatch) {
        throw new UnauthorizedError('No se pudo iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo');
    }

    return professor;
};
