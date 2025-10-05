import { Request, Response } from 'express';
import { DeleteClassController } from 'src/controllers/class/delete-class-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const DeleteClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const classId = req.params['classId'];

        const message = await DeleteClassController(classId);

        return res.status(200).json({ message });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
