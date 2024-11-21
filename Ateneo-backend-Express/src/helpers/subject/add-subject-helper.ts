import { PrismaClient } from '@prisma/client';
import { generateId } from '../../utils/generate-id';

const prisma = new PrismaClient();

export const AddSubjectToProfessorHelper = async (idProfessor: string, academicYear: number, name: string, institution: string, degree: string) => {
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
    } catch (error: unknown) {
        throw new Error('Error al crear la materia');
    } finally {
        await prisma.$disconnect();
    }
};
