import { Student } from '@prisma/client';
import { AddStudentHelper } from 'src/helpers/student/add-student-helper';
import { ConflictError } from 'src/utils/custom-errors';
import { AddStudentToSubjectHelper } from 'src/helpers/subject/add-student-to-subject-helper';
import { GetStudentByDniHelper } from 'src/helpers/student/get-student-by-dni-helper';

interface AddStudentParams {
    firstName: string;
    lastName: string;
    dni: string | number;
    email?: string;
    phone?: string;
    subjectId?: string;
}

export const AddStudentController = async (params: AddStudentParams): Promise<Student> => {
    const existing = await GetStudentByDniHelper(params.dni);

    if (existing) {
        throw new ConflictError('Ya existe un estudiante con ese DNI');
    }

    const student = await AddStudentHelper(params);

    if (params.subjectId) {
        await AddStudentToSubjectHelper(student.id, params.subjectId);
    }

    return student;
};
