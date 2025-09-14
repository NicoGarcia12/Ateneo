import { Request, Response } from 'express';
import { GetAllSubjectsByIdProfessorController } from 'src/controllers/subject/get-all-subjects-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetAllSubjectsByIdProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { professorId } = req.params;

        const subjects = await GetAllSubjectsByIdProfessorController({ professorId });

        return res.status(200).json({ subjects });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
