import { Request, Response } from 'express';
import { handleControllerError } from 'src/utils/error-handler';
import { AddStudentController } from 'src/controllers/student/add-student-controller';
import { ValidationError } from 'src/utils/custom-errors';

export const AddStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, dni, email, phone } = req.body;
        if (!firstName || !lastName || !dni || !email) {
            throw new ValidationError('Faltan campos obligatorios');
        }
        const subjectId = typeof req.query['subjectId'] === 'string' ? req.query['subjectId'] : undefined;
        const student = await AddStudentController({ firstName, lastName, dni, email, phone, subjectId });
        const studentForResponse = {
            ...student,
            dni: student.dni.toString()
        };
            return res.status(201).json({
                message: 'Alumno creado correctamente',
                data: studentForResponse
            });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
