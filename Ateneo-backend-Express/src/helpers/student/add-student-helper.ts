import { Student } from '@prisma/client';
import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

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
        const student = await prisma.student.create({
            data: {
                id: generateId('student'),
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
    }
};
