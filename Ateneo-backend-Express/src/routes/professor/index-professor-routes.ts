import { Router } from 'express';
import { SignUpProfessorHandler } from 'src/handlers/professor/sign-up-professor-handler';
import { LoginProfessorHandler } from 'src/handlers/professor/login-professor-handler';
import { GetProfessorHandler } from 'src/handlers/professor/get-professor-handler';
import { GetProfessorByEmailHandler } from 'src/handlers/professor/get-professor-by-email-handler';
import { GetAllSubjectsByIdProfessorHandler } from 'src/handlers/subject/get-all-subjects-handler';
import { UpdateProfessorHandler } from 'src/handlers/professor/update-professor-handler';
import { RequestPasswordResetHandler } from 'src/handlers/professor/request-password-reset-handler';
import { VerifyResetCodeHandler } from 'src/handlers/professor/verify-reset-code-handler';
import { ResetPasswordHandler } from 'src/handlers/professor/reset-password-handler';

const professorRouter = Router();

professorRouter.post('/login', LoginProfessorHandler);
professorRouter.post('/sign-up', SignUpProfessorHandler);
professorRouter.post('/request-password-reset', RequestPasswordResetHandler);
professorRouter.post('/verify-reset-code', VerifyResetCodeHandler);
professorRouter.post('/reset-password', ResetPasswordHandler);
professorRouter.get('/:professorId', GetProfessorHandler);
professorRouter.get('/by-email/:email', GetProfessorByEmailHandler);
professorRouter.get('/:professorId/subjects', GetAllSubjectsByIdProfessorHandler);
professorRouter.put('/:professorId', UpdateProfessorHandler);

export default professorRouter;
