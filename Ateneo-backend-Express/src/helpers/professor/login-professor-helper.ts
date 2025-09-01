import { PrismaClient } from '@prisma/client';
import { InternalError } from '../../utils/custom-errors';

const prisma = new PrismaClient();

export type PartialProfessor = {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    emailActivated: boolean;
} | null;

export const LoginProfessorHelper = async (email: string): Promise<PartialProfessor> => {
    try {
        const professor = await prisma.professor.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                emailActivated: true
            }
        });
        return professor;
    } catch (error: any) {
        throw new InternalError(error.message || 'Error al buscar al profesor');
    } finally {
        await prisma.$disconnect();
    }
};
