import { DeleteSubjectHelper } from 'src/helpers/subject/delete-subject-helper';

export interface DeleteSubjectControllerParams {
    subjectId: string;
}

export const DeleteSubjectController = async (params: DeleteSubjectControllerParams): Promise<void> => {
    const { subjectId } = params;
    await DeleteSubjectHelper(subjectId);
};
