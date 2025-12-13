import { GenerateAcademicSummaryController } from './generate-academic-summary-controller';
import { sendEmailToProfessorHelper } from 'src/helpers/subject/send-email-to-professor-helper';
import { sendEmailToStudentsHelper } from 'src/helpers/subject/send-email-to-students-helper';

export interface SendAcademicSummaryEmailParams {
    subjectId: string;
    studentIds?: string[];
    professor?: boolean;
}

export const SendAcademicSummaryEmailController = async (params: SendAcademicSummaryEmailParams) => {
    const { subjectId, studentIds, professor } = params;

    // Validar variables de entorno
    if (!process.env['SMTP_USER'] || !process.env['SMTP_PASS']) {
        throw new Error('Las variables de entorno SMTP_USER y SMTP_PASS deben estar configuradas');
    }

    // Generar datos del resumen académico
    const { subject, students } = await GenerateAcademicSummaryController({ subjectId, studentIds });

    // Delegar el envío según el destinatario
    if (professor === true) {
        return await sendEmailToProfessorHelper({ subject, students });
    } else {
        return await sendEmailToStudentsHelper({ subject, students });
    }
};
