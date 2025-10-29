import { prisma } from 'src/config/prisma';

export const CalculateArithmeticGradeHelper = async (gradeId: string, studentId: string): Promise<number | null> => {
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

    let sum = 0;
    let count = 0;

    for (const rel of relationships) {
        const studentGrade = rel.baseGrade.studentGrades[0];

        if (!studentGrade) {
            return null;
        }

        sum += studentGrade.value;
        count++;
    }

    return count > 0 ? sum / count : null;
};
