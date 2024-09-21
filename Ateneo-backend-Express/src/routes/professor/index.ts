import { Router } from 'express';
import { getProfessorByEmailPasswordHandler } from '../../handlers/professor//get-professor-email-password-handler';

const professorRouter = Router();

professorRouter.get('/', getProfessorByEmailPasswordHandler);

export default professorRouter;
