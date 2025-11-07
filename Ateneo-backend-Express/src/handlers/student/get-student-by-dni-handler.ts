import { Request, Response } from 'express';
import { GetStudentByDniController } from 'src/controllers/student/get-student-by-dni-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export const GetStudentByDniHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { dni } = req.params;

        const student = await GetStudentByDniController({ dni });

        const studentForResponse = {
            ...student,
            dni: student.dni.toString()
        };

        return res.status(200).json(convertBigIntToString(studentForResponse));
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
