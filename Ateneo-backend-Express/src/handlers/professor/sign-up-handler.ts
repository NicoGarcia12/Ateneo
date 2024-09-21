import { Request, Response } from 'express';
import { SignUpController } from '../../controllers/professor/sign-up-controller';

export const SignUpHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, firstName, lastName, password } = req.body;

        const response = await SignUpController(email, password, firstName, lastName);

        return res.status(200).json({ message: response });
    } catch (error: any) {
        if (error.message === 'Error registering professor: Email already exists') {
            return res.status(409).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
