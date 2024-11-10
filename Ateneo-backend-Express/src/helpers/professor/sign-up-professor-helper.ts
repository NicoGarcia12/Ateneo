import { PrismaClient, Professor } from '@prisma/client';
import { generateId } from '../../utils/generate-id';

const prisma = new PrismaClient();

export const SignUpProfessorHelper = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
    try {
        const existingProfessor = await prisma.professor.findUnique({
            where: { email: email }
        });

        if (existingProfessor) {
            throw new Error();
        }

        await prisma.professor.create({
            data: {
                id: generateId(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                emailActivated: true
            }
        });

        return 'Profesor registrado exitosamente';
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('El email ya está registrado');
        } else {
            throw new Error('Se produjo un error desconocido');
        }
    } finally {
        await prisma.$disconnect();
    }
};
