import { Professor } from '@prisma/client';
import { loginHelper } from '../../helpers/professor/loginHelper';

export const loginController = async (email: string, password: string): Promise<Professor> => {
    try {
        const professor: Professor | null = await loginHelper(email);

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
