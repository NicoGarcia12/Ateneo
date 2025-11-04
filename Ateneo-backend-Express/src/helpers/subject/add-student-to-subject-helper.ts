// Archivo movido desde helpers/student a helpers/subject

import { prisma } from 'src/config/prisma';

export interface StudentResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    dni: bigint;
    phone: string | null;
}

export const AddStudentToSubjectHelper = async (idStudent: string, idSubject: string): Promise<StudentResponse> => {
    try {
        await prisma.subject.update({
            where: { id: idSubject },
            data: {
                students: {
                    connect: { id: idStudent }
                }
            }
        });
        const student = await prisma.student.findUnique({
            where: { id: idStudent },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                dni: true,
                phone: true
            }
        });

        if (!student) {
            throw new Error('No se pudo obtener el estudiante');
        }

        return student;
    } catch (error: any) {
        throw error;
    }
};
