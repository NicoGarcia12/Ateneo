import { Request, Response } from 'express';
import { GetAllSubjectsByIdProfessorController } from '../../controllers/subject/get-all-subjects-controller';
import { GetSubjectController } from '../../controllers/subject/get-subject-controller';

export const GetSubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idSubject } = req.params;

        const subject = await GetSubjectController(idSubject);

        if (!subject) {
            throw new Error('No existe una materia con ese id');
        }

        return res.status(200).json({ subject });
    } catch (error: any) {
        if (error.message === 'No existe una materia con ese id') {
            return res.status(404).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};
