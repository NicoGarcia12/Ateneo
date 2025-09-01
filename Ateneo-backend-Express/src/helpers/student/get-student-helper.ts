import { PrismaClient } from '@prisma/client';
import { InternalError } from '../../utils/custom-errors';

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
        // error.message podría ser: error de conexión, error de sintaxis SQL, error de timeout, etc.
        throw new InternalError(error.message || 'Error al buscar el estudiante');
    } finally {
        await prisma.$disconnect();
    }
};
