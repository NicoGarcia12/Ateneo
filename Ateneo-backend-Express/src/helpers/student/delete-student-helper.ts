import { prisma } from 'src/config/prisma';

export const DeleteStudentHelper = async (studentId: string): Promise<string> => {
    try {
        // Eliminar primero las notas del estudiante
        await prisma.studentGrade.deleteMany({ where: { studentId } });

        // Eliminar las inasistencias relacionadas
        await prisma.absence.deleteMany({ where: { studentId } });

        // Eliminar el estudiante (las relaciones con materias se eliminan automáticamente)
        await prisma.student.delete({ where: { id: studentId } });

        return 'Estudiante eliminado correctamente';
    } catch (error: any) {
        throw error;
    }
};
