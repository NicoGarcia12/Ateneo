import { GetStudentHelper } from 'helpers/student/get-student-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export const GetStudentController = async (idStudent: string) => {
    const student = await GetStudentHelper(idStudent);

    if (!student) {
        throw new NotFoundError('No existe un estudiante con ese id');
    }

    return student;
};
