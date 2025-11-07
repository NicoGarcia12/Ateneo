import { UpdateGradeHelper } from 'src/helpers/grade/update-grade-helper';
import { prisma } from 'src/config/prisma';
import { GradeType } from '@prisma/client';
import { ValidationError, NotFoundError, ConflictError } from 'src/utils/custom-errors';
import { detectGradeCycle } from 'src/utils/detect-grade-cycle';
import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';
import { CalculateWeightedGradeHelper } from '../../helpers/grade/calculate-weighted-grade-helper';
import { CalculateAverageGradeHelper } from '../../helpers/grade/calculate-average-grade-helper';

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
            const studentGrades = await prisma.studentGrade.findMany({
                where: { gradeId: { in: baseGradeIds } }
            });
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
                    const existing = await prisma.studentGrade.findFirst({ where: { gradeId: id, studentId } });
                    if (existing) {
                        await prisma.studentGrade.update({ where: { id: existing.id }, data: { value } });
                    } else {
                        await prisma.studentGrade.create({
                            data: { id: `${id}-${studentId}-${Date.now()}`, gradeId: id, studentId, value }
                        });
                    }
                }
            }
        }
    }

    return updatedGrade;
};
