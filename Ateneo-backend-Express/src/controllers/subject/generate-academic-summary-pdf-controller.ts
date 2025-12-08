import { GenerateAcademicSummaryController } from './generate-academic-summary-controller';
import { getLogoBase64, generateAcademicSummaryHTML } from 'src/utils/generate-academic-summary-pdf-html';

export interface GenerateAcademicSummaryPDFParams {
    subjectId: string;
    studentIds?: string[];
}

export const GenerateAcademicSummaryPDFController = async (params: GenerateAcademicSummaryPDFParams) => {
    const { subjectId, studentIds } = params;
    const { subject, students } = await GenerateAcademicSummaryController({ subjectId, studentIds });
    const puppeteer = await import('puppeteer');
    const htmlContent = generateAcademicSummaryHTML({ subject, students });
    const logoBase64 = getLogoBase64();
    const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `
            <div style="width: 100%; font-size: 12px; padding: 10px 40px; box-sizing: border-box; display: flex; justify-content: space-between; align-items: stretch; border-bottom: 1px solid #ccc;">
                <div style='flex: 1; display: flex; flex-direction: column; justify-content: flex-start;'>
                    <div><strong>Materia:</strong> ${subject.name}</div>
                    <div><strong>Profesor:</strong> ${subject.professor.firstName} ${subject.professor.lastName}</div>
                </div>
                <div style='flex: 1; display: flex; flex-direction: column; justify-content: flex-start;'>
                    <div><strong>Año:</strong> ${subject.academicYear}</div>
                    <div><strong>Institución:</strong> ${subject.institution}</div>
                </div>
                <div style='flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;'>
                    <div><strong>Certificación final:</strong> ${subject.degree}</div>
                </div>
            </div>
        `,
        footerTemplate: `
            <div style="width: 100%; font-size: 10px; padding: 10px 40px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #ccc; box-sizing: border-box;">
                <div style="flex: 1; display: flex; align-items: center;">
                    ${logoBase64 ? `<img src='${logoBase64}' style='height: 50px; width: auto;' />` : ''}
                </div>
                <div style="flex: 1; text-align: center; color: #666;">
                    Página <span class="pageNumber"></span> de <span class="totalPages"></span>
                </div>
                <div style="flex: 1; text-align: right; color: #444;">
                    Generado el ${new Date().toLocaleDateString('es-AR')}
                </div>
            </div>
        `,
        margin: {
            top: '80px',
            right: '40px',
            bottom: '80px',
            left: '40px'
        }
    });
    await browser.close();
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaStr = `${dia}_${mes}_${anio}`;
    const nombreMateria = subject.name.replace(/\s+/g, '-');
    const nombreArchivo = `Reporte-de-${nombreMateria}-${fechaStr}.pdf`;
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    return {
        filename: nombreArchivo,
        pdfBase64
    };
};
