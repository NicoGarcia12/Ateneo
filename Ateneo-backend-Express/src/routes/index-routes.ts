import { Router } from 'express';
import professorRouter from 'src/routes/professor/index-professor-routes';
import subjectRouter from 'src/routes/subject/index-subject-routes';
import studentRouter from 'src/routes/student/index-student-routes';
import classRouter from 'src/routes/class/index-class-routes';
import gradeRouter from 'src/routes/grade/index-grade-routes';

const router = Router();

router.use('/professors', professorRouter);
router.use('/subjects', subjectRouter);
router.use('/students', studentRouter);
router.use('/classes', classRouter);
router.use('/grades', gradeRouter);

export default router;
