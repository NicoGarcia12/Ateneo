import { Student } from '@prisma/client';
import { AddStudentHelper } from 'src/helpers/student/add-student-helper';
import { AddStudentToSubjectHelper } from 'src/helpers/subject/add-student-to-subject-helper';

interface AddStudentParams {
    firstName: string;
    lastName: string;
    dni: string | number;
    email?: string;
    phone?: string;
    subjectId?: string;
}

export const AddStudentController = async (params: AddStudentParams): Promise<Student> => {
    const student = await AddStudentHelper(params);

    if (params.subjectId) {
        await AddStudentToSubjectHelper(student.id, params.subjectId);
    }

    return student;
};
