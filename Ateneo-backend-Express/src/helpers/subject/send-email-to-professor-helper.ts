import { sendEmail } from 'src/utils/email-service';
import { generateEmailHTML } from 'src/utils/generate-academic-summary-email-html';

export interface SendEmailToProfessorParams {
    subject: any;
    students: any[];
}

export interface SendEmailToProfessorResult {
    message: string;
    emailSent: boolean;
    recipient: string;
}

export const sendEmailToProfessorHelper = async (params: SendEmailToProfessorParams): Promise<SendEmailToProfessorResult> => {
    const { subject, students } = params;

    const professorEmail = subject.professor.email;
    const professorName = `${subject.professor.firstName} ${subject.professor.lastName}`;
    const studentsNames =
        students.length === 1
            ? `${students[0].firstName} ${students[0].lastName}`
            : students.length > 1
              ? `${students.length} estudiantes`
              : 'todos los estudiantes';

    await sendEmail({
        to: [{ email: professorEmail, name: professorName }],
        subject: `Resumen Académico - ${subject.name}`,
        htmlContent: `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            margin: 0;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                        .email-wrapper {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        }
                        .email-wrapper-header {
                            background-color: #4CAF50;
                            color: white;
                            padding: 30px;
                            text-align: center;
                        }
                        .email-wrapper-header h1 {
                            margin: 0;
                            font-size: 24px;
                            font-weight: 600;
                        }
                        .email-wrapper-header p {
                            margin: 10px 0 0 0;
                            font-size: 16px;
                            opacity: 0.95;
                        }
                        .email-wrapper-content {
                            padding: 30px;
                        }
                        .email-wrapper-content p {
                            margin: 0 0 15px 0;
                            font-size: 15px;
                            line-height: 1.6;
                        }
                        .email-wrapper-content p.spacing {
                            margin: 0 0 20px 0;
                        }
                        .email-wrapper-content p.greeting {
                            margin: 20px 0 0 0;
                        }
                        .info-box {
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-radius: 6px;
                            margin-bottom: 20px;
                        }
                        .info-box p {
                            margin: 0 0 8px 0;
                            font-size: 14px;
                        }
                        .info-box p:last-child {
                            margin: 0;
                        }
                        .email-wrapper-footer {
                            background-color: #f9f9f9;
                            padding: 20px;
                            text-align: center;
                            border-top: 1px solid #e0e0e0;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-wrapper">
                        <div class="email-wrapper-header">
                            <h1>Resumen Académico</h1>
                            <p>${subject.name}</p>
                        </div>
                        <div class="email-wrapper-content">
                            <p>Estimado/a <strong>${professorName}</strong>,</p>
                            <p class="spacing">
                                A continuación se detalla el resumen académico de <strong>${studentsNames}</strong> para la materia <strong>${subject.name}</strong>.
                            </p>
                            <div class="info-box">
                                <p><strong>Institución:</strong> ${subject.institution}</p>
                                <p><strong>Año académico:</strong> ${subject.academicYear}</p>
                                <p><strong>Certificación final:</strong> ${subject.degree}</p>
                            </div>
                            ${generateEmailHTML({ subject, students })}
                            <p class="greeting">Saludos cordiales</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    });

    return {
        message: 'Resumen académico enviado exitosamente al profesor',
        emailSent: true,
        recipient: 'professor'
    };
};
