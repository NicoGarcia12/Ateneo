import { Request, Response } from 'express';
import { GetStudentsBySubjectController } from 'src/controllers/student/get-students-by-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetStudentsBySubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { subjectId } = req.params;

        const students = await GetStudentsBySubjectController({ subjectId });

        return res.status(200).json(students);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
