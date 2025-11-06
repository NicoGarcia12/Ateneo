import { Request, Response } from 'express';
import { UpdateStudentController } from 'src/controllers/student/update-student-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { GetStudentController } from '../../controllers/student/get-student-controller';

export const UpdateStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const studentId = req.params['studentId'];
        const studentData = req.body;
        await UpdateStudentController({ studentId, ...studentData });
        const updatedStudent = await GetStudentController({ studentId });
        return res.status(200).json({ message: 'Estudiante actualizado correctamente', data: updatedStudent });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
