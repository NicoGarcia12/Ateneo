import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

interface AddSubjectParams {
    academicYear: number;
    name: string;
    institution: string;
    degree: string;
    professorId?: string;
}

export const AddSubjectHelper = async (params: AddSubjectParams) => {
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

        await prisma.subject.create({ data });

        return 'Materia creada exitosamente';
    } catch (error: any) {
        throw error;
    }
};
