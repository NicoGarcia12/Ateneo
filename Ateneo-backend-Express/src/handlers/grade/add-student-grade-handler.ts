import { Request, Response } from 'express';
import { AddStudentGradeController } from 'src/controllers/grade/add-student-grade-controller';
import { ValidationError } from 'src/utils/custom-errors';
import { handleControllerError } from 'src/utils/error-handler';

export const AddStudentGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { gradeId, studentId } = req.params;
        const { value } = req.body;

        if (value === undefined || value === null) {
            throw new ValidationError('El valor de la nota es obligatorio');
        }

        const studentGrade = await AddStudentGradeController({
            gradeId,
            studentId,
            value: parseFloat(value)
        });

        return res.status(201).json({ studentGrade });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
