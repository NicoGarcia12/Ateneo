import { Request, Response } from 'express';
import { GetStudentController } from 'controllers/student/get-student-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { studentId } = req.params;

        const student = await GetStudentController(studentId);

        if (student) {
            const studentForResponse = {
                ...student,
                dni: student.dni.toString()
            };
            return res.status(200).json({ student: studentForResponse });
        }

        return res.status(200).json({ student });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
