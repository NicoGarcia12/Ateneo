import { prisma } from 'src/config/prisma';

export const GetStudentGradesByGradeIdsHelper = async (gradeIds: string[]) => {
    return await prisma.studentGrade.findMany({
        where: { gradeId: { in: gradeIds } }
    });
};
