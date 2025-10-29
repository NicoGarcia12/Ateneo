import { AddStudentGradeHelper } from 'src/helpers/grade/add-student-grade-helper';
import { GetStudentsBySubjectController } from 'src/controllers/student/get-students-by-subject-controller';
import { ValidationError } from 'src/utils/custom-errors';
import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';

export interface AddStudentGradeParams {
    gradeId: string;
    studentId: string;
    value: number;
}

export const AddStudentGradeController = async (params: AddStudentGradeParams) => {
    const { gradeId, studentId, value } = params;

    if (!Number.isInteger(value) || value < 1 || value > 10) {
        throw new ValidationError('La nota debe ser un entero entre 1 y 10');
    }

    const gradeDb = await GetGradeHelper(gradeId);

    if (!gradeDb) throw new ValidationError('La nota no existe');

    if (gradeDb.type === 'Weighted' || gradeDb.type === 'Promedio') {
        throw new ValidationError('No se puede agregar una nota manual a una nota calculada (Ponderada o Promedio)');
    }

    const subjectId: string = gradeDb.subjectId;
    const students = await GetStudentsBySubjectController({ subjectId });
    const found = students.find((s: { id: string }) => s.id === studentId);

    if (!found) {
        throw new ValidationError('El estudiante no pertenece a la materia');
    }

    return await AddStudentGradeHelper({ gradeId, studentId, value });
};
