import { PrismaClient } from '@prisma/client';
import { generateId } from 'src/utils/generate-id';
import { GetSubjectHelper } from 'helpers/subject/get-subject-helper';
import { NotFoundError } from 'src/utils/custom-errors';

const prisma = new PrismaClient();

interface AddClassParams {
    date: string;
    description?: string;
    subjectId: string;
}

export const AddClassHelper = async (params: AddClassParams): Promise<string> => {
    const { date, description, subjectId } = params;
    try {
        await prisma.class.create({
            data: {
                id: generateId(),
                date,
                description: description ?? null,
                subject: { connect: { id: subjectId } }
            }
        });

        return 'Clase creada exitosamente';
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
