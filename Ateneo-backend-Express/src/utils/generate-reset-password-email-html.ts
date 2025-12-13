/**
 * Genera el contenido HTML para el email de reseteo de contraseña
 */
export function generateResetPasswordEmailHtml(professorName: string, resetCode: string): string {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código de Reseteo de Contraseña</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    display: none;
                }
                .content {
                    padding: 30px 20px;
                }
                h1 {
                    color: #333;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                p {
                    color: #555;
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 15px;
                }
                .code-container {
                    background-color: #f8f9fa;
                    border: 2px dashed #1976d2;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                    margin: 30px 0;
                }
                .reset-code {
                    font-size: 36px;
                    font-weight: bold;
                    color: #1976d2;
                    letter-spacing: 8px;
                    font-family: 'Courier New', monospace;
                }
                .warning {
                    background-color: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 4px;
                }
                .warning p {
                    margin: 0;
                    color: #856404;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- header/logo eliminado -->
                <div class="content">
                    <h1>Solicitud de Reseteo de Contraseña</h1>
                    <p>Hola <strong>${professorName}</strong>,</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código de verificación para continuar con el proceso:</p>
                    
                    <div class="code-container">
                        <div class="reset-code">${resetCode}</div>
                    </div>
                    
                    <p>Ingresa este código en la aplicación para proceder con el cambio de contraseña.</p>
                    
                    <div class="warning">
                        <p><strong>⚠️ Importante:</strong> Este código es válido por <strong>15 minutos</strong> y solo puede ser utilizado una vez. Si no solicitaste este cambio, simplemente ignora este correo.</p>
                    </div>
                    
                    <p>Saludos cordiales,<br>
                    <strong>El equipo de Ateneo</strong></p>
                </div>
            </div>
        </body>
        </html>
    `;
}
