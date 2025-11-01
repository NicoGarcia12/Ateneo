import { Router } from 'express';
import { AddGradeHandler } from 'src/handlers/grade/add-grade-handler';
import { UpdateGradeHandler } from 'src/handlers/grade/update-grade-handler';
import { DeleteGradeHandler } from 'src/handlers/grade/delete-grade-handler';
import { GetGradesBySubjectHandler } from 'src/handlers/grade/get-grades-by-subject-handler';
import { AddStudentGradeHandler } from 'src/handlers/grade/add-student-grade-handler';
import { GetGradeHandler } from 'src/handlers/grade/get-grade-handler';

const gradeRouter = Router();

gradeRouter.post('/:gradeId/student/:studentId', AddStudentGradeHandler);
gradeRouter.post('/add', AddGradeHandler);
gradeRouter.put('/:id', UpdateGradeHandler);
gradeRouter.get('/by-subject/:subjectId', GetGradesBySubjectHandler);
gradeRouter.get('/:id', GetGradeHandler);
gradeRouter.delete('/:id', DeleteGradeHandler);

export default gradeRouter;
