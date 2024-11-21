import { Router } from 'express';
import { GetSubjectHandler } from '../../handlers/subject/get-subject-handler';

const subjectRouter = Router();

subjectRouter.get('/:idSubject', GetSubjectHandler);

export default subjectRouter;
