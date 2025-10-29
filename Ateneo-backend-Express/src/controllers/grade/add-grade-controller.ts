import { AddGradeHelper } from 'src/helpers/grade/add-grade-helper';
import { GradeType } from '@prisma/client';
import { detectGradeCycle } from 'src/utils/detect-grade-cycle';
import { GetSubjectHelper } from 'src/helpers/subject/get-subject-helper';
import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';
import { ValidationError, NotFoundError, ConflictError } from 'src/utils/custom-errors';

export interface AddGradeParams {
    name: string;
    type: GradeType;
    date: Date;
    description: string;
    subjectId: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}

export const AddGradeController = async (params: AddGradeParams) => {
    const { name, type, date, description, subjectId, baseGrades } = params;

    const subject = await GetSubjectHelper(subjectId);

    if (!subject) {
        throw new ValidationError('La materia no existe');
    }

    if (type === GradeType.Weighted && (!baseGrades || baseGrades.length === 0)) {
        throw new ValidationError('Las notas ponderadas requieren al menos una nota base');
    }

    if (type === GradeType.Promedio && (!baseGrades || baseGrades.length === 0)) {
        throw new ValidationError('Las notas de promedio requieren al menos una nota base');
    }

    if (type === GradeType.Weighted && baseGrades) {
        let totalWeight = 0;

        for (const bg of baseGrades) {
            if (!Number.isInteger(bg.weight) || bg.weight < 1 || bg.weight > 99) {
                throw new ValidationError('Cada porcentaje debe ser un entero entre 1 y 99');
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

            if (baseGrade.subjectId !== subjectId) {
                throw new ValidationError('Todas las notas base deben pertenecer a la misma materia');
            }
        }

        const willCycle = await detectGradeCycle('new-grade-id', baseGrades);

        if (willCycle) {
            throw new ConflictError('No se puede crear una relación cíclica entre notas');
        }
    }

    return await AddGradeHelper({
        name,
        type,
        date,
        description,
        subjectId,
        baseGrades: baseGrades || []
    });
};
