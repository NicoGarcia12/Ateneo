import { Student } from '@prisma/client';
import { GetStudentHelper } from '../../helpers/student/get-student-helper';

export const GetStudentController = async (idStudent: string): Promise<Student | null> => {
    try {
        const student = await GetStudentHelper(idStudent);

        if (!student) {
            throw new Error('No existe un estudiante con ese id');
        }

        return student;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
