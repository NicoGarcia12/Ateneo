// Archivo movido desde helpers/student a helpers/subject

import { PrismaClient } from '@prisma/client';
import { NotFoundError, ConflictError, InternalError } from '../../utils/custom-errors';

const prisma = new PrismaClient();

export const AddStudentToSubjectHelper = async (idStudent: string, idSubject: string): Promise<string> => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: idSubject }
        });

        if (!subject) {
            throw new NotFoundError('No existe una materia con ese id');
        }

        const student = await prisma.student.findUnique({
            where: { id: idStudent }
        });

        if (!student) {
            throw new NotFoundError('No existe un estudiante con ese id');
        }

        const existingRelation = await prisma.subject.findFirst({
            where: {
                id: idSubject,
                students: {
                    some: { id: idStudent }
                }
            }
        });
        if (existingRelation) {
            throw new ConflictError('El estudiante ya está en esta materia');
        }

        await prisma.subject.update({
            where: { id: idSubject },
            data: {
                students: {
                    connect: { id: idStudent }
                }
            }
        });

        return 'Estudiante agregado a la materia exitosamente';
    } catch (error: any) {
        if (error instanceof NotFoundError || error instanceof ConflictError) {
            throw error;
        }
        throw new InternalError(error.message || 'Error interno al agregar estudiante');
    } finally {
        await prisma.$disconnect();
    }
};
