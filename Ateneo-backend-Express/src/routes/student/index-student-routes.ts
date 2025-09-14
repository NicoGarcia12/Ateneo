import { Router } from 'express';

import { GetStudentHandler } from 'src/handlers/student/get-student-handler';
import { AddStudentHandler } from 'src/handlers/student/add-student-handler';
import { GetStudentsBySubjectHandler } from 'src/handlers/student/get-students-by-subject-handler';
import { GetStudentByDniHandler } from 'src/handlers/student/get-student-by-dni-handler';

const studentRouter = Router();

studentRouter.get('/:studentId', GetStudentHandler);
studentRouter.post('/add', AddStudentHandler);
studentRouter.get('/by-subject/:subjectId', GetStudentsBySubjectHandler);
studentRouter.get('/by-dni/:dni', GetStudentByDniHandler);

export default studentRouter;
