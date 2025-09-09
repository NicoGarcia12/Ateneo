import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetStudentByDniHelper = async (dni: string | number) => {
    try {
        const dniValue = typeof dni === 'string' ? BigInt(dni) : dni;

        const student = await prisma.student.findUnique({
            where: { dni: dniValue },
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
