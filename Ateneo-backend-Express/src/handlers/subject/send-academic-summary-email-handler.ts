import { Request, Response } from 'express';
import { handleControllerError } from 'src/utils/error-handler';
import { SendAcademicSummaryEmailController } from 'src/controllers/subject/send-academic-summary-email-controller';

export const SendAcademicSummaryEmailHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId } = req.params;
        const { studentIds, professor } = req.body;
        const result = await SendAcademicSummaryEmailController({ subjectId, studentIds, professor });
        res.status(200).json(result);
    } catch (error: any) {
        handleControllerError(error, res);
    }
};
