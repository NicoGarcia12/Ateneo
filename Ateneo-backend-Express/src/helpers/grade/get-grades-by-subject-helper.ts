import { prisma } from 'src/config/prisma';

export interface GetGradesBySubjectHelperParams {
    subjectId: string;
}

export const GetGradesBySubjectHelper = async (params: GetGradesBySubjectHelperParams) => {
    const { subjectId } = params;

    return await prisma.grade.findMany({
        where: { subjectId },
        include: {
            derivedGradeRel: {
                include: {
                    baseGrade: true
                }
            },
            baseGradeRel: {
                include: {
                    derivedGrade: true
                }
            },
            studentGrades: {
                include: {
                    student: true
                }
            }
        },
        orderBy: {
            date: 'asc'
        }
    });
};
