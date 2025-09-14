import { UpdateClassHelper } from 'src/helpers/class/update-class-helper';
import { GetClassController } from 'src/controllers/class/get-class-controller';
import { GetStudentsBySubjectController } from 'src/controllers/subject/get-students-by-subject-controller';
import { NotFoundError, ValidationError } from 'src/utils/custom-errors';

export interface UpdateClassControllerParams {
    classId: string;
    description?: string | null;
    studentsWithAbsences?: string[];
}

export const UpdateClassController = async (params: UpdateClassControllerParams) => {
    const existingClass = await GetClassController({ classId: params.classId });

    if (!existingClass) {
        throw new NotFoundError('No existe una clase con ese id');
    }
    await validateStudentsBelongToSubject(existingClass.subjectId, params.studentsWithAbsences);

    return await UpdateClassHelper(params);
};

async function validateStudentsBelongToSubject(subjectId: string, studentsWithAbsences?: string[] | undefined) {
    if (!studentsWithAbsences || studentsWithAbsences.length === 0) return;

    const studentsInSubject = await GetStudentsBySubjectController({ subjectId });
    const studentIdsInSubject = studentsInSubject.map((student) => student.id);

    const invalidStudentId = studentsWithAbsences.find((studentId) => !studentIdsInSubject.includes(studentId));

    if (invalidStudentId) {
        throw new ValidationError(`El estudiante con ID ${invalidStudentId} no pertenece a esta materia`);
    }
}
