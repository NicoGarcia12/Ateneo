import { Router } from 'express';
import { SignUpProfessorHandler } from 'handlers/professor/sign-up-professor-handler';
import { LoginProfessorHandler } from 'handlers/professor/login-professor-handler';
import { GetProfessorHandler } from 'handlers/professor/get-professor-handler';
import { GetProfessorByEmailHandler } from 'handlers/professor/get-professor-by-email-handler';
import { GetAllSubjectsByIdProfessorHandler } from 'handlers/subject/get-all-subjects-handler';

const professorRouter = Router();

professorRouter.post('/login', LoginProfessorHandler);
professorRouter.post('/sign-up', SignUpProfessorHandler);
professorRouter.get('/:professorId', GetProfessorHandler);
professorRouter.get('/by-email/:email', GetProfessorByEmailHandler);
professorRouter.get('/:professorId/subjects', GetAllSubjectsByIdProfessorHandler);

export default professorRouter;
