import { UpdateGradeHelper } from 'src/helpers/grade/update-grade-helper';
import { GradeType } from '@prisma/client';
import { ValidationError, NotFoundError, ConflictError } from 'src/utils/custom-errors';
import { detectGradeCycle } from 'src/utils/detect-grade-cycle';
import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';
import { GetStudentGradesByGradeIdHelper } from 'src/helpers/grade/get-student-grades-by-grade-id-helper';
import { RecalculateDependentGradesHelper } from 'src/helpers/grade/recalculate-dependent-grades-helper';

export interface UpdateGradeParams {
    id: string;
    name?: string;
    date?: Date;
    description?: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}

export const UpdateGradeController = async (params: UpdateGradeParams) => {
    const { id, name, date, description, baseGrades } = params;

    if (baseGrades && baseGrades.length > 0) {
        const grade = await UpdateGradeHelper({ id });

        if (grade.type === GradeType.Weighted) {
            let totalWeight = 0;

            for (const bg of baseGrades) {
                if (!Number.isInteger(bg.weight) || bg.weight < 0 || bg.weight > 99) {
                    throw new ValidationError('Cada porcentaje debe ser un entero entre 0 y 99');
                }

                totalWeight += bg.weight;
            }

            if (totalWeight !== 100) {
                throw new ValidationError('Los porcentajes de las notas base deben sumar 100');
            }

            for (const bg of baseGrades) {
                const baseGrade = await GetGradeHelper(bg.gradeId);

                if (!baseGrade) {
                    throw new NotFoundError(`La nota base con id ${bg.gradeId} no existe`);
                }

                if (baseGrade.subjectId !== grade.subjectId) {
                    throw new ValidationError('Todas las notas base deben pertenecer a la misma materia');
                }
            }

            const willCycle = await detectGradeCycle(id, baseGrades);

            if (willCycle) {
                throw new ConflictError('No se puede crear una relación cíclica entre notas');
            }
        }
    }

    const updatedGrade = await UpdateGradeHelper({ id, name, date, description, baseGrades });

    if (baseGrades && baseGrades.length > 0) {
        const studentGrades = await GetStudentGradesByGradeIdHelper(id);

        for (const sg of studentGrades) {
            await RecalculateDependentGradesHelper(id, sg.studentId);
        }
    }

    return updatedGrade;
};
