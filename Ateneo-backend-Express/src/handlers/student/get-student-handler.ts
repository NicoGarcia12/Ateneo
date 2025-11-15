import { Request, Response } from 'express';
import { GetStudentController } from 'src/controllers/student/get-student-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export const GetStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { studentId } = req.params;
        const student = await GetStudentController({ studentId });
        return res.status(200).json(student);
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
