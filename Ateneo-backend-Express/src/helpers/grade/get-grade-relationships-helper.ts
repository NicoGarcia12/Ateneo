import { prisma } from 'src/config/prisma';

export const GetGradeRelationshipsHelper = async (derivedGradeId: string) => {
    return await prisma.gradeRelationship.findMany({ where: { derivedGradeId } });
};
