import { GetStudentHelper } from 'src/helpers/student/get-student-helper';
import { NotFoundError } from 'src/utils/custom-errors';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export interface GetStudentControllerParams {
    studentId: string;
}

export const GetStudentController = async (params: GetStudentControllerParams) => {
    const { studentId } = params;
    const student = await GetStudentHelper(studentId);

    if (!student) {
        throw new NotFoundError('No existe un estudiante con ese id');
    }

    return convertBigIntToString({
        ...student,
        dni: student.dni?.toString()
    });
};
