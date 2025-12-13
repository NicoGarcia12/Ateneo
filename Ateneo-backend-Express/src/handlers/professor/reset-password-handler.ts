import { Request, Response } from 'express';
import { ResetPasswordController } from 'src/controllers/professor/reset-password-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const ResetPasswordHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, code, newPassword } = req.body;

        await ResetPasswordController({ email, code, newPassword });

        return res.status(200).json({
            message: 'Contraseña actualizada correctamente'
        });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
