import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const LoginHelper = async (email: string) => {
    try {
        const professor = await prisma.professor.findUnique({
            where: { email }
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
