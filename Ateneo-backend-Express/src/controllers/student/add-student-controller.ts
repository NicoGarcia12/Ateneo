import { Student } from '@prisma/client';
import { AddStudentHelper } from 'src/helpers/student/add-student-helper';
import { ConflictError } from 'src/utils/custom-errors';
import { AddStudentToSubjectController } from 'src/controllers/subject/add-student-to-subject-controller';
import { GetStudentByDniController } from 'src/controllers/student/get-student-by-dni-controller';

interface AddStudentParams {
    firstName: string;
    lastName: string;
    dni: string | number;
    email?: string;
    phone?: string;
    subjectId?: string;
}

export const AddStudentController = async (params: AddStudentParams): Promise<Student> => {
    try {
        await GetStudentByDniController({ dni: params.dni });
        throw new ConflictError('Ya existe un estudiante con ese DNI');
    } catch (error: any) {
        if (error.name !== 'NotFoundError') {
            throw error;
        }
    }

    const student = await AddStudentHelper(params);

    if (params.subjectId) {
        await AddStudentToSubjectController({ studentId: student.id, subjectId: params.subjectId });
    }

    return student;
};
