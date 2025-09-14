import { Request, Response } from 'express';
import { handleControllerError } from 'src/utils/error-handler';
import { AddStudentController } from 'src/controllers/student/add-student-controller';

export const AddStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, dni, email, phone } = req.body;

        const subjectId = typeof req.query['subjectId'] === 'string' ? req.query['subjectId'] : undefined;

        const student = await AddStudentController({ firstName, lastName, dni, email, phone, subjectId });

        const studentForResponse = {
            ...student,
            dni: student.dni.toString()
        };

        return res.status(201).json({ student: studentForResponse });
    } catch (error: any) {
        console.log('Error en AddStudentHandler:', error);
        return handleControllerError(error, res);
    }
};
