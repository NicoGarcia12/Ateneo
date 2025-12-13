import { prisma } from 'src/config/prisma';

export const DeleteSubjectHelper = async (subjectId: string): Promise<void> => {
    await prisma.subject.delete({
        where: { id: subjectId }
    });
};
