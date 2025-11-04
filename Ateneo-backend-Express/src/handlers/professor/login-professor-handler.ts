import { Request, Response } from 'express';
import { LoginProfessorController } from 'src/controllers/professor/login-professor-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { InternalError } from 'src/utils/custom-errors';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env['JWT_SECRET_KEY'];

export const LoginProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        const professor = await LoginProfessorController({ email, password });

        if (!secretKey) {
            throw new InternalError('La clave secreta para JWT no está definida');
        }

        const token = jwt.sign(
            { id: professor?.id, firstName: professor?.firstName, lastName: professor?.lastName, email: professor?.email },
            secretKey,
            { expiresIn: '90d' }
        );

        return res.status(200).json(token);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
