import { AddSubjectToProfessorHelper } from 'helpers/subject/add-subject-helper';

export const AddSubjectToProfessorController = async (
    idProfessor: string,
    academicYear: number,
    name: string,
    institution: string,
    degree: string
): Promise<string> => {
    return await AddSubjectToProfessorHelper(idProfessor, academicYear, name, institution, degree);
};
