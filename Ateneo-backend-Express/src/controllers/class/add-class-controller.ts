import { AddClassHelper, ClassResponse } from 'src/helpers/class/add-class-helper';
import { ConflictError } from 'src/utils/custom-errors';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { GetClassesBySubjectController } from 'src/controllers/class/get-classes-by-subject-controller';
import { validateStudentsSubject } from 'src/utils/validate-students-subject';

interface AddClassParams {
    date: string;
    description?: string;
    subjectId: string;
    absentStudents?: Array<{ id: string; justificado: boolean }>;
}

function normalizeToDayMonthYear(date: string | Date): string {
    const d = new Date(date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export const AddClassController = async (params: AddClassParams): Promise<ClassResponse> => {
    const { date, subjectId } = params;

    await GetSubjectController({ subjectId });

    await assertNoClassOnSameDate(subjectId, date);

    if (params.absentStudents) {
        await validateStudentsSubject(subjectId, params.absentStudents);
    }

    return await AddClassHelper(params);
};

async function assertNoClassOnSameDate(subjectId: string, date: string | Date) {
    const classes = await GetClassesBySubjectController({ subjectId });
    const newDateNorm = normalizeToDayMonthYear(date);
    if (classes.some((c) => normalizeToDayMonthYear(c.date) === newDateNorm)) {
        throw new ConflictError('Ya existe una clase para ese día y materia');
    }
}
