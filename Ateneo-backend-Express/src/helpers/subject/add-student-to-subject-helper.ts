// Archivo movido desde helpers/student a helpers/subject

import { prisma } from 'src/config/prisma';

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
    }
};
