import { Router } from 'express';
import { GetAllSubjectsByIdProfessorHandler } from '../../handlers/subject/get-all-subjects-handler';
import { AddSubjectHandler } from '../../handlers/subject/add-subject-handler';

const subjectRouter = Router();

subjectRouter.get('/professor/:idProfessor', GetAllSubjectsByIdProfessorHandler);
subjectRouter.post('/professor/:idProfessor', AddSubjectHandler);

export default subjectRouter;
