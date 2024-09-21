import { Professor } from '@prisma/client';
import { getProfessorByEmailPasswordHelper } from '../../helpers/professor/get-professor-email-password-helper';

export const getProfessorByEmailPasswordController = async (email: string, password: string): Promise<Professor> => {
    try {
        const professor: Professor | null = await getProfessorByEmailPasswordHelper(email);

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
