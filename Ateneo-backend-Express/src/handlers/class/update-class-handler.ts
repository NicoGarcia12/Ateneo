import { Request, Response } from 'express';
import { UpdateClassController } from 'src/controllers/class/update-class-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { GetClassController } from '../../controllers/class/get-class-controller';

export const UpdateClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const classId = req.params['classId'];
        const classData = req.body;
        const message = await UpdateClassController({ classId, ...classData });
        const updatedClassData = await GetClassController({ classId });
        return res.status(200).json({ message, data: updatedClassData });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
