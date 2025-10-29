import { DeleteGradeHelper } from 'src/helpers/grade/delete-grade-helper';
import { prisma } from 'src/config/prisma';
import { ValidationError } from 'src/utils/custom-errors';

export interface DeleteGradeParams {
    id: string;
}

export const DeleteGradeController = async (params: DeleteGradeParams) => {
    const { id } = params;

    const dependentGrades = await prisma.gradeRelationship.findMany({
        where: { baseGradeId: id },
        include: {
            derivedGrade: true
        }
    });

    if (dependentGrades.length > 0) {
        const dependentNames = dependentGrades.map((dg) => dg.derivedGrade.name).join(', ');
        throw new ValidationError(`No se puede eliminar esta nota porque otras notas dependen de ella: ${dependentNames}`);
    }

    return await DeleteGradeHelper({ id });
};
