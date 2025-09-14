import { prisma } from 'src/config/prisma';

export const GetProfessorByEmailHelper = async (email: string) => {
    try {
        const professor = await prisma.professor.findUnique({
            where: { email },
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
