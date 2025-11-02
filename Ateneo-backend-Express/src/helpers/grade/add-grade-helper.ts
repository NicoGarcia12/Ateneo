import { prisma } from 'src/config/prisma';
import { GradeType } from '@prisma/client';
import { generateId } from 'src/utils/generate-id';

export interface AddGradeHelperParams {
    name: string;
    type: GradeType;
    date: Date;
    description?: string;
    subjectId: string;
    baseGrades: Array<{ gradeId: string; weight: number }>;
}

export const AddGradeHelper = async (params: AddGradeHelperParams) => {
    const { name, type, date, description = '', subjectId, baseGrades } = params;

    const grade = await prisma.grade.create({
        data: {
            id: generateId('grade'),
            name,
            type,
            date,
            description,
            subjectId
        }
    });

    if (baseGrades.length > 0) {
        const relationships = baseGrades.map((bg) => ({
            id: generateId('grade'),
            derivedGradeId: grade.id,
            baseGradeId: bg.gradeId,
            weight: bg.weight
        }));

        await prisma.gradeRelationship.createMany({
            data: relationships
        });
    }

    return grade;
};
