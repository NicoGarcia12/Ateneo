import { prisma } from 'src/config/prisma';

export const GetClassesBySubjectHelper = async (subjectId: string) => {
    try {
        const classes = await prisma.class.findMany({
            where: { subjectId },
            select: {
                id: true,
                date: true,
                description: true,
                subjectId: true,
                absences: {
                    select: {
                        justified: true,
                        student: { select: { id: true, firstName: true, lastName: true} }
                    }
                }
            }
        });

        return classes;
    } catch (error: any) {
        throw error;
    }
};
