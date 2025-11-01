import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';
import { ValidationError } from 'src/utils/custom-errors';

export const GetGradeController = async (id: string) => {
    const grade = await GetGradeHelper(id);

    if (!grade) throw new ValidationError('La nota no existe');

    return grade;
};
