import { prisma } from 'src/config/prisma';

export interface DeleteGradeHelperParams {
    id: string;
}

export const DeleteGradeHelper = async (params: DeleteGradeHelperParams) => {
    const { id } = params;

    await prisma.gradeRelationship.deleteMany({
        where: { derivedGradeId: id }
    });

    await prisma.studentGrade.deleteMany({
        where: { gradeId: id }
    });

    return await prisma.grade.delete({
        where: { id }
    });
};
