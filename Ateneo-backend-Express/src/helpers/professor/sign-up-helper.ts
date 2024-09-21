import { PrismaClient, Professor } from '@prisma/client';

const prisma = new PrismaClient();

export const SignUpHelper = async (professor: Omit<Professor, 'id' | 'emailActivated'>): Promise<string> => {
    try {
        const existingProfessor = await prisma.professor.findUnique({
            where: { email: professor.email }
        });
        console.log(existingProfessor);
        if (existingProfessor) {
            throw new Error('Email already exists');
        } else{
            
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

        return 'Professor registered successfully';
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error registering professor: ' + error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    } finally {
        await prisma.$disconnect();
    }
};
