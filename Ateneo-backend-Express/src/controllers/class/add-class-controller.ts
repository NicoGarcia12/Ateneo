import { AddClassHelper } from 'helpers/class/add-class-helper';
import { ConflictError } from 'src/utils/custom-errors';
import { GetSubjectController } from 'controllers/subject/get-subject-controller';
import { GetClassesBySubjectHelper } from 'src/helpers/class/get-classes-by-subject-helper';

interface AddClassParams {
    date: string;
    description?: string;
    subjectId: string;
}

function normalizeToDayMonthYear(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const AddClassController = async (params: AddClassParams): Promise<string> => {
    const { date, subjectId } = params;

    await GetSubjectController(subjectId);

    const classes = await GetClassesBySubjectHelper(subjectId);
    const newDateNorm = normalizeToDayMonthYear(date);
    if (classes.some((c) => normalizeToDayMonthYear(c.date) === newDateNorm)) {
        throw new ConflictError('Ya existe una clase para ese día y materia');
    }

    return await AddClassHelper(params);
};
