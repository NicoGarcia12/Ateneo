import { AddSubjectHelper } from 'helpers/subject/add-subject-helper';
import { GetProfessorController } from 'controllers/professor/get-professor-controller';

export const AddSubjectController = async (
    academicYear: number,
    name: string,
    institution: string,
    degree: string,
    professorId?: string
): Promise<string> => {
    if (professorId) {
        await GetProfessorController(professorId);
    }

    return await AddSubjectHelper({ academicYear, name, institution, degree, professorId });
};
