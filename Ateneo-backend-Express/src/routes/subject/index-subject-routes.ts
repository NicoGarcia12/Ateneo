import { Router } from 'express';
import { GetAllSubjectsByIdProfessorHandler } from '../../handlers/subject/get-all-subjects-handler';
import { AddSubjectHandler } from '../../handlers/subject/add-subject-handler';
import { GetSubjectHandler } from '../../handlers/subject/get-subject-handler';

const subjectRouter = Router();

subjectRouter.get('/professor/:idProfessor', GetAllSubjectsByIdProfessorHandler);
subjectRouter.post('/professor/:idProfessor', AddSubjectHandler);
subjectRouter.get('/:idSubject', GetSubjectHandler);

export default subjectRouter;
