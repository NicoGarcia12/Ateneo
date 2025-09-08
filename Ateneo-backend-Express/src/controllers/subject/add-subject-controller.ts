import { AddSubjectHelper } from 'helpers/subject/add-subject-helper';


export const AddSubjectController = async (
    academicYear: number,
    name: string,
    institution: string,
    degree: string,
    professorId?: string
): Promise<string> => {
    return await AddSubjectHelper({ academicYear, name, institution, degree, professorId });
};
