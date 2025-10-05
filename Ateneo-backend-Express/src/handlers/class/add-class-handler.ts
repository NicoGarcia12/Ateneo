import { Request, Response } from 'express';
import { AddClassController } from 'src/controllers/class/add-class-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const AddClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { date, description, subjectId, absentStudents } = req.body;

        const response = await AddClassController({ date, description, subjectId, absentStudents });

        return res.status(201).json({ message: response });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
