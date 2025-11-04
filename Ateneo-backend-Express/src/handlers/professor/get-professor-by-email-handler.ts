import { Request, Response } from 'express';
import { GetProfessorByEmailController } from 'src/controllers/professor/get-professor-by-email-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetProfessorByEmailHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.params;

        const professor = await GetProfessorByEmailController({ email });

        return res.status(200).json(professor);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
