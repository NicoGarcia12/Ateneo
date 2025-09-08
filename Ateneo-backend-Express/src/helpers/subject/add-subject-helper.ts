import { PrismaClient } from '@prisma/client';
import { generateId } from 'src/utils/generate-id';

const prisma = new PrismaClient();

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
            id: generateId(),
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
    } finally {
        await prisma.$disconnect();
    }
};
