import { Request, Response } from 'express';
import { GetAllSubjectsByIdProfessorController } from '../../controllers/subject/get-all-subjects-controller';

export const GetAllSubjectsByIdProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idProfessor } = req.params;

        const subjects = await GetAllSubjectsByIdProfessorController(idProfessor);

        return res.status(200).json({ subjects });
    } catch (error: any) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
