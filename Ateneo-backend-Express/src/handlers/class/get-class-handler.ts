import { Request, Response } from 'express';
import { GetClassController } from 'src/controllers/class/get-class-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { classId } = req.params;
        const classData = await GetClassController({ classId });
        return res.status(200).json(classData);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
