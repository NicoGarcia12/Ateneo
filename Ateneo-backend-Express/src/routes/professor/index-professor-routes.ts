import { Router } from 'express';
import { SignUpProfessorHandler } from '../../handlers/professor/sign-up-professor-handler';
import { LoginProfessorHandler } from '../../handlers/professor/login-professor-handler';

const professorRouter = Router();

professorRouter.post('/login', LoginProfessorHandler);
professorRouter.post('/sign-up', SignUpProfessorHandler);

export default professorRouter;
