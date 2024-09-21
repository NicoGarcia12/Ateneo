import { Router } from 'express';
import professorRouter from './professor';

const router = Router();

router.use('/professors', professorRouter);

export default router;
