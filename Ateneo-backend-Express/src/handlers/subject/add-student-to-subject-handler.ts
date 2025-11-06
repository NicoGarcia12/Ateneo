import { Request, Response } from 'express';
import { AddStudentToSubjectController } from 'src/controllers/subject/add-student-to-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const AddStudentToSubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { subjectId, studentId } = req.params;

        const student = await AddStudentToSubjectController({ studentId, subjectId });

        const studentForResponse = {
            ...student,
            dni: student.dni.toString()
        };
            return res.status(200).json({
                message: 'Alumno agregado a la materia correctamente',
                data: studentForResponse
            });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
