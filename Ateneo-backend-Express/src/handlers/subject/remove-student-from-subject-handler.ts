import { Request, Response } from 'express';
import { RemoveStudentFromSubjectController } from 'src/controllers/subject/remove-student-from-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const RemoveStudentFromSubjectHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId, studentId } = req.params;

        await RemoveStudentFromSubjectController({
            subjectId,
            studentId
        });

        res.status(200).json({ message: 'Estudiante eliminado de la materia correctamente' });
    } catch (error) {
        handleControllerError(error, res);
    }
};
