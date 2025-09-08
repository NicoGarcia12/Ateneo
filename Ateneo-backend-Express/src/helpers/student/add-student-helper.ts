import { PrismaClient, Student } from '@prisma/client';
import { generateId } from 'src/utils/generate-id';
import { ConflictError, InternalError } from 'src/utils/custom-errors';

const prisma = new PrismaClient();

interface AddStudentParams {
    firstName: string;
    lastName: string;
    dni: string | number;
    email?: string;
    phone?: string;
}

export const AddStudentHelper = async (params: AddStudentParams): Promise<Student> => {
    const { firstName, lastName, dni, email, phone } = params;
    try {
        const existing = await prisma.student.findUnique({
            where: { dni: typeof dni === 'string' ? BigInt(dni) : dni }
        });
        if (existing) {
            throw new ConflictError('Ya existe un estudiante con ese DNI');
        }

        const student = await prisma.student.create({
            data: {
                id: generateId(),
                firstName,
                lastName,
                dni: typeof dni === 'string' ? BigInt(dni) : dni,
                email,
                phone
            }
        });
        return student;
    } catch (error: any) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
