import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetSubjectHelper = async (idSubject: string) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: idSubject },
            select: {
                id: true,
                name: true,
                academicYear: true,
                institution: true,
                degree: true,
                professorId: true,
                students: {
                    select: {
                        id: true
                    }
                },
                classes: {
                    select: {
                        id: true
                    }
                },
                grades: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return subject;
    } catch (error: unknown) {
        throw new Error('Error al buscar la materia');
    } finally {
        await prisma.$disconnect();
    }
};
