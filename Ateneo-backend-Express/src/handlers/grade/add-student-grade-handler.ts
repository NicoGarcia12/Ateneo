import { Request, Response } from 'express';
import { AddStudentGradeController } from 'src/controllers/grade/add-student-grade-controller';
import { ValidationError } from 'src/utils/custom-errors';
import { handleControllerError } from 'src/utils/error-handler';

export const AddStudentGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { gradeId, studentId } = req.params;
        const { value } = req.body;

        if (value === undefined) {
            throw new ValidationError('El valor de la nota es obligatorio');
        }

        if (value !== null) {
            const numValue = parseFloat(value);
            
            if (isNaN(numValue)) {
                throw new ValidationError('El valor de la nota debe ser un número válido');
            }
            
            if (numValue < 1 || numValue > 10) {
                throw new ValidationError('El valor de la nota debe estar entre 1 y 10');
            }
        }

        const studentGrade = await AddStudentGradeController({
            gradeId,
            studentId,
            value: value === null ? null : parseFloat(value)
        });
        return res.status(201).json({
            message: 'Nota de alumno agregada correctamente',
            data: studentGrade
        });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
