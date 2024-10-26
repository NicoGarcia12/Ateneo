import { Router } from 'express';
import { getAllSubjectsByIdProffessorHandler } from '../../handlers/subject/get-all-handler';

const subjectRouter = Router();

subjectRouter.get('', getAllSubjectsByIdProffessorHandler)


export default subjectRouter;
