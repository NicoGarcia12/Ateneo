import { AddStudentToSubjectHelper } from 'helpers/subject/add-student-to-subject-helper';
import { GetSubjectController } from 'controllers/subject/get-subject-controller';
import { GetStudentController } from 'controllers/student/get-student-controller';
import { ConflictError } from 'src/utils/custom-errors';

export const AddStudentToSubjectController = async (idStudent: string, idSubject: string): Promise<string> => {
    const subject = await GetSubjectController(idSubject);

    await GetStudentController(idStudent);

    const alreadyInSubject = subject.students.some((s: { id: string }) => s.id === idStudent);
    if (alreadyInSubject) {
        throw new ConflictError('El estudiante ya está en esta materia');
    }

    return await AddStudentToSubjectHelper(idStudent, idSubject);
};
