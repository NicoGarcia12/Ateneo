import { Router } from 'express';
import { GetSubjectHandler } from '../../handlers/subject/get-subject-handler';
import { AddStudentToSubjectHandler } from '../../handlers/subject/add-student-to-subject-handler';
import { GetStudentsBySubjectHandler } from '../../handlers/subject/get-students-by-subject-handler';

const subjectRouter = Router();

subjectRouter.get('/:idSubject', GetSubjectHandler);
subjectRouter.post('/:idSubject/add-student/:idStudent', AddStudentToSubjectHandler);
subjectRouter.get('/:idSubject/students', GetStudentsBySubjectHandler);

export default subjectRouter;
