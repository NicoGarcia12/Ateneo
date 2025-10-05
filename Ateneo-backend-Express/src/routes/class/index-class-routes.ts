import { Router } from 'express';
import { AddClassHandler } from 'src/handlers/class/add-class-handler';
import { GetClassesBySubjectHandler } from 'src/handlers/class/get-classes-by-subject-handler';
import { GetClassHandler } from 'src/handlers/class/get-class-handler';
import { UpdateClassHandler } from 'src/handlers/class/update-class-handler';
import { DeleteClassHandler } from 'src/handlers/class/delete-class-handler';

const classRouter = Router();

classRouter.post('/add', AddClassHandler);
classRouter.get('/by-subject/:subjectId', GetClassesBySubjectHandler);
classRouter.get('/:classId', GetClassHandler);
classRouter.put('/:classId', UpdateClassHandler);
classRouter.delete('/:classId', DeleteClassHandler);

export default classRouter;
