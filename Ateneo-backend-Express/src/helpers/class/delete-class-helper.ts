import { prisma } from 'src/config/prisma';

export const DeleteClassHelper = async (classId: string): Promise<string> => {
    try {
        await prisma.absence.deleteMany({ where: { classId } });

        await prisma.class.delete({ where: { id: classId } });

        return 'Clase eliminada correctamente';
    } catch (error: any) {
        throw error;
    }
};
