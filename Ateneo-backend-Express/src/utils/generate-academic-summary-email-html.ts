/**
 * Utilidad para generar el HTML del resumen académico para emails.
 * Este HTML está optimizado para visualización en clientes de correo electrónico.
 */

export interface AcademicSummaryEmailHTMLParams {
    subject: any;
    students: any[];
}

// ==================== ESTILOS CSS ====================

const EMAIL_STYLES = `
<style>
    .email-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }
    
    .email-header {
        background-color: #4CAF50;
        color: white;
        padding: 20px;
        border-radius: 8px 8px 0 0;
        text-align: center;
    }
    
    .email-header h1 {
        margin: 0;
        font-size: 24px;
    }
    
    .email-header h2 {
        margin: 10px 0 0 0;
        font-size: 18px;
        font-weight: normal;
    }
    
    .email-content {
        background-color: white;
        padding: 20px;
        border: 1px solid #ddd;
        border-top: none;
    }
    
    .student-block {
        margin-bottom: 30px;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 8px;
        border-left: 4px solid #4CAF50;
    }
    
    .student-header {
        text-align: center;
        margin-bottom: 15px;
    }
    
    .student-header h3 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 16px;
    }
    
    .student-info {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
    }
    
    .grades-table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .grades-table thead tr {
        background-color: #4CAF50;
        color: white;
    }
    
    .grades-table th {
        padding: 12px;
        font-size: 13px;
        border: 1px solid #4CAF50;
    }
    
    .grades-table th.align-left {
        text-align: left;
    }
    
    .grades-table th.align-center {
        text-align: center;
    }
    
    .grades-table td {
        padding: 10px;
        border: 1px solid #ddd;
    }
    
    .grades-table td.align-left {
        text-align: left;
    }
    
    .grades-table td.align-center {
        text-align: center;
    }
    
    .grades-table td.bold {
        font-weight: bold;
    }
    
    .grades-table tr.row-even {
        background-color: #ffffff;
    }
    
    .grades-table tr.row-odd {
        background-color: #f9f9f9;
    }
    
    .no-grades {
        padding: 12px;
        text-align: center;
        font-style: italic;
        color: #666;
        background-color: #f9f9f9;
    }
    
    .email-footer {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 0 0 8px 8px;
        text-align: center;
        color: #666;
        font-size: 12px;
        border: 1px solid #ddd;
        border-top: none;
    }
    
    .email-footer p {
        margin: 0;
    }
    
    .email-footer p.footer-main {
        margin-bottom: 10px;
    }
    
    .email-footer p.footer-date {
        font-style: italic;
    }
</style>
`;

// ==================== FUNCIONES AUXILIARES ====================

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
                <td colspan="3" class="no-grades">
                    No hay notas registradas
                </td>
            </tr>
        `;
    }

    const sortedGrades = sortGradesByDate([...student.grades]);
    const allNull = sortedGrades.every((grade: any) => grade.value === null || grade.value === undefined);

    if (allNull) {
        return `
            <tr>
                <td colspan="3" class="no-grades">
                    No hay notas registradas
                </td>
            </tr>
        `;
    }

    return sortedGrades
        .map((grade: any, index: number) => {
            const formattedDate = grade.date ? new Date(grade.date).toLocaleDateString('es-AR') : '';
            const nota = grade.value === null || grade.value === undefined ? 'No cargada' : grade.value;
            const rowClass = index % 2 === 0 ? 'row-even' : 'row-odd';

            return `
            <tr class="${rowClass}">
                <td class="align-left">${grade.name || ''}</td>
                <td class="align-center bold">${nota}</td>
                <td class="align-center">${formattedDate}</td>
            </tr>
        `;
        })
        .join('');
}

// Función para generar el bloque de un estudiante para email
function generateStudentBlock(student: any): string {
    const attendancePercentage = Math.round(student.attendancePercentage);

    return `
        <div class="student-block">
            <div class="student-header">
                <h3>
                    ${student.lastName}, ${student.firstName}
                </h3>
                <p class="student-info">
                    <strong>DNI:</strong> ${student.dni}
                </p>
                <p class="student-info">
                    <strong>Asistencia:</strong> ${attendancePercentage}%
                </p>
            </div>
            <table class="grades-table">
                <thead>
                    <tr>
                        <th class="align-left">Evaluación</th>
                        <th class="align-center">Nota</th>
                        <th class="align-center">Fecha</th>
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

export function generateEmailHTML(params: AcademicSummaryEmailHTMLParams): string {
    const { subject, students } = params;

    return `
        ${EMAIL_STYLES}
        <div class="email-container">
            <div class="email-header">
                <h1>Reporte Académico</h1>
                <h2>${subject.name}</h2>
            </div>
            <div class="email-content">
                ${generateStudentBlocks(students)}
            </div>
            <div class="email-footer">
                <p class="footer-date">Generado el ${new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </div>
        </div>
    `.trim();
}
