import { AddGradeHelper } from 'src/helpers/grade/add-grade-helper';
import { GradeType } from '@prisma/client';
import { detectGradeCycle } from 'src/utils/detect-grade-cycle';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { GetGradeController } from 'src/controllers/grade/get-grade-controller';
import { ValidationError, ConflictError } from 'src/utils/custom-errors';
import { CalculateWeightedGradeHelper } from '../../helpers/grade/calculate-weighted-grade-helper';
import { CalculateAverageGradeHelper } from '../../helpers/grade/calculate-average-grade-helper';
import { GetStudentGradesByGradeIdHelper } from 'src/helpers/grade/get-student-grades-by-grade-id-helper';
import { UpsertStudentGradeHelper } from 'src/helpers/grade/upsert-student-grade-helper';

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

    await GetSubjectController({ subjectId });

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
            const baseGrade = await GetGradeController(bg.gradeId);
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
                const grades = await GetStudentGradesByGradeIdHelper(baseGradeId);
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
                    await UpsertStudentGradeHelper({
                        gradeId: grade.id,
                        studentId,
                        value: calculatedValue
                    });
                }
            }
        }
    }

    return grade;
};
