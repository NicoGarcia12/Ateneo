import { Router } from 'express';
import { SignUpProfessorHandler } from 'handlers/professor/sign-up-professor-handler';
import { LoginProfessorHandler } from 'handlers/professor/login-professor-handler';
import { GetAllSubjectsByIdProfessorHandler } from 'handlers/subject/get-all-subjects-handler';

const professorRouter = Router();

professorRouter.post('/login', LoginProfessorHandler);
professorRouter.post('/sign-up', SignUpProfessorHandler);
professorRouter.get('/:idProfessor/subjects', GetAllSubjectsByIdProfessorHandler);

export default professorRouter;
