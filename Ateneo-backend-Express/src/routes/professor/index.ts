import { Router } from 'express';
import { loginHandler } from '../../handlers/professor/loginHandler';

const professorRouter = Router();

professorRouter.post('/', loginHandler);

export default professorRouter;
