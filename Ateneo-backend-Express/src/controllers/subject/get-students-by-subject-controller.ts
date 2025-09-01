import { Student } from '@prisma/client';
import { GetStudentsBySubjectHelper } from '../../helpers/subject/get-students-by-subject-helper';

type SanitizedStudent = Omit<Student, 'dni'> & { dni: string };

export const GetStudentsBySubjectController = async (idSubject: string): Promise<SanitizedStudent[]> => {
    const students = await GetStudentsBySubjectHelper(idSubject);
    const studentsSanitized = students.map((student) => ({
        ...student,
        dni: student.dni?.toString()
    }));

    return studentsSanitized;
};
