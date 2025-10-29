import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

export interface UpdateGradeHelperParams {
    id: string;
    name?: string;
    date?: Date;
    description?: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}

export const UpdateGradeHelper = async (params: UpdateGradeHelperParams) => {
    const { id, name, date, description, baseGrades } = params;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (date !== undefined) updateData.date = date;
    if (description !== undefined) updateData.description = description;

    const grade = await prisma.grade.update({
        where: { id },
        data: updateData,
        include: {
            derivedGradeRel: true,
            baseGradeRel: true
        }
    });

    if (baseGrades !== undefined) {
        await prisma.gradeRelationship.deleteMany({
            where: { derivedGradeId: id }
        });

        if (baseGrades.length > 0) {
            const relationships = baseGrades.map((bg) => ({
                id: generateId('grade'),
                derivedGradeId: id,
                baseGradeId: bg.gradeId,
                weight: bg.weight
            }));

            await prisma.gradeRelationship.createMany({
                data: relationships
            });
        }
    }

    return grade;
};
