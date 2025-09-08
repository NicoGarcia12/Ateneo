import { Request, Response } from 'express';
import { AddStudentToSubjectController } from 'controllers/subject/add-student-to-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const AddStudentToSubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idSubject, idStudent } = req.params;

        const response = await AddStudentToSubjectController(idStudent, idSubject);

        return res.status(200).json({ message: response });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
