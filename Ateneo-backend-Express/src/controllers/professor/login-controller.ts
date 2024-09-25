import { Professor } from '@prisma/client';
import { LoginHelper } from '../../helpers/professor/login-helper';
import * as bcrypt from 'bcrypt';

export const LoginController = async (email: string, password: string): Promise<Professor> => {
    try {
        const professor: Professor | null = await LoginHelper(email);
        if (!professor || !bcrypt.compare(password, professor.password)) {
            throw new Error('No se pudo iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
        }

        return professor;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Se produjo un error desconocido');
    }
};
