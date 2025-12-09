import { GetSubjectController } from 'src/controllers/subject/get-subject-controller';
import { GetStudentsBySubjectController } from 'src/controllers/student/get-students-by-subject-controller';
import { GetGradesBySubjectController } from 'src/controllers/grade/get-grades-by-subject-controller';
import { GetClassesBySubjectController } from 'src/controllers/class/get-classes-by-subject-controller';
import { GetProfessorController } from 'src/controllers/professor/get-professor-controller';

export interface GenerateAcademicSummaryControllerParams {
    subjectId: string;
    studentIds?: string[]; // Si no se envía o es undefined, se toman todos los estudiantes
}

export interface StudentAcademicData {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    email?: string | null;
    grades: {
        id: string;
        name: string;
        value: number | null;
        date: string | null;
    }[];
    attendancePercentage: number;
}

export const GenerateAcademicSummaryController = async (
    params: GenerateAcademicSummaryControllerParams
): Promise<{ subject: any; students: StudentAcademicData[] }> => {
    const { subjectId, studentIds } = params;

    // Obtener la materia usando el controlador existente
    const subject = await GetSubjectController({ subjectId });

    // Obtener los datos completos del profesor usando su controlador
    let professor = null;
    if (subject.professorId) {
        professor = await GetProfessorController({ professorId: subject.professorId });
    }

    // Obtener los estudiantes usando el controlador existente
    let students = await GetStudentsBySubjectController({ subjectId });
    if (studentIds && studentIds.length > 0) {
        students = students.filter((student: any) => studentIds.includes(student.id));
    }

    // Obtener las clases para calcular asistencia
    const classes = await GetClassesBySubjectController({ subjectId });
    const totalClasses = Array.isArray(classes) ? classes.length : 0;

    // Obtener las notas de la materia
    const grades = await GetGradesBySubjectController({ subjectId });

    // Formatear los datos de cada estudiante
    const studentsData: StudentAcademicData[] = students.map((student: any) => {
        // Buscar las notas del estudiante
        const studentGrades: any[] = [];
        if (Array.isArray(grades)) {
            grades.forEach((grade: any) => {
                const sg = grade.studentsGrades.find((g: any) => g.student.id === student.id);
                if (sg) {
                    studentGrades.push({
                        id: grade.id,
                        name: grade.name,
                        value: sg.value,
                        date: grade.date
                    });
                }
            });
        }

        // Calcular ausencias (clases donde el estudiante está ausente)
        let absencesCount = 0;
        if (Array.isArray(classes)) {
            absencesCount = classes.reduce((acc: number, clase: any) => {
                if (clase.absences && Array.isArray(clase.absences)) {
                    return acc + clase.absences.filter((a: any) => a.student && a.student.id === student.id).length;
                }
                return acc;
            }, 0);
        }
        const attendancePercentage = totalClasses > 0 ? ((totalClasses - absencesCount) / totalClasses) * 100 : 0;

        return {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            dni: student.dni,
            email: student.email || null,
            grades: studentGrades,
            attendancePercentage: Math.round(attendancePercentage)
        };
    });

    // Devolver el objeto subject con los datos completos del profesor
    return {
        subject: {
            ...subject,
            professor
        },
        students: studentsData
    };
};
