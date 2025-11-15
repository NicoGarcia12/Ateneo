import { prisma } from 'src/config/prisma';

export const GetGradeWithRelationsHelper = async (id: string) => {
    return await prisma.grade.findUnique({
        where: { id },
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
        }
    });
};
