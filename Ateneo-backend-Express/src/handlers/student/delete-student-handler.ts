import { Request, Response } from 'express';
import { DeleteStudentController } from 'src/controllers/student/delete-student-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const DeleteStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const studentId = req.params['studentId'];

        const message = await DeleteStudentController(studentId);

        return res.status(200).json({ message });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
