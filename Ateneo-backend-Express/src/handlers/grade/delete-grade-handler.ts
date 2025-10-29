import { Request, Response } from 'express';
import { DeleteGradeController } from 'src/controllers/grade/delete-grade-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const DeleteGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        await DeleteGradeController({ id });

        return res.status(200).json({ message: 'Nota eliminada correctamente' });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
