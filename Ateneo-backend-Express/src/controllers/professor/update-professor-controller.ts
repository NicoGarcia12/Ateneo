import bcrypt from 'bcrypt';
import { UpdateProfessorHelper } from 'src/helpers/professor/update-professor-helper';
import { GetProfessorHelper } from 'src/helpers/professor/get-professor-helper';
import { ValidationError, NotFoundError } from 'src/utils/custom-errors';

export interface UpdateProfessorControllerParams {
    professorId: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    resetPassword?: string;
}
export const UpdateProfessorController = async (params: UpdateProfessorControllerParams) => {
    const { professorId, firstName, lastName, password, resetPassword } = params;

    const existingProfessor = await GetProfessorHelper(professorId);
    if (!existingProfessor) {
        throw new NotFoundError('No existe un profesor con ese id');
    }

    if (!password) {
        throw new ValidationError('Debes ingresar tu contraseña actual para actualizar el perfil');
    }
    const passwordMatch = await bcrypt.compare(password, existingProfessor.password);
    if (!passwordMatch) {
        throw new ValidationError('La contraseña actual es incorrecta');
    }

    const dataToUpdate: any = {};
    if (firstName !== undefined) dataToUpdate.firstName = firstName;
    if (lastName !== undefined) dataToUpdate.lastName = lastName;
    if (resetPassword !== undefined) {
        dataToUpdate.password = await bcrypt.hash(resetPassword, 10);
    }
    if (Object.keys(dataToUpdate).length === 0) {
        throw new ValidationError('No se enviaron datos para actualizar');
    }
    await UpdateProfessorHelper({ id: professorId, ...dataToUpdate });
};
