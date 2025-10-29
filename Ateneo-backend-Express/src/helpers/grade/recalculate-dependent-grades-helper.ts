import { prisma } from 'src/config/prisma';
import { GradeType } from '@prisma/client';
import { CalculateWeightedGradeHelper } from './calculate-weighted-grade-helper';
import { CalculateAverageGradeHelper } from './calculate-average-grade-helper';

export const RecalculateDependentGradesHelper = async (baseGradeId: string, studentId: string): Promise<void> => {
    const dependentRelationships = await prisma.gradeRelationship.findMany({
        where: { baseGradeId },
        include: {
            derivedGrade: true
        }
    });

    for (const rel of dependentRelationships) {
        const derivedGrade = rel.derivedGrade;

        let calculatedValue: number | null = null;

        if (derivedGrade.type === GradeType.Weighted) {
            calculatedValue = await CalculateWeightedGradeHelper(derivedGrade.id, studentId);
        } else if (derivedGrade.type === GradeType.Average) {
            calculatedValue = await CalculateAverageGradeHelper(derivedGrade.id, studentId);
        }

        if (calculatedValue !== null) {
            const existingGrade = await prisma.studentGrade.findFirst({
                where: {
                    gradeId: derivedGrade.id,
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
                        id: `${derivedGrade.id}-${studentId}-${Date.now()}`,
                        gradeId: derivedGrade.id,
                        studentId,
                        value: calculatedValue
                    }
                });
            }

            await RecalculateDependentGradesHelper(derivedGrade.id, studentId);
        }
    }
};
