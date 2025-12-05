import * as fs from 'fs';
import * as path from 'path';

export interface AcademicSummaryHTMLParams {
    subject: any;
    students: any[];
}

export interface AcademicSummaryResult {
    html: string;
    logoBase64: string;
}

// ==================== ESTILOS CSS ====================
const CSS_STYLES = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica', Arial, sans-serif;
    padding: 40px;
    color: #000;
}

h1 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
}

.subject-info {
    margin-bottom: 30px;
}

.subject-info p {
    margin: 5px 0;
}

.main-info {
    font-size: 14px;
    font-weight: bold;
}

.secondary-info {
    font-size: 12px;
}

.generation-date {
    font-size: 10px;
    color: #444;
}

.student-block {
    page-break-inside: avoid;
    margin-bottom: 40px;
}

.student-info {
    text-align: center;
    margin-bottom: 15px;
}

.student-name {
    font-size: 13px;
    font-weight: normal;
    margin-bottom: 3px;
}

.student-detail {
    font-size: 12px;
    margin-bottom: 2px;
}

.grades-table {
    width: auto;
    margin: 0 auto;
    border-collapse: collapse;
    font-size: 10px;
}

.grades-table th {
    font-size: 11px;
    font-weight: bold;
    padding: 8px 12px;
    text-align: center;
    border: 1px solid #000;
    background-color: #fff;
}

.grades-table td {
    padding: 8px 12px;
    text-align: center;
    border: 1px solid #000;
}

.grades-table tbody tr {
    background-color: #fff;
}

.no-grades-message {
    text-align: center;
    font-style: italic;
    color: #666;
}
`;

// ==================== FUNCIONES AUXILIARES ====================

// Función para obtener el logo en base64
export function getLogoBase64(): string {
    try {
        const logoPath = path.join(__dirname, '..', '..', '..', 'Ateneo-frontend-Angular', 'src', 'assets', 'images', 'Ateneo-logo.png');
        const logoBuffer = fs.readFileSync(logoPath);
        return 'data:image/png;base64,' + logoBuffer.toString('base64');
    } catch (error) {
        console.error('Error al leer el logo:', error);
        return '';
    }
}

// Función para ordenar las notas por fecha (de más vieja a más nueva)
function sortGradesByDate(grades: any[]): any[] {
    return grades.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateA - dateB;
    });
}

// Función para generar las filas de la tabla de notas de un estudiante
function generateGradeRows(student: any): string {
    if (!student.grades || student.grades.length === 0) {
        return `
            <tr>
                <td colspan="3" class="no-grades-message">No hay notas registradas</td>
            </tr>
        `;
    }

    // Filtrar notas que tengan valor (no nulas)
    const gradesWithValue = student.grades.filter((grade: any) => grade.value !== null && grade.value !== undefined);

    if (gradesWithValue.length === 0) {
        return `
            <tr>
                <td colspan="3" class="no-grades-message">No hay notas registradas</td>
            </tr>
        `;
    }

    // Ordenar las notas por fecha
    const sortedGrades = sortGradesByDate([...gradesWithValue]);

    return sortedGrades
        .map((grade: any) => {
            const formattedDate = grade.date ? new Date(grade.date).toLocaleDateString('es-AR') : '';
            return `
            <tr>
                <td>${grade.name || ''}</td>
                <td>${grade.value}</td>
                <td>${formattedDate}</td>
            </tr>
        `;
        })
        .join('');
}

// Función para generar el bloque de un estudiante
function generateStudentBlock(student: any): string {
    const attendancePercentage = Math.round(student.attendancePercentage);

    return `
        <div class="student-block">
            <div class="student-info">
                <p class="student-name">Estudiante: ${student.lastName}, ${student.firstName}</p>
                <p class="student-detail">DNI: ${student.dni}</p>
                <p class="student-detail">Asistencia: ${attendancePercentage}%</p>
            </div>
            <table class="grades-table">
                <thead>
                    <tr>
                        <th>Evaluación</th>
                        <th>Nota</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateGradeRows(student)}
                </tbody>
            </table>
        </div>
    `;
}

// Función para generar todos los bloques de estudiantes
function generateStudentBlocks(students: any[]): string {
    return students.map((student) => generateStudentBlock(student)).join('');
}

// Función para generar la información de la materia
function generateSubjectInfo(subject: any, fechaGeneracion: string): string {
    return `
        <div class="subject-info">
            <p class="main-info">Materia: ${subject.name}</p>
            <p class="secondary-info">Año Académico: ${subject.academicYear}</p>
            <p class="secondary-info">Institución: ${subject.institution}</p>
            <p class="secondary-info">Certificación final: ${subject.degree}</p>
            <p class="secondary-info">Profesor: ${subject.professor.firstName} ${subject.professor.lastName}</p>
            <p class="generation-date">Generado el ${fechaGeneracion}</p>
        </div>
    `;
}

// ==================== FUNCIÓN PRINCIPAL ====================

export function generateAcademicSummaryHTML(params: AcademicSummaryHTMLParams): string {
    const { subject, students } = params;
    const fechaGeneracion = new Date().toLocaleDateString('es-AR');

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resumen Académico</title>
    <style>${CSS_STYLES}</style>
</head>
<body>
    <h1>Resumen Académico</h1>
    ${generateSubjectInfo(subject, fechaGeneracion)}
    ${generateStudentBlocks(students)}
</body>
</html>
    `.trim();
}
