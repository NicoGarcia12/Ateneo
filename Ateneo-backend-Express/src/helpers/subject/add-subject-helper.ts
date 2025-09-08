import { PrismaClient } from '@prisma/client';
import { generateId } from 'src/utils/generate-id';

const prisma = new PrismaClient();

export const AddSubjectToProfessorHelper = async (
    idProfessor: string,
    academicYear: number,
    name: string,
    institution: string,
    degree: string
) => {
    try {
        await prisma.subject.create({
            data: {
                id: generateId(),
                name: name,
                academicYear: academicYear,
                institution: institution,
                degree: degree,
                professor: {
                    connect: { id: idProfessor }
                }
            }
        });

        return 'Materia creada exitosamente';
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
