import { Request, Response } from 'express';
import { GetAllSubjectsByIdProfessorController } from '../../controllers/subject/get-all-subjects-controller';
import { GetSubjectController } from '../../controllers/subject/get-subject-controller';
import { handleControllerError } from '../../utils/error-handler';

export const GetSubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idSubject } = req.params;

        const subject = await GetSubjectController(idSubject);

        return res.status(200).json({ subject });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
