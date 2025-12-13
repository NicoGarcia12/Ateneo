import { Router } from 'express';
import { GetSubjectHandler } from 'src/handlers/subject/get-subject-handler';
import { AddSubjectHandler } from 'src/handlers/subject/add-subject-handler';
import { AddStudentToSubjectHandler } from 'src/handlers/subject/add-student-to-subject-handler';
import { GenerateAcademicSummaryPDFHandler } from 'src/handlers/subject/generate-academic-summary-pdf-handler';
import { SendAcademicSummaryEmailHandler } from 'src/handlers/subject/send-academic-summary-email-handler';
import { RemoveStudentFromSubjectHandler } from 'src/handlers/subject/remove-student-from-subject-handler';

const subjectRouter = Router();
subjectRouter.post('/add', AddSubjectHandler);
subjectRouter.get('/:subjectId', GetSubjectHandler);
subjectRouter.post('/:subjectId/add-student/:studentId', AddStudentToSubjectHandler);
subjectRouter.delete('/:subjectId/remove-student/:studentId', RemoveStudentFromSubjectHandler);
subjectRouter.post('/:subjectId/generate-academic-summary-pdf', GenerateAcademicSummaryPDFHandler);
subjectRouter.post('/:subjectId/send-academic-summary-email', SendAcademicSummaryEmailHandler);

export default subjectRouter;
