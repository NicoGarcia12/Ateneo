import { Request, Response } from 'express';
import { LoginProfessorController } from '../../controllers/professor/login-professor-controller';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env['JWT_SECRET_KEY'];

export const LoginProfessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        const professor = await LoginProfessorController(email, password);

        if (!secretKey) {
            throw new Error('La clave secreta para JWT no está definida');
        }

        const token = jwt.sign(
            { id: professor.id, firstName: professor.firstName, lastName: professor.lastName, email: professor.email },
            secretKey,
            { expiresIn: '12m' }
        );

        return res.status(200).json({ token, professor });
    } catch (error: any) {
        if (error.message === 'No se pudo iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.') {
            return res.status(401).json({ message: error.message });
        }
        if (error.message === 'La clave secreta para JWT no está definida') {
            return res.status(500).json({ message: 'Error en la generación del token' });
        } else {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};
