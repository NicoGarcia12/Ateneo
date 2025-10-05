import { UpdateClassHelper } from 'src/helpers/class/update-class-helper';
import { GetClassController } from 'src/controllers/class/get-class-controller';
import { validateStudentsSubject } from 'src/utils/validate-students-subject';
import { NotFoundError } from 'src/utils/custom-errors';

export interface UpdateClassControllerParams {
    classId: string;
    description?: string | null;
    absentStudents?: Array<{ id: string; justificado: boolean }>;
}

export const UpdateClassController = async (params: UpdateClassControllerParams) => {
    const existingClass = await GetClassController({ classId: params.classId });
    if (!existingClass) {
        throw new NotFoundError('No existe una clase con ese id');
    }
    if (params.absentStudents) {
        await validateStudentsSubject(existingClass.subjectId, params.absentStudents);
    }
    return await UpdateClassHelper(params);
};
