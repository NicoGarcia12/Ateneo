import { DeleteClassHelper } from 'src/helpers/class/delete-class-helper';
import { NotFoundError } from 'src/utils/custom-errors';
import { GetClassHelper } from 'src/helpers/class/get-class-helper';

export const DeleteClassController = async (classId: string): Promise<string> => {
    try {
        const existing = await GetClassHelper({ classId });

        if (!existing) throw new NotFoundError('No existe una clase con ese id');

        const message = await DeleteClassHelper(classId);

        return message;
    } catch (error: any) {
        throw error;
    }
};
