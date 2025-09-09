import { Router } from 'express';
import professorRouter from 'src/routes/professor/index-professor-routes';
import subjectRouter from 'src/routes/subject/index-subject-routes';
import studentRouter from 'src/routes/student/index-student-routes';
import classRouter from 'src/routes/class/index-class-routes';

const router = Router();

router.use('/professors', professorRouter);
router.use('/subjects', subjectRouter);
router.use('/students', studentRouter);
router.use('/classes', classRouter);

export default router;
