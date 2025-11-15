import { GetClassHelper } from 'src/helpers/class/get-class-helper';
import { NotFoundError } from 'src/utils/custom-errors';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export interface GetClassControllerParams {
    classId: string;
}

export const GetClassController = async (params: GetClassControllerParams) => {
    const classData = await GetClassHelper(params);

    if (!classData) {
        throw new NotFoundError('Clase no encontrada');
    }

    return convertBigIntToString(classData);
};
