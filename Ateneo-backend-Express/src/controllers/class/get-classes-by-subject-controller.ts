import { GetClassesBySubjectHelper } from 'src/helpers/class/get-classes-by-subject-helper';
import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { convertBigIntToString } from '../../utils/convert-bigint-to-string';

export interface GetClassesBySubjectControllerParams {
    subjectId: string;
}

export const GetClassesBySubjectController = async (params: GetClassesBySubjectControllerParams) => {
    const { subjectId } = params;

    await GetSubjectController({ subjectId });

    const classes = await GetClassesBySubjectHelper(subjectId);
    return convertBigIntToString(classes);
};
