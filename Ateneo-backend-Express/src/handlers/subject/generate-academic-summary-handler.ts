import { Request, Response } from 'express';
import { GenerateAcademicSummaryController } from 'src/controllers/subject/generate-academic-summary-controller';
import { handleControllerError } from 'src/utils/error-handler';
import puppeteer from 'puppeteer';
import { generateAcademicSummaryHTML, getLogoBase64 } from 'src/utils/generate-academic-summary-html';

export const GenerateAcademicSummaryHandler = async (req: Request, res: Response): Promise<void> => {
    let browser = null;
    try {
        const { subjectId } = req.params;
        const { studentIds } = req.body; // Array de IDs o undefined para todos

        // Obtener los datos del controller
        const { subject, students } = await GenerateAcademicSummaryController({
            subjectId,
            studentIds
        });

        // Generar el HTML del PDF
        const htmlContent = generateAcademicSummaryHTML({ subject, students });

        // Obtener el logo en base64 para el footer
        const logoBase64 = getLogoBase64();

        // Lanzar navegador Puppeteer
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Establecer el contenido HTML
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generar el PDF con template de footer para numeración y logo
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<div></div>',
            footerTemplate: `
                <div style="width: 100%; font-size: 10px; padding: 10px 40px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #ccc; box-sizing: border-box;">
                    <div style="flex: 1; display: flex; align-items: center;">
                        ${logoBase64 ? `<img src="${logoBase64}" style="height: 30px; width: auto;" />` : ''}
                    </div>
                    <div style="flex: 1; text-align: right; color: #666;">
                        Página <span class="pageNumber"></span> de <span class="totalPages"></span>
                    </div>
                </div>
            `,
            margin: {
                top: '40px',
                right: '40px',
                bottom: '80px',
                left: '40px'
            }
        });

        // Cerrar el navegador
        await browser.close();
        browser = null;

        // Configurar nombre personalizado: 'Reporte de [Materia] [Día]_[Mes]_[Año].pdf'
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();
        const fechaStr = `${dia}_${mes}_${anio}`;
        const nombreMateria = subject.name.replace(/\s+/g, '-');
        const nombreArchivo = `Reporte-de-${nombreMateria}-${fechaStr}.pdf`;

        // Convertir el buffer a base64 y enviar con el nombre del archivo
        const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
        res.status(200).json({
            filename: nombreArchivo,
            pdfBase64
        });
    } catch (error: any) {
        // Cerrar el navegador si hay error
        if (browser) {
            await browser.close();
        }

        // Si ya se empezó a enviar el PDF, no podemos usar handleControllerError
        if (!res.headersSent) {
            handleControllerError(error, res);
        } else {
            console.error('Error generando PDF:', error);
        }
    }
};
