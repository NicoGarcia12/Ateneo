import { Router } from 'express';
import { AddClassHandler } from 'handlers/class/add-class-handler';
import { GetClassesBySubjectHandler } from 'handlers/class/get-classes-by-subject-handler';

const classRouter = Router();

classRouter.post('/add', AddClassHandler);
classRouter.get('/by-subject/:subjectId', GetClassesBySubjectHandler);

export default classRouter;
