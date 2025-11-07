import { DeleteStudentHelper } from 'src/helpers/student/delete-student-helper';
import { GetStudentController } from 'src/controllers/student/get-student-controller';

export const DeleteStudentController = async (studentId: string): Promise<string> => {
    await GetStudentController({ studentId });

    const message = await DeleteStudentHelper(studentId);

    return message;
};
