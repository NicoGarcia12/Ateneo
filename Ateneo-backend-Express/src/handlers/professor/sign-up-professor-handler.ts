import { Request, Response } from 'express';
import { SignUpProfessorController } from 'controllers/professor/sign-up-professor-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const SignUpProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, firstName, lastName, password } = req.body;

        const response = await SignUpProfessorController(email, password, firstName, lastName);

        return res.status(200).json({ message: response });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
