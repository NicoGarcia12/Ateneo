import { prisma } from 'src/config/prisma';

export interface UpdateClassHelperParams {
    classId: string;
    description?: string | null;
    studentsWithAbsences?: string[];
}

export const UpdateClassHelper = async (params: UpdateClassHelperParams) => {
    try {
        const { classId, ...updateData } = params;
        const updated = await prisma.class.update({
            where: { id: classId },
            data: updateData
        });
        return updated;
    } catch (error: any) {
        throw error;
    }
};
