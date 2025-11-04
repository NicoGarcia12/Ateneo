import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

interface AddSubjectParams {
    academicYear: number;
    name: string;
    institution: string;
    degree: string;
    professorId?: string;
}

export interface SubjectResponse {
    id: string;
    name: string;
    academicYear: number;
    institution: string;
    degree: string;
    professorId: string | null;
}

export const AddSubjectHelper = async (params: AddSubjectParams): Promise<SubjectResponse> => {
    const { academicYear, name, institution, degree, professorId } = params;
    try {
        const data: any = {
            id: generateId('subject'),
            name,
            academicYear,
            institution,
            degree
        };

        if (professorId) {
            data.professor = { connect: { id: professorId } };
        }

        const subject: SubjectResponse = await prisma.subject.create({
            data,
            select: {
                id: true,
                name: true,
                academicYear: true,
                institution: true,
                degree: true,
                professorId: true
            }
        });

        return subject;
    } catch (error: any) {
        throw error;
    }
};
