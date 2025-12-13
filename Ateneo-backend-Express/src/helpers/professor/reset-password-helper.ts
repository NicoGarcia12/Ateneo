import { prisma } from 'src/config/prisma';
import { Professor } from '@prisma/client';

export interface ResetPasswordHelperParams {
    email: string;
    hashedPassword: string;
}

export const ResetPasswordHelper = async (params: ResetPasswordHelperParams): Promise<Professor> => {
    return await prisma.professor.update({
        where: {
            email: params.email
        },
        data: {
            password: params.hashedPassword,
            resetPasswordCode: null,
            resetPasswordCodeCreatedAt: null
        }
    });
};
