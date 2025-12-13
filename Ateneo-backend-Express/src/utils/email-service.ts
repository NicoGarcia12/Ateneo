import nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

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

    // Configurar transporter de nodemailer con Outlook
    const transporter = nodemailer.createTransport({
        host: process.env['SMTP_HOST'] || 'smtp.office365.com',
        port: Number(process.env['SMTP_PORT']) || 587,
        secure: process.env['SMTP_SECURE'] === 'true',
        auth: {
            user: process.env['SMTP_USER'] || '',
            pass: process.env['SMTP_PASS'] || ''
        }
    });

    // Reemplazar el CID del logo con data URL en base64
    const logoBase64 = getLogoBase64();
    const htmlWithEmbeddedLogo = logoBase64
        ? htmlContent.replace(/src="cid:ateneo-logo"/g, `src="data:image/png;base64,${logoBase64}"`)
        : htmlContent;

    // Preparar los destinatarios en formato string separado por comas
    const recipients = to.map((recipient) => `"${recipient.name}" <${recipient.email}>`).join(', ');

    // Preparar el adjunto si existe
    const attachments = attachment
        ? [
              {
                  filename: attachment.name,
                  content: Buffer.from(attachment.content, 'base64'),
                  contentType: 'application/pdf'
              }
          ]
        : [];

    try {
        await transporter.sendMail({
            from: `"${process.env['SMTP_SENDER_NAME'] || 'Sistema Ateneo'}" <${process.env['SMTP_USER']}>`,
            to: recipients,
            subject: subject,
            html: htmlWithEmbeddedLogo,
            attachments: attachments
        });
    } catch (error) {
        console.error('Error al enviar email con Nodemailer:', error);
        throw new Error('No se pudo enviar el email');
    }
};
