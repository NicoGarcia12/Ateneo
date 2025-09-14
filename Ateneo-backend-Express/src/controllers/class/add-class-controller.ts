import { AddClassHelper } from 'src/helpers/class/add-class-helper';
import { ConflictError } from 'src/utils/custom-errors';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { GetClassesBySubjectController } from 'src/controllers/class/get-classes-by-subject-controller';

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

    await GetSubjectController({ subjectId });

    await assertNoClassOnSameDate(subjectId, date);

    return await AddClassHelper(params);
};

async function assertNoClassOnSameDate(subjectId: string, date: string | Date) {
    const classes = await GetClassesBySubjectController({ subjectId });
    const newDateNorm = normalizeToDayMonthYear(date);
    if (classes.some((c) => normalizeToDayMonthYear(c.date) === newDateNorm)) {
        throw new ConflictError('Ya existe una clase para ese día y materia');
    }
}
