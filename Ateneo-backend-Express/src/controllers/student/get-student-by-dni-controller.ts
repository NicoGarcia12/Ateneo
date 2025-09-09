import { GetStudentByDniHelper } from 'helpers/student/get-student-by-dni-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export const GetStudentByDniController = async (dni: string | number) => {
    const student = await GetStudentByDniHelper(dni);

    if (!student) {
        throw new NotFoundError('No existe un estudiante con ese DNI');
    }

    return student;
};
