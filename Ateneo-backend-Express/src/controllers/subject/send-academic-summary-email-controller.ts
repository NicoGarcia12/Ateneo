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
    if (!process.env['BREVO_API_KEY'] || !process.env['BREVO_SENDER_EMAIL']) {
        throw new Error('Las variables de entorno BREVO_API_KEY y BREVO_SENDER_EMAIL deben estar configuradas');
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
