import { Request, Response } from 'express';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetSubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { subjectId } = req.params;

        const subject = await GetSubjectController({ subjectId });

        return res.status(200).json({ subject });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
