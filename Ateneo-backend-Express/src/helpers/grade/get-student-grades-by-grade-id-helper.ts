import { prisma } from 'src/config/prisma';

export const GetStudentGradesByGradeIdHelper = async (gradeId: string) => {
    return await prisma.studentGrade.findMany({ where: { gradeId } });
};
