import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetStudentHelper = async (idstudent: string) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: idstudent },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dni: true,
                phone: true
            }
        });

        return student;
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
