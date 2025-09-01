import { Student } from '@prisma/client';
import { GetStudentHelper } from '../../helpers/student/get-student-helper';
import { NotFoundError, InternalError } from '../../utils/custom-errors';

export const GetStudentController = async (idStudent: string): Promise<Student | null> => {
    try {
        const student = await GetStudentHelper(idStudent);

        if (!student) {
            throw new NotFoundError('No existe un estudiante con ese id');
        }

        return student;
    } catch (error: any) {
        throw error;
    }
};
