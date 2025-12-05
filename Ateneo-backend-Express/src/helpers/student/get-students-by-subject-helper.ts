import { Student } from '@prisma/client';
import { prisma } from 'src/config/prisma';

export const GetStudentsBySubjectHelper = async (idSubject: string): Promise<Student[]> => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: idSubject },
            include: {
                students: {
                    include: {
                        absences: {
                            where: {
                                class: {
                                    subjectId: idSubject
                                }
                            }
                        },
                        studentGrades: {
                            include: {
                                grade: true
                            },
                            where: {
                                grade: {
                                    subjectId: idSubject
                                }
                            }
                        }
                    }
                }
            }
        });

        return subject?.students ?? [];
    } catch (error: any) {
        throw error;
    }
};
