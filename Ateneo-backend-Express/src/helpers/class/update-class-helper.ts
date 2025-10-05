import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

export interface UpdateClassHelperParams {
    classId: string;
    description?: string | null;
    absentStudents?: Array<{ id: string; justificado: boolean }>;
}

export const UpdateClassHelper = async (params: UpdateClassHelperParams): Promise<string> => {
    const { classId, description, absentStudents } = params;
    try {
        await prisma.class.update({
            where: { id: classId },
            data: { description: description ?? null }
        });

        if (absentStudents !== undefined) {
            await prisma.absence.deleteMany({ where: { classId } });

            if (absentStudents.length > 0) {
                await prisma.absence.createMany({
                    data: absentStudents.map(s => ({
                        id: generateId('absence'),
                        studentId: s.id,
                        classId,
                        justified: s.justificado
                    }))
                });
            }
        }

        return 'Clase actualizada exitosamente';
    } catch (error: any) {
        throw error;
    }
};
