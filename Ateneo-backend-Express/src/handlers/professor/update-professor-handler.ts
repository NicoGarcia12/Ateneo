import { Request, Response } from 'express';
import { UpdateProfessorController } from 'src/controllers/professor/update-professor-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const UpdateProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { professorId } = req.params;
        const { firstName, lastName, password, resetPassword } = req.body;
        await UpdateProfessorController({ professorId, firstName, lastName, password, resetPassword });
        return res.status(200).json({ message: 'Profesor actualizado correctamente' });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
