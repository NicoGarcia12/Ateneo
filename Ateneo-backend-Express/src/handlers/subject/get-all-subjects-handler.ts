import { Request, Response } from 'express';
import { GetAllSubjectsByIdProfessorController } from 'controllers/subject/get-all-subjects-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetAllSubjectsByIdProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idProfessor } = req.params;

        const subjects = await GetAllSubjectsByIdProfessorController(idProfessor);

        return res.status(200).json({ subjects });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
