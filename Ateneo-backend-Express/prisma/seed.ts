import { PrismaClient, GradeType } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function resetDatabase() {
    try {
        execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    } catch (error) {
        console.error('Error al resetear la base de datos:', error);
        process.exit(1);
    }
}

async function main() {
    // Profesores
    const professors = await prisma.professor.createMany({
        data: [
            { id: 'prof1', firstName: 'Ana', lastName: 'García', email: 'ana.garcia@ateneo.com', password: 'pass1', emailActivated: true },
            {
                id: 'prof2',
                firstName: 'Luis',
                lastName: 'Martínez',
                email: 'luis.martinez@ateneo.com',
                password: 'pass2',
                emailActivated: true
            },
            {
                id: 'prof3',
                firstName: 'María',
                lastName: 'Pérez',
                email: 'maria.perez@ateneo.com',
                password: 'pass3',
                emailActivated: true
            },
            {
                id: 'prof4',
                firstName: 'Carlos',
                lastName: 'López',
                email: 'carlos.lopez@ateneo.com',
                password: 'pass4',
                emailActivated: true
            }
        ]
    });

    // Alumnos (5, dos compartidos)
    const students = await prisma.student.createMany({
        data: [
            { id: 'stu1', firstName: 'Juan', lastName: 'Ruiz', dni: 10000001n },
            { id: 'stu2', firstName: 'Lucía', lastName: 'Fernández', dni: 10000002n },
            { id: 'stu3', firstName: 'Pedro', lastName: 'Sosa', dni: 10000003n },
            { id: 'stu4', firstName: 'Sofía', lastName: 'Méndez', dni: 10000004n },
            { id: 'stu5', firstName: 'Martín', lastName: 'Vega', dni: 10000005n }
        ]
    });

    // Materias (2 por profesor)
    const subjectsData = [
        {
            id: 'subj1',
            name: 'Matemática I',
            academicYear: 2024,
            institution: 'Instituto A',
            degree: 'Lic. Matemática',
            professorId: 'prof1'
        },
        { id: 'subj2', name: 'Álgebra', academicYear: 2024, institution: 'Instituto A', degree: 'Lic. Matemática', professorId: 'prof1' },
        { id: 'subj3', name: 'Historia', academicYear: 2024, institution: 'Instituto B', degree: 'Lic. Historia', professorId: 'prof2' },
        { id: 'subj4', name: 'Geografía', academicYear: 2024, institution: 'Instituto B', degree: 'Lic. Historia', professorId: 'prof2' },
        { id: 'subj5', name: 'Física', academicYear: 2024, institution: 'Instituto C', degree: 'Lic. Física', professorId: 'prof3' },
        { id: 'subj6', name: 'Química', academicYear: 2024, institution: 'Instituto C', degree: 'Lic. Química', professorId: 'prof3' },
        { id: 'subj7', name: 'Literatura', academicYear: 2024, institution: 'Instituto D', degree: 'Lic. Letras', professorId: 'prof4' },
        { id: 'subj8', name: 'Gramática', academicYear: 2024, institution: 'Instituto D', degree: 'Lic. Letras', professorId: 'prof4' }
    ];
    for (const subj of subjectsData) {
        await prisma.subject.create({
            data: {
                ...subj,
                students: {
                    connect: [{ id: 'stu1' }, { id: 'stu2' }, { id: 'stu3' }, { id: 'stu4' }, { id: 'stu5' }]
                }
            }
        });
    }

    // Clases (2 por materia en la primera materia de cada profesor)
    const classDates = [new Date('2024-03-01'), new Date('2024-03-08')];
    for (let i = 0; i < 4; i++) {
        // solo para subj1, subj3, subj5, subj7
        for (let j = 0; j < 2; j++) {
            await prisma.class.create({
                data: {
                    id: `class${i + 1}_${j + 1}`,
                    date: classDates[j],
                    subjectId: subjectsData[i * 2].id
                }
            });
        }
    }

    // Notas (3 por materia en la primera materia de cada profesor)
    for (let i = 0; i < 4; i++) {
        for (let n = 1; n <= 3; n++) {
            await prisma.grade.create({
                data: {
                    id: `grade${i + 1}_${n}`,
                    name: `Nota ${n}`,
                    type: GradeType.Final,
                    date: new Date(`2024-04-0${n}`),
                    description: `Nota ${n} de la materia`,
                    subjectId: subjectsData[i * 2].id
                }
            });
        }
    }

    // StudentGrade (asignar notas a los alumnos en la primera materia de cada profesor)
    for (let i = 0; i < 4; i++) {
        for (let n = 1; n <= 3; n++) {
            for (let s = 1; s <= 5; s++) {
                await prisma.studentGrade.create({
                    data: {
                        id: `sg${i + 1}_${n}_${s}`,
                        value: Math.floor(Math.random() * 6) + 4, // 4 a 9
                        gradeId: `grade${i + 1}_${n}`,
                        studentId: `stu${s}`
                    }
                });
            }
        }
    }

    // Inasistencias (en la primera clase de la primera materia de cada profesor, un alumno falta)
    for (let i = 0; i < 4; i++) {
        await prisma.absence.create({
            data: {
                id: `abs${i + 1}`,
                classId: `class${i + 1}_1`,
                studentId: `stu${i + 1}`,
                justified: false
            }
        });
    }

    console.log('Datos insertados exitosamente.');
}

// MAIN
const args = process.argv.slice(2);
if (args.includes('--reset')) {
    resetDatabase()
        .then(main)
        .catch(console.error)
        .finally(async () => {
            await prisma.$disconnect();
        });
} else {
    main()
        .catch(console.error)
        .finally(async () => {
            await prisma.$disconnect();
        });
}
