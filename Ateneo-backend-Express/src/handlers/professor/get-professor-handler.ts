import { Request, Response } from 'express';
import { GetProfessorController } from 'controllers/professor/get-professor-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { professorId } = req.params;

        const professor = await GetProfessorController(professorId);

        return res.status(200).json({ professor });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
