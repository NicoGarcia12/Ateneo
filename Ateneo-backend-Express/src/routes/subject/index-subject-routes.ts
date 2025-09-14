import { Router } from 'express';
import { GetSubjectHandler } from 'src/handlers/subject/get-subject-handler';
import { AddSubjectHandler } from 'src/handlers/subject/add-subject-handler';
import { AddStudentToSubjectHandler } from 'src/handlers/subject/add-student-to-subject-handler';
import { GetStudentsBySubjectHandler } from 'src/handlers/subject/get-students-by-subject-handler';

const subjectRouter = Router();
subjectRouter.post('/add', AddSubjectHandler);
subjectRouter.get('/:subjectId', GetSubjectHandler);
subjectRouter.post('/:subjectId/add-student/:studentId', AddStudentToSubjectHandler);
subjectRouter.get('/:subjectId/students', GetStudentsBySubjectHandler);

export default subjectRouter;
