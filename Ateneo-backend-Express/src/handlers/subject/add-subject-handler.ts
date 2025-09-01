import { Request, Response } from 'express';
import { AddSubjectToProfessorController } from '../../controllers/subject/add-subject-controller';
import { handleControllerError } from '../../utils/error-handler';

export const AddSubjectToProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idProfessor } = req.body;
        const { academicYear, name, institution, degree } = req.body.subject;

        const response = await AddSubjectToProfessorController(idProfessor, academicYear, name, institution, degree);

        return res.status(200).json({ message: response });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
