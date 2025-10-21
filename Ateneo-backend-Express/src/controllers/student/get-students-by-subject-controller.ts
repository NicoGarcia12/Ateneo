import { Student } from '@prisma/client';
import { GetStudentsBySubjectHelper } from 'src/helpers/student/get-students-by-subject-helper';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';

type SanitizedStudent = Omit<Student, 'dni'> & { dni: string };

export interface GetStudentsBySubjectControllerParams {
    subjectId: string;
}

export const GetStudentsBySubjectController = async (params: GetStudentsBySubjectControllerParams): Promise<SanitizedStudent[]> => {
    const { subjectId } = params;

    await GetSubjectController({ subjectId });

    const students = await GetStudentsBySubjectHelper(subjectId);

    const studentsSanitized: SanitizedStudent[] = students.map((student) => ({
        ...student,
        dni: student.dni?.toString()
    })) as SanitizedStudent[];

    return studentsSanitized;
};
