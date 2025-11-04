import { AddSubjectHelper } from 'src/helpers/subject/add-subject-helper';
import { GetProfessorController } from 'src/controllers/professor/get-professor-controller';

export interface AddSubjectControllerParams {
    academicYear: number;
    name: string;
    institution: string;
    degree: string;
    professorId?: string;
}

export interface SubjectResponse {
    id: string;
    name: string;
    academicYear: number;
    institution: string;
    degree: string;
    professorId: string | null;
}
export const AddSubjectController = async (params: AddSubjectControllerParams): Promise<SubjectResponse> => {
    const { academicYear, name, institution, degree, professorId } = params;
    if (professorId) {
        await GetProfessorController({ professorId });
    }

    return await AddSubjectHelper({ academicYear, name, institution, degree, professorId });
};
