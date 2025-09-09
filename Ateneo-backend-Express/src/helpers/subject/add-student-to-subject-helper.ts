// Archivo movido desde helpers/student a helpers/subject

import { PrismaClient } from '@prisma/client';
import { NotFoundError, ConflictError, InternalError } from 'src/utils/custom-errors';

const prisma = new PrismaClient();

export const AddStudentToSubjectHelper = async (idStudent: string, idSubject: string): Promise<string> => {
    try {
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
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
