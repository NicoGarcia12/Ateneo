import { Router } from 'express';
import proffesorRouter from './professor';

const router = Router();

router.use('/proffesors', proffesorRouter);

module.exports = router;
