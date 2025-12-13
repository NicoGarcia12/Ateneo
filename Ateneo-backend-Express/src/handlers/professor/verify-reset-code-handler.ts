import { Request, Response } from 'express';
import { VerifyResetCodeController } from 'src/controllers/professor/verify-reset-code-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const VerifyResetCodeHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, code } = req.body;

        const result = await VerifyResetCodeController({ email, code });

        return res.status(200).json({
            data: result
        });
    } catch (error: any) {
        return handleControllerError(error, res);
    }
};
