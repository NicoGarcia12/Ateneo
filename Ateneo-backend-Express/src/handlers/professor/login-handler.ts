import { Professor } from '@prisma/client';
import { Request, Response } from 'express';
import { LoginController } from '../../controllers/professor/login-controller';

export const LoginHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        const professor: Professor = await LoginController(email, password);

        return res.status(200).json(professor);
    } catch (error: any) {
        if (error.message === 'Professor not found') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'Incorrect password') {
            return res.status(401).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
