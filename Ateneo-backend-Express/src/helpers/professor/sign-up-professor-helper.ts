import { PrismaClient, Professor } from '@prisma/client';
import { generateId } from '../../utils/generate-id';
import { ConflictError } from '../../utils/custom-errors';

const prisma = new PrismaClient();

export const SignUpProfessorHelper = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
    try {
        const existingProfessor = await prisma.professor.findUnique({
            where: { email: email }
        });
        if (existingProfessor) {
            throw new ConflictError('El email ya está registrado');
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
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
