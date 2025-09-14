import { prisma } from 'src/config/prisma';

export const GetStudentHelper = async (studentId: string) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
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
    }
};
