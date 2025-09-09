import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetClassesBySubjectHelper = async (subjectId: string) => {
    try {
        const classes = await prisma.class.findMany({
            where: { subjectId },
            select: {
                id: true,
                date: true,
                description: true,
                subjectId: true
            }
        });

        return classes;
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
