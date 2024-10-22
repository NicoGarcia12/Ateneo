import { PrismaClient, Professor } from '@prisma/client';

const prisma = new PrismaClient();

export const SignUpHelper = async (professor: Omit<Professor, 'id' | 'emailActivated'>): Promise<string> => {
    try {
        const existingProfessor = await prisma.professor.findUnique({
            where: { email: professor.email }
        });

        if (existingProfessor) {
            throw new Error();
        }

        await prisma.professor.create({
            data: {
                email: professor.email,
                firstName: professor.firstName,
                lastName: professor.lastName,
                password: professor.password,
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
