import { Professor } from '@prisma/client';
import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

export interface ProfessorResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    emailActivated: boolean;
}

export const SignUpProfessorHelper = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
): Promise<ProfessorResponse> => {
    try {
        const professor = await prisma.professor.create({
            data: {
                id: generateId('professor'),
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                emailActivated: true
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                emailActivated: true
            }
        });

        return professor;
    } catch (error: any) {
        throw error;
    }
};
