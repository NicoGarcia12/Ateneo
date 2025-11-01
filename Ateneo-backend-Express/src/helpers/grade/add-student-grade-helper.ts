import { prisma } from 'src/config/prisma';
import { generateId } from 'src/utils/generate-id';
import { GradeType } from '@prisma/client';
import { RecalculateDependentGradesHelper } from './recalculate-dependent-grades-helper';

export interface AddStudentGradeHelperParams {
    gradeId: string;
    studentId: string;
    value: number;
}

export const AddStudentGradeHelper = async (params: AddStudentGradeHelperParams) => {
    const { gradeId, studentId, value } = params;

    const grade = await prisma.grade.findUnique({
        where: { id: gradeId }
    });

    const existingGrade = await prisma.studentGrade.findFirst({
        where: {
            gradeId,
            studentId
        }
    });

    let studentGrade;

    if (existingGrade) {
        studentGrade = await prisma.studentGrade.update({
            where: { id: existingGrade.id },
            data: { value }
        });
    } else {
        studentGrade = await prisma.studentGrade.create({
            data: {
                id: generateId('grade'),
                gradeId,
                studentId,
                value
            }
        });
    }

    await RecalculateDependentGradesHelper(gradeId, studentId);

    return studentGrade;
};
