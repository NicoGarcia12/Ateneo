import { Request, Response } from 'express';
import { UpdateSubjectController } from 'src/controllers/subject/update-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const UpdateSubjectHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId } = req.params;
        const { name, academicYear, institution, degree } = req.body;
        await UpdateSubjectController({ subjectId, name, academicYear, institution, degree });
        res.status(200).json({ message: 'Materia actualizada correctamente' });
    } catch (error) {
        handleControllerError(error, res);
    }
};
