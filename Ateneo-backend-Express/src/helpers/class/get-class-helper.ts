import { prisma } from 'src/config/prisma';

export interface GetClassHelperParams {
    classId: string;
}

export const GetClassHelper = async (params: GetClassHelperParams) => {
    try {
        const { classId } = params;
        const classData = await prisma.class.findUnique({
            where: { id: classId }
        });

        return classData;
    } catch (error: any) {
        throw error;
    }
};
