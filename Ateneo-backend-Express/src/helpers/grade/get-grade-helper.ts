import { prisma } from 'src/config/prisma';
import { Grade } from '@prisma/client';

export const GetGradeHelper = async (id: string): Promise<Grade | null> => {
    return await prisma.grade.findUnique({ where: { id } });
};
