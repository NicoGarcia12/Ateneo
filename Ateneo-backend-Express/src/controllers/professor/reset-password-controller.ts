import { GetProfessorByEmailHelper } from 'src/helpers/professor/get-professor-by-email-helper';
import { ResetPasswordHelper } from 'src/helpers/professor/reset-password-helper';
import { isResetCodeValid } from 'src/utils/generate-reset-password-code';
import { NotFoundError, UnauthorizedError, ValidationError } from 'src/utils/custom-errors';
import bcrypt from 'bcrypt';

export interface ResetPasswordControllerParams {
    email: string;
    code: string;
    newPassword: string;
}

export const ResetPasswordController = async (params: ResetPasswordControllerParams): Promise<void> => {
    const { email, code, newPassword } = params;

    // Validar que la contraseña tenga al menos 6 caracteres
    if (!newPassword || newPassword.length < 6) {
        throw new ValidationError('La contraseña debe tener al menos 6 caracteres');
    }

    // Buscar profesor por email
    const professor = await GetProfessorByEmailHelper(email);

    if (!professor) {
        throw new NotFoundError('No se encontró un profesor con ese email');
    }

    // Verificar que tenga un código de reseteo
    if (!professor.resetPasswordCode || !professor.resetPasswordCodeCreatedAt) {
        throw new UnauthorizedError('No hay una solicitud de reseteo de contraseña activa para este email');
    }

    // Verificar que el código no haya expirado
    if (!isResetCodeValid(professor.resetPasswordCodeCreatedAt)) {
        throw new UnauthorizedError('El código de verificación ha expirado. Por favor, solicita uno nuevo');
    }

    // Verificar que el código coincida
    if (professor.resetPasswordCode !== code) {
        throw new UnauthorizedError('El código de verificación es incorrecto');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña y limpiar los campos de reseteo
    await ResetPasswordHelper({
        email: email,
        hashedPassword: hashedPassword
    });
};
