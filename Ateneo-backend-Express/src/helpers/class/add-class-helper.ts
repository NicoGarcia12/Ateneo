import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';
import { GetSubjectHelper } from 'src/helpers/subject/get-subject-helper';

interface AddClassParams {
    date: string;
    description?: string;
    subjectId: string;
    absentStudents?: Array<{ id: string; justificado: boolean }>;
}

export const AddClassHelper = async (params: AddClassParams): Promise<string> => {
    const { date, description, subjectId, absentStudents } = params;
    try {
        const classId = generateId('class');
        await prisma.class.create({
            data: {
                id: classId,
                date,
                description: description ?? null,
                subject: { connect: { id: subjectId } },
                absences: {
                    create:
                        absentStudents?.map((s) => ({
                            id: generateId('absence'),
                            studentId: s.id,
                            justified: s.justificado ?? false
                        })) || []
                }
            }
        });

        return 'Clase creada exitosamente';
    } catch (error: any) {
        throw error;
    }
};
