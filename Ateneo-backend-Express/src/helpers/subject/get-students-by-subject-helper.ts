import { PrismaClient, Student } from '@prisma/client';
import { NotFoundError } from 'src/utils/custom-errors';

const prisma = new PrismaClient();

export const GetStudentsBySubjectHelper = async (idSubject: string): Promise<Student[]> => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: idSubject },
            include: { students: true }
        });

        if (!subject) {
            throw new NotFoundError('No existe una materia con ese id');
        }

        return subject.students;
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
