import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetAllSubjectsByIdProfessorHelper = async (idProfessor: string) => {
    try {
        const subjects = await prisma.subject.findMany({
            where: { professorId: idProfessor },
            include: {
                classes: false,
                grades: false
            }
        });

        return subjects;
    } catch (error: unknown) {
        throw new Error('Error al buscar las materias del profesor');
    } finally {
        await prisma.$disconnect();
    }
};
