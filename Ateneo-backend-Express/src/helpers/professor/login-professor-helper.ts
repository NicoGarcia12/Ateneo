import { PrismaClient } from '@prisma/client';

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
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error al buscar al profesor: ' + error.message);
        } else {
            throw new Error('Se produjo un error desconocido');
        }
    } finally {
        await prisma.$disconnect();
    }
};
