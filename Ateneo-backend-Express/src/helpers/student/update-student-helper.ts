import { Student } from '@prisma/client';
import { prisma } from 'src/config/prisma';

export interface UpdateStudentHelperParams {
    studentId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

export const UpdateStudentHelper = async (params: UpdateStudentHelperParams): Promise<Student> => {
    const { studentId, firstName, lastName, email, phone } = params;
    try {
        const student = await prisma.student.update({
            where: { id: studentId },
            data: {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(email !== undefined && { email }),
                ...(phone !== undefined && { phone })
            }
        });

        return student;
    } catch (error: any) {
        throw error;
    }
};
