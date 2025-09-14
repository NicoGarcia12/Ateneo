import { prisma } from 'src/config/prisma';

export const GetSubjectHelper = async (subjectId: string) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: subjectId },
            include: {
                students: {
                    select: {
                        id: true
                    }
                },
                classes: {
                    select: {
                        id: true
                    }
                },
                grades: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return subject;
    } catch (error: any) {
        throw error;
    }
};
