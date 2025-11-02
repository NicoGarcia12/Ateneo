import { Request, Response } from 'express';
import { AddSubjectController } from 'src/controllers/subject/add-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { ValidationError } from 'src/utils/custom-errors';

export const AddSubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { academicYear, name, institution, degree } = req.body;
        if (!academicYear || !name || !institution || !degree) {
            throw new ValidationError('Faltan campos obligatorios');
        }
        const professorId = req.query['professorId'] as string | undefined;
        const response = await AddSubjectController({ academicYear, name, institution, degree, professorId });
        return res.status(200).json({ message: response });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
