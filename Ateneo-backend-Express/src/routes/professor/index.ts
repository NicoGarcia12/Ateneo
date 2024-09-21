import { Router } from 'express';
import { SignUpHandler } from '../../handlers/professor/sign-up-handler';
import { LoginHandler } from '../../handlers/professor/login-handler';

const professorRouter = Router();

professorRouter.post('/login', LoginHandler);
professorRouter.post('/sign-up', SignUpHandler);

export default professorRouter;
