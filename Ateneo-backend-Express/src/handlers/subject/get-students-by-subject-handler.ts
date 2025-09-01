import { Request, Response } from 'express';
import { GetStudentsBySubjectController } from '../../controllers/subject/get-students-by-subject-controller';
import { handleControllerError } from '../../utils/error-handler';

export const GetStudentsBySubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idSubject } = req.params;
        const students = await GetStudentsBySubjectController(idSubject);
        return res.status(200).json({ students });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
