import { Response } from 'express';

export const handleControllerError = (error: any, res: Response): Response => {
    const statusCode = error.statusCode || 500;

    const message = statusCode === 500 ? 'Error interno del servidor' : error.message;

    return res.status(statusCode).json({ message });
};
