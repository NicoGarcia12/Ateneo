import { Student } from '@prisma/client';
import { UpdateStudentHelper, UpdateStudentHelperParams } from 'src/helpers/student/update-student-helper';
import { GetStudentController } from 'src/controllers/student/get-student-controller';
import { NotFoundError } from 'src/utils/custom-errors';

export const UpdateStudentController = async (params: UpdateStudentHelperParams): Promise<Student> => {
    try {
        const existingStudent = await GetStudentController({ studentId: params.studentId });

        if (!existingStudent) {
            throw new NotFoundError('No existe un estudiante con ese id');
        }

        return await UpdateStudentHelper(params);
    } catch (error: any) {
        throw error;
    }
};
