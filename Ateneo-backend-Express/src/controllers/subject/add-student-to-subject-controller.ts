import { AddStudentToSubjectHelper } from '../../helpers/subject/add-student-to-subject-helper';

export const AddStudentToSubjectController = async (idStudent: string, idSubject: string): Promise<string> => {
    return await AddStudentToSubjectHelper(idStudent, idSubject);
};
