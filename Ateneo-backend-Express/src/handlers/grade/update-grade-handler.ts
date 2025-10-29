import { Request, Response } from 'express';
import { UpdateGradeController } from 'src/controllers/grade/update-grade-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const UpdateGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name, date, description, baseGrades } = req.body;

        const grade = await UpdateGradeController({
            id,
            name,
            date: date ? new Date(date) : undefined,
            description,
            baseGrades
        });

        return res.status(200).json({ grade });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
