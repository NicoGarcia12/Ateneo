import { prisma } from 'src/config/prisma';

export const GetProfessorHelper = async (idProfessor: string) => {
    try {
        const professor = await prisma.professor.findUnique({
            where: { id: idProfessor },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                emailActivated: true
            }
        });
        return professor;
    } catch (error: any) {
        throw error;
    }
};
