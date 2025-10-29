import { prisma } from 'src/config/prisma';

export const CalculateWeightedGradeHelper = async (gradeId: string, studentId: string): Promise<number | null> => {
    const relationships = await prisma.gradeRelationship.findMany({
        where: { derivedGradeId: gradeId },
        include: {
            baseGrade: {
                include: {
                    studentGrades: {
                        where: { studentId }
                    }
                }
            }
        }
    });

    if (relationships.length === 0) {
        return null;
    }

    let totalValue = 0;
    let totalWeight = 0;

    for (const rel of relationships) {
        const studentGrade = rel.baseGrade.studentGrades[0];

        if (!studentGrade) {
            return null;
        }

        totalValue += studentGrade.value * rel.weight;
        totalWeight += rel.weight;
    }

    return totalWeight > 0 ? totalValue / totalWeight : null;
};
