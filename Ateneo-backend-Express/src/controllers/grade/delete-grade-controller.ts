import { DeleteGradeHelper } from 'src/helpers/grade/delete-grade-helper';
import { GetDependentGradesHelper } from 'src/helpers/grade/get-dependent-grades-helper';
import { ValidationError } from 'src/utils/custom-errors';

export interface DeleteGradeParams {
    id: string;
}

export const DeleteGradeController = async (params: DeleteGradeParams) => {
    const { id } = params;

    const dependentGrades = await GetDependentGradesHelper(id);

    if (dependentGrades.length > 0) {
        throw new ValidationError(`No se puede eliminar esta nota porque otras notas dependen de ella`);
    }

    return await DeleteGradeHelper({ id });
};
