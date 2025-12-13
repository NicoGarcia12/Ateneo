import { Request, Response } from 'express';
import { DeleteSubjectController } from 'src/controllers/subject/delete-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const DeleteSubjectHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId } = req.params;
        await DeleteSubjectController({ subjectId });
        res.status(200).json({ message: 'Materia eliminada correctamente' });
    } catch (error) {
        handleControllerError(error, res);
    }
};
