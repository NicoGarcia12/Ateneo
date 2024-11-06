import { Router } from 'express';
import { GetAllSubjectsByIdProfessorHandler } from '../../handlers/subject/get-all-subjects-handler';

const subjectRouter = Router();

subjectRouter.get('/professor/:idProfessor', GetAllSubjectsByIdProfessorHandler);

export default subjectRouter;
