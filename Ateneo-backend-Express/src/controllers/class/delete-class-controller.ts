import { DeleteClassHelper } from 'src/helpers/class/delete-class-helper';
import { GetClassController } from 'src/controllers/class/get-class-controller';

export const DeleteClassController = async (classId: string): Promise<string> => {
    await GetClassController({ classId });

    const message = await DeleteClassHelper(classId);

    return message;
};
