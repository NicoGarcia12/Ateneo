import { GetProfessorByEmailHelper } from 'src/helpers/professor/get-professor-by-email-helper';
import { UpdateResetCodeHelper } from 'src/helpers/professor/update-reset-code-helper';
import { generateResetPasswordCode } from 'src/utils/generate-reset-password-code';
import { generateResetPasswordEmailHtml } from 'src/utils/generate-reset-password-email-html';
import { sendEmail } from 'src/utils/email-service';
import { NotFoundError, InternalError } from 'src/utils/custom-errors';

export interface RequestPasswordResetControllerParams {
    email: string;
}

export const RequestPasswordResetController = async (params: RequestPasswordResetControllerParams): Promise<void> => {
    const { email } = params;

    // Buscar profesor por email
    const professor = await GetProfessorByEmailHelper(email);

    if (!professor) {
        throw new NotFoundError('No se encontró un profesor con ese email');
    }

    // Generar código de reseteo
    const resetCode = generateResetPasswordCode(professor.id);
    const now = new Date();

    // Actualizar la base de datos con el código y la fecha
    await UpdateResetCodeHelper({
        professorId: professor.id,
        resetPasswordCode: resetCode,
        resetPasswordCodeCreatedAt: now
    });

    // Generar el HTML del email
    const emailHtml = generateResetPasswordEmailHtml(`${professor.firstName} ${professor.lastName}`, resetCode);

    // Enviar el email
    try {
        await sendEmail({
            to: [{ email: professor.email, name: `${professor.firstName} ${professor.lastName}` }],
            subject: 'Código de Reseteo de Contraseña - Ateneo',
            htmlContent: emailHtml
        });
    } catch (error) {
        throw new InternalError('Error al enviar el email de reseteo de contraseña');
    }
};
