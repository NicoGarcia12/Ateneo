import { Professor } from '@prisma/client';
import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

export const SignUpProfessorHelper = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
    try {
        await prisma.professor.create({
            data: {
                id: generateId('professor'),
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                emailActivated: true
            }
        });

        return 'Profesor registrado exitosamente';
    } catch (error: any) {
        throw error;
    }
};
