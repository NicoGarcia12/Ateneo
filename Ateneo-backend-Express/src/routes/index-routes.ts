import { Router } from 'express';
import professorRouter from './professor/index-professor-routes';
import subjectRouter from './subject/index-subject-routes';

const router = Router();

router.use('/professors', professorRouter);
router.use('/subjects', subjectRouter);

export default router;
