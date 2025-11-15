import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';

export interface UpsertStudentGradeParams {
    gradeId: string;
    studentId: string;
    value: number;
}

export const UpsertStudentGradeHelper = async (params: UpsertStudentGradeParams): Promise<void> => {
    const { gradeId, studentId, value } = params;

    const existing = await prisma.studentGrade.findFirst({
        where: { gradeId, studentId }
    });

    if (existing) {
        await prisma.studentGrade.update({
            where: { id: existing.id },
            data: { value }
        });
    } else {
        await prisma.studentGrade.create({
            data: {
                id: generateId('grade'),
                gradeId,
                studentId,
                value
            }
        });
    }
};
