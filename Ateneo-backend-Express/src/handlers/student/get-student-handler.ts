import { Request, Response } from 'express';
import { GetStudentController } from '../../controllers/student/get-student-controller';

export const GetStudentHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idStudent } = req.params;

        const student = await GetStudentController(idStudent);

        return res.status(200).json({ student });
    } catch (error: any) {
        if (error.message === 'No existe un estudiante con ese id') {
            return res.status(404).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};
