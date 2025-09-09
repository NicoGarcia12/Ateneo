import { Professor } from '@prisma/client';
import { LoginProfessorHelper, PartialProfessor } from 'helpers/professor/login-professor-helper';
import bcrypt from 'bcrypt';
import { UnauthorizedError, InternalError } from 'src/utils/custom-errors';

export const LoginProfessorController = async (email: string, password: string): Promise<PartialProfessor> => {
    const professor: PartialProfessor | null = await LoginProfessorHelper(email);

    if (!professor || !bcrypt.compare(password, professor.password)) {
        throw new UnauthorizedError('No se pudo iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo');
    }

    return professor;
};
