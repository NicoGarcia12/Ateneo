import { Request, Response } from 'express';
import { SignUpProfessorController } from 'src/controllers/professor/sign-up-professor-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { ValidationError } from 'src/utils/custom-errors';

export const SignUpProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, firstName, lastName, password } = req.body;
        if (!email || !firstName || !lastName || !password) {
            throw new ValidationError('Faltan campos obligatorios');
        }
        const professor = await SignUpProfessorController({ email, password, firstName, lastName });

        return res.status(200).json(professor);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
