import { UpdateGradeHelper } from 'src/helpers/grade/update-grade-helper';
import { GradeType } from '@prisma/client';
import { ValidationError, ConflictError } from 'src/utils/custom-errors';
import { detectGradeCycle } from 'src/utils/detect-grade-cycle';
import { GetGradeController } from 'src/controllers/grade/get-grade-controller';
import { CalculateWeightedGradeHelper } from '../../helpers/grade/calculate-weighted-grade-helper';
import { CalculateAverageGradeHelper } from '../../helpers/grade/calculate-average-grade-helper';
import { GetStudentGradesByGradeIdsHelper } from 'src/helpers/grade/get-student-grades-by-grade-ids-helper';
import { UpsertStudentGradeHelper } from 'src/helpers/grade/upsert-student-grade-helper';

export interface UpdateGradeParams {
    id: string;
    name?: string;
    type?: string;
    date?: Date;
    description?: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}

export const UpdateGradeController = async (params: UpdateGradeParams) => {
    const { id, name, date, description, baseGrades } = params;

    let gradeType: string | undefined;
    if (baseGrades && baseGrades.length > 0) {
        const grade = await GetGradeController(id);
        gradeType = grade.type;

        let totalWeight = 0;
        for (const bg of baseGrades) {
            if (!Number.isInteger(bg.weight) || bg.weight < 0 || bg.weight > 99) {
                throw new ValidationError('Cada porcentaje debe ser un entero entre 0 y 99');
            }
            totalWeight += bg.weight;
        }
        if (gradeType === 'Weighted' && totalWeight !== 100) {
            throw new ValidationError('Los porcentajes de las notas base deben sumar 100');
        }
        for (const bg of baseGrades) {
            await GetGradeController(bg.gradeId);
        }
        const willCycle = await detectGradeCycle(id, baseGrades);
        if (willCycle) {
            throw new ConflictError('No se puede crear una relación cíclica entre notas');
        }
    }

    const updatedGrade = await UpdateGradeHelper({ id, name, date, description, baseGrades });

    if (baseGrades && baseGrades.length > 0) {
        const baseGradeIds = baseGrades.map((bg) => bg.gradeId);
        if (baseGradeIds.length > 0) {
            const studentGrades = await GetStudentGradesByGradeIdsHelper(baseGradeIds);
            const countByStudent: Record<string, number> = {};
            for (const sg of studentGrades) {
                countByStudent[sg.studentId] = (countByStudent[sg.studentId] || 0) + 1;
            }
            const studentIds = Object.entries(countByStudent)
                .filter(([_, count]) => count === baseGradeIds.length)
                .map(([studentId]) => studentId);

            for (const studentId of studentIds) {
                const value =
                    updatedGrade.type === GradeType.Weighted
                        ? await CalculateWeightedGradeHelper(id, studentId)
                        : await CalculateAverageGradeHelper(id, studentId);
                if (value !== null) {
                    await UpsertStudentGradeHelper({ gradeId: id, studentId, value });
                }
            }
        }
    }

    return updatedGrade;
};
