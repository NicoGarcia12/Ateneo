import { Professor } from '@prisma/client';
import { LoginProfessorHelper } from '../../helpers/professor/login-professor-helper';
import * as bcrypt from 'bcrypt';

export const LoginProfessorController = async (email: string, password: string): Promise<Professor> => {
    try {
        const professor: Professor | null = await LoginProfessorHelper(email);
        if (!professor || !bcrypt.compare(password, professor.password)) {
            throw new Error('No se pudo iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
        }

        return professor;
    } catch (error: any) {
        throw new Error(error.message);
    }
};