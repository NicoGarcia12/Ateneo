import { Router } from 'express';
import professorRouter from 'src/routes/professor/index-professor-routes';
import subjectRouter from 'src/routes/subject/index-subject-routes';
import studentRouter from 'src/routes/student/index-student-routes';

const router = Router();

router.use('/professors', professorRouter);
router.use('/subjects', subjectRouter);
router.use('/students', studentRouter);

export default router;
