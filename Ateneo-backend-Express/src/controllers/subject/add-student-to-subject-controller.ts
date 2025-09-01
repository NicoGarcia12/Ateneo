import { AddStudentToSubjectHelper } from '../../helpers/subject/add-student-to-subject-helper';

export const AddStudentToSubjectController = async (idStudent: string, idSubject: string): Promise<string> => {
    try {
        return await AddStudentToSubjectHelper(idStudent, idSubject);
    } catch (error: any) {
        throw error;
    }
};
