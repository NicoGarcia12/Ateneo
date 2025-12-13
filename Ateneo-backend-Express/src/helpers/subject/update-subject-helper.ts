import { prisma } from 'src/config/prisma';

interface UpdateSubjectParams {
    subjectId: string;
    name?: string;
    academicYear?: number;
    institution?: string;
    degree?: string;
}

export const UpdateSubjectHelper = async (params: UpdateSubjectParams): Promise<void> => {
    const { subjectId, ...data } = params;
    await prisma.subject.update({
        where: { id: subjectId },
        data
    });
};
