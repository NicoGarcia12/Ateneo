import { Router } from 'express';
import { GetSubjectHandler } from '../../handlers/subject/get-subject-handler';
import { AddStudentToSubjectHandler } from '../../handlers/subject/add-student-to-subject-handler';

const subjectRouter = Router();

subjectRouter.get('/:idSubject', GetSubjectHandler);
subjectRouter.post('/:idSubject/add-student/:idStudent', AddStudentToSubjectHandler);

export default subjectRouter;
