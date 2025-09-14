import { Request, Response } from 'express';
import { UpdateClassController } from 'src/controllers/class/update-class-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const UpdateClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const classId = req.params['classId'];
        const classData = req.body;
        const updatedClass = await UpdateClassController({ classId, ...classData });
        return res.status(200).json(updatedClass);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
