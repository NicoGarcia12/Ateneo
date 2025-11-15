import { prisma } from 'src/config/prisma';

export const GetDependentGradesHelper = async (baseGradeId: string) => {
    return await prisma.gradeRelationship.findMany({
        where: { baseGradeId },
        include: {
            derivedGrade: true
        }
    });
};
