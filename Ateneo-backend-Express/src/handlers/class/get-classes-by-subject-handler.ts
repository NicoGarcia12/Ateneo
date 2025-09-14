import { Request, Response } from 'express';
import { GetClassesBySubjectController } from 'src/controllers/class/get-classes-by-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetClassesBySubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { subjectId } = req.params;

        const classes = await GetClassesBySubjectController({ subjectId });

        return res.status(200).json({ classes });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
