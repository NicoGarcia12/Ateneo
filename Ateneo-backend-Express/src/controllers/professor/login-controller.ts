import { Professor } from '@prisma/client';
import { LoginHelper } from '../../helpers/professor/login-helper';

export const LoginController = async (email: string, password: string): Promise<Professor> => {
    try {
        const professor: Professor | null = await LoginHelper(email);

        if (!professor) {
            throw new Error('Professor not found');
        }

        if (professor.password !== password) {
            throw new Error('Incorrect password');
        }

        return professor;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};
