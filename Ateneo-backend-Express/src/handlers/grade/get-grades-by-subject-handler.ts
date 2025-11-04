import { Request, Response } from 'express';
import { GetGradesBySubjectController } from 'src/controllers/grade/get-grades-by-subject-controller';
import { handleControllerError } from 'src/utils/error-handler';
import { convertBigIntToString } from 'src/utils/convert-bigint-to-string';

export const GetGradesBySubjectHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { subjectId } = req.params;
        const grades = await GetGradesBySubjectController({ subjectId });
        const gradesSafe = convertBigIntToString(grades);
        return res.status(200).json(gradesSafe);
    } catch (error) {
        return handleControllerError(error, res);
    }
};
