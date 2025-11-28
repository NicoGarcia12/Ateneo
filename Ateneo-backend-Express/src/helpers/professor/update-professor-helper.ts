import { prisma } from 'src/config/prisma';
import bcrypt from 'bcrypt';

export interface UpdateProfessorHelperParams {
    id: string;
    firstName?: string;
    lastName?: string;
    password?: string;
}

export const UpdateProfessorHelper = async (params: UpdateProfessorHelperParams) => {
    const { id, firstName, lastName, password } = params;
    try {
        const dataToUpdate: any = {};
        if (firstName !== undefined) dataToUpdate.firstName = firstName;
        if (lastName !== undefined) dataToUpdate.lastName = lastName;
        if (password !== undefined) dataToUpdate.password = password;
        if (Object.keys(dataToUpdate).length === 0) return;
        await prisma.professor.update({
            where: { id },
            data: dataToUpdate
        });
    } catch (error) {
        throw error;
    }
};
