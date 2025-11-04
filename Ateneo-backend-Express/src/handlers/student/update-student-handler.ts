import { Request, Response } from 'express';
import { UpdateStudentController } from 'src/controllers/student/update-student-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const UpdateStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const studentId = req.params['studentId'];
        const studentData = req.body;

        const updatedStudent = await UpdateStudentController({ studentId, ...studentData });

        const studentForResponse = {
            ...updatedStudent,
            dni: updatedStudent.dni.toString()
        };

        return res.status(200).json(studentForResponse);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
