import { PrismaClient } from '@prisma/client';
import { NotFoundError } from 'src/utils/custom-errors';

const prisma = new PrismaClient();

export const GetAllSubjectsByIdProfessorHelper = async (idProfessor: string) => {
    try {
        const subjects = await prisma.subject.findMany({
            where: { professorId: idProfessor },
            select: {
                id: true,
                name: true,
                academicYear: true,
                institution: true,
                degree: true,
                professorId: true,
                classes: {
                    select: {
                        id: true
                    }
                },
                grades: {
                    select: {
                        id: true
                    }
                },
                students: {
                    select: {
                        id: true
                    }
                }
            }
        });
        return subjects;
    } catch (error: unknown) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
