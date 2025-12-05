import { Router } from 'express';
import { GetSubjectHandler } from 'src/handlers/subject/get-subject-handler';
import { AddSubjectHandler } from 'src/handlers/subject/add-subject-handler';
import { AddStudentToSubjectHandler } from 'src/handlers/subject/add-student-to-subject-handler';
import { GenerateAcademicSummaryHandler } from 'src/handlers/subject/generate-academic-summary-handler';

const subjectRouter = Router();
subjectRouter.post('/add', AddSubjectHandler);
subjectRouter.get('/:subjectId', GetSubjectHandler);
subjectRouter.post('/:subjectId/add-student/:studentId', AddStudentToSubjectHandler);
subjectRouter.post('/:subjectId/generate-academic-summary', GenerateAcademicSummaryHandler);

export default subjectRouter;
