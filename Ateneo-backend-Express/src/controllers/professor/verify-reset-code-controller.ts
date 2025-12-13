import { GetProfessorByEmailHelper } from 'src/helpers/professor/get-professor-by-email-helper';
import { isResetCodeValid } from 'src/utils/generate-reset-password-code';
import { NotFoundError, UnauthorizedError } from 'src/utils/custom-errors';

export interface VerifyResetCodeControllerParams {
    email: string;
    code: string;
}

export interface VerifyResetCodeControllerResponse {
    valid: boolean;
    message: string;
}

export const VerifyResetCodeController = async (params: VerifyResetCodeControllerParams): Promise<VerifyResetCodeControllerResponse> => {
    const { email, code } = params;

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

    return {
        valid: true,
        message: 'Código verificado correctamente'
    };
};
