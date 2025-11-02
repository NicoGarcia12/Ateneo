import { Request, Response } from 'express';
import { GradeType } from '@prisma/client';
import { AddGradeController } from 'src/controllers/grade/add-grade-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { ValidationError } from 'src/utils/custom-errors';

export const AddGradeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, type, date, description, subjectId, baseGrades } = req.body;

        if (!name || !type || !date || !subjectId) {
            throw new ValidationError('Faltan campos obligatorios');
        }

        if (!Object.values(GradeType).includes(type)) {
            throw new ValidationError('Tipo de nota inválido');
        }

        const grade = await AddGradeController({
            name,
            type,
            date: new Date(date),
            description,
            subjectId,
            baseGrades
        });

        return res.status(201).json({ grade });
    } catch (error) {
        return handleControllerError(error, res);
    }
};
