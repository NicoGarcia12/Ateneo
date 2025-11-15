import { ValidationError } from 'src/utils/custom-errors';
import { GetGradeWithRelationsHelper } from 'src/helpers/grade/get-grade-with-relations-helper';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export const GetGradeController = async (id: string) => {
    const grade = await GetGradeWithRelationsHelper(id);

    if (!grade) throw new ValidationError('La nota no existe');

    let baseGrades: Array<{ id: string; name: string; weight: number; type: string }> = [];
    if (grade.derivedGradeRel && Array.isArray(grade.derivedGradeRel) && grade.derivedGradeRel.length > 0) {
        baseGrades = grade.derivedGradeRel.map((rel: any) => ({
            id: rel.baseGrade.id,
            name: rel.baseGrade.name,
            weight: rel.weight,
            type: rel.baseGrade.type
        }));
    }
    const result = {
        id: grade.id,
        name: grade.name,
        type: grade.type,
        date: grade.date ? grade.date.toISOString() : null,
        description: grade.description,
        subjectId: grade.subjectId,
        studentsGrades: grade.studentGrades.map((sg: any) => ({
            student: sg.student,
            value: sg.value
        })),
        baseGrades
    };
    return convertBigIntToString(result);
};
