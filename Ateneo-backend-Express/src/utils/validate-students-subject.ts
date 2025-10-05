import { GetStudentsBySubjectController } from 'src/controllers/subject/get-students-by-subject-controller';
import { ValidationError } from './custom-errors';

export async function validateStudentsSubject(subjectId: string, absentStudents: Array<{ id: string; justificado: boolean }>) {
    if (!absentStudents || absentStudents.length === 0) return;

    const studentsInSubject = await GetStudentsBySubjectController({ subjectId });
    const studentIdsInSubject = studentsInSubject.map((s) => s.id);

    const invalid = absentStudents.find((s) => !studentIdsInSubject.includes(s.id));

    if (invalid) {
        throw new ValidationError(`El estudiante con ID ${invalid.id} no pertenece a esta materia`);
    }
}
