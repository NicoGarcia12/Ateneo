import * as brevo from '@getbrevo/brevo';
import * as fs from 'fs';
import * as path from 'path';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env['BREVO_API_KEY'] || '');

export interface SendEmailParams {
    to: { email: string; name: string }[];
    subject: string;
    htmlContent: string;
    attachment?: {
        content: string; // Base64
        name: string;
    };
}

export const getLogoBase64 = (): string => {
    const logoPath = path.resolve(__dirname, '../../Archivos extras/Ateneo-logo.png');
    if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        return logoBuffer.toString('base64');
    }
    return '';
};

export const sendEmail = async (params: SendEmailParams): Promise<void> => {
    const { to, subject, htmlContent, attachment } = params;

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
        email: process.env['BREVO_SENDER_EMAIL'] || '',
        name: process.env['BREVO_SENDER_NAME'] || 'Sistema Ateneo'
    };

    sendSmtpEmail.to = to;
    sendSmtpEmail.subject = subject;

    // Reemplazar el CID del logo con data URL en base64
    const logoBase64 = getLogoBase64();
    const htmlWithEmbeddedLogo = logoBase64
        ? htmlContent.replace(/src="cid:ateneo-logo"/g, `src="data:image/png;base64,${logoBase64}"`)
        : htmlContent;

    sendSmtpEmail.htmlContent = htmlWithEmbeddedLogo;

    if (attachment) {
        sendSmtpEmail.attachment = [
            {
                content: attachment.content,
                name: attachment.name
            }
        ];
    }

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
        console.error('Error al enviar email con Brevo:', error);
        throw new Error('No se pudo enviar el email');
    }
};
