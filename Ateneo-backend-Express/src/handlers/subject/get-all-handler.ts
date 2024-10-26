import { Request, Response } from 'express';
import { getAllSubjectsByIdProffessorController } from '../../controllers/subject/get-all-controller';
import dotenv from 'dotenv';

dotenv.config();

export const getAllSubjectsByIdProffessorHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idProffessor } = req.body;

        const subjects = await getAllSubjectsByIdProffessorController(idProffessor);

        return res.status(200).json({ subjects });
    } catch (error: any) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
