import { Router } from 'express';
import { SignUpProfessorHandler } from 'src/handlers/professor/sign-up-professor-handler';
import { LoginProfessorHandler } from 'src/handlers/professor/login-professor-handler';
import { GetProfessorHandler } from 'src/handlers/professor/get-professor-handler';
import { GetProfessorByEmailHandler } from 'src/handlers/professor/get-professor-by-email-handler';
import { GetAllSubjectsByIdProfessorHandler } from 'src/handlers/subject/get-all-subjects-handler';
import { UpdateProfessorHandler } from 'src/handlers/professor/update-professor-handler';

const professorRouter = Router();

professorRouter.post('/login', LoginProfessorHandler);
professorRouter.post('/sign-up', SignUpProfessorHandler);
professorRouter.get('/:professorId', GetProfessorHandler);
professorRouter.get('/by-email/:email', GetProfessorByEmailHandler);
professorRouter.get('/:professorId/subjects', GetAllSubjectsByIdProfessorHandler);
professorRouter.put('/:professorId', UpdateProfessorHandler);

export default professorRouter;
