import { Request, Response } from 'express';
import { UpdateGradeController } from 'src/controllers/grade/update-grade-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { GetGradeController } from '../../controllers/grade/get-grade-controller';

export const UpdateGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name, date, description, baseGrades } = req.body;
        await UpdateGradeController({
            id,
            name,
            date: date ? new Date(date) : undefined,
            description,
            baseGrades
        });
        const updatedGrade = await GetGradeController(id);
        return res.status(200).json({ message: 'Nota actualizada correctamente', data: updatedGrade });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
