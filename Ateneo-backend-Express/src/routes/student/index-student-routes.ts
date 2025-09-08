import { Router } from 'express';

import { GetStudentHandler } from 'handlers/student/get-student-handler';
import { AddStudentHandler } from 'handlers/student/add-student-handler';

const studentRouter = Router();

studentRouter.get('/:idStudent', GetStudentHandler);
studentRouter.post('/add-student', AddStudentHandler);

export default studentRouter;
