import { Request, Response } from 'express';
import { AddClassController } from 'src/controllers/class/add-class-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { ValidationError } from 'src/utils/custom-errors';

export const AddClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { date, description, subjectId, absentStudents } = req.body;
        if (!date || !subjectId) {
            throw new ValidationError('Faltan campos obligatorios');
        }
        const classCreated = await AddClassController({ date, description, subjectId, absentStudents });
            return res.status(201).json({
                message: 'Clase creada correctamente',
                data: classCreated
            });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
