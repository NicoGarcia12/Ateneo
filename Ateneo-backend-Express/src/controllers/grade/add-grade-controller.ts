import { AddGradeHelper } from 'src/helpers/grade/add-grade-helper';
import { prisma } from 'src/config/prisma';
import { RecalculateDependentGradesHelper } from 'src/helpers/grade/recalculate-dependent-grades-helper';
import { GradeType } from '@prisma/client';
import { detectGradeCycle } from 'src/utils/detect-grade-cycle';
import { GetSubjectHelper } from 'src/helpers/subject/get-subject-helper';
import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';
import { ValidationError, NotFoundError, ConflictError } from 'src/utils/custom-errors';
import { CalculateWeightedGradeHelper } from '../../helpers/grade/calculate-weighted-grade-helper';
import { CalculateAverageGradeHelper } from '../../helpers/grade/calculate-average-grade-helper';

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

    if (type === GradeType.Average && (!baseGrades || baseGrades.length === 0)) {
        throw new ValidationError('Las notas de promedio requieren al menos una nota base');
    }

    if ((type === GradeType.Weighted || type === GradeType.Average) && baseGrades) {
        if (type === GradeType.Weighted) {
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

    const grade = await AddGradeHelper({
        name,
        type,
        date,
        description,
        subjectId,
        baseGrades: baseGrades || []
    });

    if (type === GradeType.Weighted || type === GradeType.Average) {
        const baseGradeIds = (baseGrades || []).map((bg) => bg.gradeId);
        if (baseGradeIds.length > 0) {
            const studentsWithAllBaseGrades: Set<string> = new Set();
            const studentGradesByBase: Array<{ gradeId: string; studentId: string }> = [];
            for (const baseGradeId of baseGradeIds) {
                const grades = await prisma.studentGrade.findMany({ where: { gradeId: baseGradeId } });
                grades.forEach((g: { studentId: string }) => studentGradesByBase.push({ gradeId: baseGradeId, studentId: g.studentId }));
            }
            const studentCount: Record<string, number> = {};
            for (const entry of studentGradesByBase) {
                studentCount[entry.studentId] = (studentCount[entry.studentId] || 0) + 1;
            }
            for (const [studentId, count] of Object.entries(studentCount)) {
                if (count === baseGradeIds.length) {
                    studentsWithAllBaseGrades.add(studentId);
                }
            }
            for (const studentId of studentsWithAllBaseGrades) {
                let calculatedValue: number | null = null;
                if (type === GradeType.Weighted) {
                    calculatedValue = await CalculateWeightedGradeHelper(grade.id, studentId);
                } else if (type === GradeType.Average) {
                    calculatedValue = await CalculateAverageGradeHelper(grade.id, studentId);
                }
                if (calculatedValue !== null) {
                    const existingGrade = await prisma.studentGrade.findFirst({
                        where: {
                            gradeId: grade.id,
                            studentId
                        }
                    });
                    if (existingGrade) {
                        await prisma.studentGrade.update({
                            where: { id: existingGrade.id },
                            data: { value: calculatedValue }
                        });
                    } else {
                        await prisma.studentGrade.create({
                            data: {
                                id: `${grade.id}-${studentId}-${Date.now()}`,
                                gradeId: grade.id,
                                studentId,
                                value: calculatedValue
                            }
                        });
                    }
                }
            }
        }
    }

    return grade;
};
