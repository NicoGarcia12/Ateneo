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

    // Ordenar todas las notas por fecha
    const sortedGrades = sortGradesByDate([...student.grades]);

    // Si todas las notas son nulas o no tienen valor
    const allNull = sortedGrades.every((grade: any) => grade.value === null || grade.value === undefined);
    if (allNull) {
        return `
			<tr>
				<td colspan="3" class="no-grades-message">No hay notas registradas</td>
			</tr>
		`;
    }

    return sortedGrades
        .map((grade: any) => {
            const formattedDate = grade.date ? new Date(grade.date).toLocaleDateString('es-AR') : '';
            const nota = grade.value === null || grade.value === undefined ? 'No cargada' : grade.value;
            return `
			<tr>
				<td>${grade.name || ''}</td>
				<td>${nota}</td>
				<td>${formattedDate}</td>
			</tr>
		`;
        })
        .join('');
}

// Función para generar el bloque de un estudiante
function generateStudentBlock(student: any): string {
    const attendancePercentage = student.attendancePercentage ?? 0;

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

// ==================== FUNCIÓN PRINCIPAL ====================

export function generateAcademicSummaryHTML(params: AcademicSummaryHTMLParams): string {
    const { subject, students } = params;
    const fechaGeneracion = new Date().toLocaleDateString('es-AR');

    // Bloque principal con título y datos generales solo en la primera página
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
	<h1>Reporte Académico de ${subject.name}</h1>
	${generateStudentBlocks(students)}
</body>
</html>
	`.trim();
}
