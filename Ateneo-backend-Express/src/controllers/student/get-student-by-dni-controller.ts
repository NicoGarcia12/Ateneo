import { GetStudentByDniHelper } from 'src/helpers/student/get-student-by-dni-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export interface GetStudentByDniControllerParams {
    dni: string | number;
}

export const GetStudentByDniController = async (params: GetStudentByDniControllerParams) => {
    const { dni } = params;
    const student = await GetStudentByDniHelper(dni);

    if (!student) {
        throw new NotFoundError('No existe un estudiante con ese DNI');
    }

    return student;
};
