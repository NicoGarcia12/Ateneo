/**
 * Utilidad para generar el HTML del resumen académico para emails.
 * Este HTML está optimizado para visualización en clientes de correo electrónico.
 */

export interface AcademicSummaryEmailHTMLParams {
    subject: any;
    students: any[];
}

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
                <td colspan="3" style="padding:12px;text-align:center;font-style:italic;color:#666;background-color:#f9f9f9;">
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
                <td colspan="3" style="padding:12px;text-align:center;font-style:italic;color:#666;background-color:#f9f9f9;">
                    No hay notas registradas
                </td>
            </tr>
        `;
    }

    return sortedGrades
        .map((grade: any, index: number) => {
            const formattedDate = grade.date ? new Date(grade.date).toLocaleDateString('es-AR') : '';
            const nota = grade.value === null || grade.value === undefined ? 'No cargada' : grade.value;
            const bgColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
            return `
            <tr style="background-color:${bgColor};">
                <td style="padding:10px;border:1px solid #ddd;text-align:left;">${grade.name || ''}</td>
                <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;">${nota}</td>
                <td style="padding:10px;border:1px solid #ddd;text-align:center;">${formattedDate}</td>
            </tr>
        `;
        })
        .join('');
}

// Función para generar el bloque de un estudiante para email
function generateStudentBlock(student: any): string {
    const attendancePercentage = student.attendancePercentage ?? 0;

    return `
        <div style="margin-bottom:30px;padding:20px;background-color:#f5f5f5;border-radius:8px;border-left:4px solid #4CAF50;">
            <div style="text-align:center;margin-bottom:15px;">
                <h3 style="margin:0 0 10px 0;color:#333;font-size:16px;">
                    ${student.lastName}, ${student.firstName}
                </h3>
                <p style="margin:5px 0;color:#666;font-size:14px;">
                    <strong>DNI:</strong> ${student.dni}
                </p>
                <p style="margin:5px 0;color:#666;font-size:14px;">
                    <strong>Asistencia:</strong> ${attendancePercentage}%
                </p>
            </div>
            <table style="width:100%;border-collapse:collapse;background-color:white;border-radius:4px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background-color:#4CAF50;color:white;">
                        <th style="padding:12px;font-size:13px;border:1px solid #4CAF50;text-align:left;">Evaluación</th>
                        <th style="padding:12px;font-size:13px;border:1px solid #4CAF50;text-align:center;">Nota</th>
                        <th style="padding:12px;font-size:13px;border:1px solid #4CAF50;text-align:center;">Fecha</th>
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
        <div style="max-width:800px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;">
            <div style="background-color:#4CAF50;color:white;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
                <h1 style="margin:0;font-size:24px;">Reporte Académico</h1>
                <h2 style="margin:10px 0 0 0;font-size:18px;font-weight:normal;">${subject.name}</h2>
            </div>
            <div style="background-color:white;padding:20px;border:1px solid #ddd;border-top:none;">
                ${generateStudentBlocks(students)}
            </div>
            <div style="background-color:#f9f9f9;padding:15px;border-radius:0 0 8px 8px;text-align:center;color:#666;font-size:12px;border:1px solid #ddd;border-top:none;">
                <p style="margin:0;font-style:italic;">Generado el ${new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </div>
        </div>
    `.trim();
}
