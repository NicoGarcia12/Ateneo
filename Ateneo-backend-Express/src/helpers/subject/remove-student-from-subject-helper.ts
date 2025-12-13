import { prisma } from 'src/config/prisma';

export const RemoveStudentFromSubjectHelper = async (studentId: string, subjectId: string): Promise<void> => {
    await prisma.$transaction(async (transaction) => {
        const subjectClasses = await transaction.class.findMany({
            where: { subjectId },
            select: { id: true }
        });

        const classIds = subjectClasses.map((classItem) => classItem.id);

        await transaction.absence.deleteMany({
            where: {
                studentId,
                classId: { in: classIds }
            }
        });

        const subjectGrades = await transaction.grade.findMany({
            where: { subjectId },
            select: { id: true }
        });

        const gradeIds = subjectGrades.map((grade) => grade.id);

        await transaction.studentGrade.deleteMany({
            where: {
                studentId,
                gradeId: { in: gradeIds }
            }
        });

        await transaction.subject.update({
            where: { id: subjectId },
            data: {
                students: {
                    disconnect: { id: studentId }
                }
            }
        });
    });
};
