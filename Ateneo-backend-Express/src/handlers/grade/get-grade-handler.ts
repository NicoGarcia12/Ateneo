import { Request, Response } from 'express';
import { GetGradeController } from 'src/controllers/grade/get-grade-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export const GetGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const grade = await GetGradeController(id);

        return res.status(200).json({ grade: convertBigIntToString(grade) });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
