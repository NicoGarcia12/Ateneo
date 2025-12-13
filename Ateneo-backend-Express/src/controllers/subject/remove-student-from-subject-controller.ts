import { RemoveStudentFromSubjectHelper } from 'src/helpers/subject/remove-student-from-subject-helper';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { GetStudentController } from 'src/controllers/student/get-student-controller';
import { ValidationError } from 'src/utils/custom-errors';

export interface RemoveStudentFromSubjectControllerParams {
    subjectId: string;
    studentId: string;
}

export const RemoveStudentFromSubjectController = async (params: RemoveStudentFromSubjectControllerParams): Promise<void> => {
    const { subjectId, studentId } = params;

    const subject = await GetSubjectController({ subjectId });

    await GetStudentController({ studentId });

    const studentBelongsToSubject = subject.students.some((student: { id: string }) => student.id === studentId);

    if (!studentBelongsToSubject) {
        throw new ValidationError('El estudiante no pertenece a esta materia');
    }

    await RemoveStudentFromSubjectHelper(studentId, subjectId);
};
