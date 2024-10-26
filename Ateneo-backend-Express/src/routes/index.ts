import { Router } from 'express';
import professorRouter from './professor';
import subjectRouter from './subject';

const router = Router();

router.use('/professors', professorRouter);
router.use('/subjects', subjectRouter);

export default router;
