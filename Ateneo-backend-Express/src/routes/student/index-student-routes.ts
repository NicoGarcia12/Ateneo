import { Router } from 'express';
import { GetStudentHandler } from '../../handlers/student/get-student-handler';

const studentRouter = Router();

studentRouter.get('/:idStudent', GetStudentHandler);

export default studentRouter;
