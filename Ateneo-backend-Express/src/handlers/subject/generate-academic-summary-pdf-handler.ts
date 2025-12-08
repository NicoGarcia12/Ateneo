import { Request, Response } from 'express';
import { GenerateAcademicSummaryPDFController } from 'src/controllers/subject/generate-academic-summary-pdf-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GenerateAcademicSummaryPDFHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId } = req.params;
        const { studentIds } = req.body;
        const result = await GenerateAcademicSummaryPDFController({ subjectId, studentIds });
        res.status(200).json(result);
    } catch (error: any) {
        handleControllerError(error, res);
    }
};
