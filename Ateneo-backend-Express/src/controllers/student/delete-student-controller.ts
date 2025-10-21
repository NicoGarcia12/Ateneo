import { DeleteStudentHelper } from 'src/helpers/student/delete-student-helper';
import { NotFoundError } from 'src/utils/custom-errors';
import { GetStudentHelper } from 'src/helpers/student/get-student-helper';

export const DeleteStudentController = async (studentId: string): Promise<string> => {
    try {
        const existing = await GetStudentHelper(studentId);

        if (!existing) throw new NotFoundError('No existe un estudiante con ese id');

        const message = await DeleteStudentHelper(studentId);

        return message;
    } catch (error: any) {
        throw error;
    }
};
