import { UpdateSubjectHelper } from 'src/helpers/subject/update-subject-helper';

export interface UpdateSubjectControllerParams {
    subjectId: string;
    name?: string;
    academicYear?: number;
    institution?: string;
    degree?: string;
}

export const UpdateSubjectController = async (params: UpdateSubjectControllerParams): Promise<void> => {
    await UpdateSubjectHelper(params);
};
