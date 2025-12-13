import { Request, Response } from 'express';
import { RequestPasswordResetController } from 'src/controllers/professor/request-password-reset-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const RequestPasswordResetHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.body;

        await RequestPasswordResetController({ email });

        return res.status(200).json({
            message: 'Se ha enviado un código de verificación a tu email'
        });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
