import { prisma } from 'src/config/prisma';
import { Professor } from '@prisma/client';

export interface UpdateResetCodeParams {
    professorId: string;
    resetPasswordCode: string;
    resetPasswordCodeCreatedAt: Date;
}

export const UpdateResetCodeHelper = async (params: UpdateResetCodeParams): Promise<Professor> => {
    return await prisma.professor.update({
        where: {
            id: params.professorId
        },
        data: {
            resetPasswordCode: params.resetPasswordCode,
            resetPasswordCodeCreatedAt: params.resetPasswordCodeCreatedAt
        }
    });
};
