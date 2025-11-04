import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';
import { GetSubjectHelper } from 'src/helpers/subject/get-subject-helper';

interface AddClassParams {
    date: string;
    description?: string;
    subjectId: string;
    absentStudents?: Array<{ id: string; justificado: boolean }>;
}

export interface ClassResponse {
    id: string;
    date: Date;
    description?: string | null;
    subjectId: string;
}

export const AddClassHelper = async (params: AddClassParams): Promise<ClassResponse> => {
    const { date, description, subjectId, absentStudents } = params;
    try {
        const classId = generateId('class');
        const newClass: ClassResponse = await prisma.class.create({
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
            },
            select: {
                id: true,
                date: true,
                description: true,
                subjectId: true
            }
        });
        return newClass;
    } catch (error: any) {
        throw error;
    }
};
