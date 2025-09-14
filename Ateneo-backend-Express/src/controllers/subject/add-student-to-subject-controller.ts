import { AddStudentToSubjectHelper } from 'src/helpers/subject/add-student-to-subject-helper';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { GetStudentController } from 'src/controllers/student/get-student-controller';
import { ConflictError } from 'src/utils/custom-errors';

export interface AddStudentToSubjectControllerParams {
    studentId: string;
    subjectId: string;
}

export const AddStudentToSubjectController = async (params: AddStudentToSubjectControllerParams): Promise<string> => {
    const { studentId, subjectId } = params;
    const subject = await GetSubjectController({ subjectId });

    await GetStudentController({ studentId });

    const alreadyInSubject = subject.students.some((s: { id: string }) => s.id === studentId);
    if (alreadyInSubject) {
        throw new ConflictError('El estudiante ya está en esta materia');
    }

    return await AddStudentToSubjectHelper(studentId, subjectId);
};
