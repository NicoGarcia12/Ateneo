/// <reference types="node" />
import { PrismaClient, GradeType } from '@prisma/client';
import { execSync } from 'child_process';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function resetDatabase() {
    try {
        // Borrar la carpeta de migraciones si existe
        const migrationsDir = path.join(__dirname, 'migrations');
        if (fs.existsSync(migrationsDir)) {
            fs.rmSync(migrationsDir, { recursive: true, force: true });
        }
        // Resetear la base de datos (esto borra tablas, pero no siempre borra migraciones locales)
        execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
        // Crear la migración inicial
        execSync('npx prisma migrate dev --name init --create-only', { stdio: 'inherit' });
        // Aplicar migraciones
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    } catch (error) {
        console.error('Error al resetear la base de datos:', error);
        process.exit(1);
    }
}

async function main() {
    // Hashear la contraseña 'password'
    const hashedPassword = await bcrypt.hash('Garcia1234', 10);

    // Fechas base para las notas
    // Asegurar que today sea una fecha válida (sin hora)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const addDays = (date: Date, days: number) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    // 1. Alta de profesores
    const Profesor1 = await prisma.professor.create({
        data: {
            id: 'prof1',
            firstName: 'Nico',
            lastName: 'García',
            email: 'nicolasgarcia9812@hotmail.com',
            password: hashedPassword,
            emailActivated: true
        }
    });

    // 2. Alta de alumnos
    const Alumno1 = await prisma.student.create({
        data: {
            id: 'stu1',
            firstName: 'Abel',
            lastName: 'Ibañez',
            dni: 10000001n,
            email: 'nicolasgarcia9812@hotmail.com',
            phone: '2604624001'
        }
    });
    const Alumno2 = await prisma.student.create({
        data: {
            id: 'stu2',
            firstName: 'Nicolás',
            lastName: 'Lopez',
            dni: 10000002n,
            email: 'garcianicolas1298gmail.com',
            phone: '2604621425'
        }
    });

    // 3. Alta de materia y vinculación con profesor
    const Materia1 = await prisma.subject.create({
        data: {
            id: 'subj1',
            name: 'Programacion I',
            academicYear: 2024,
            institution: 'IES 9012',
            degree: 'Desarrollo de Software',
            professor: { connect: { id: Profesor1.id } }
        }
    });

    // 4. Inscripción de alumnos a la materia
    await prisma.subject.update({
        where: { id: Materia1.id },
        data: {
            students: {
                connect: [{ id: Alumno1.id }, { id: Alumno2.id }]
            }
        }
    });

    // 5. Alta de clase en la materia
    const Clase1 = await prisma.class.create({
        data: {
            id: 'class1',
            date: addDays(today, 1),
            description: 'Primera clase de Programacion I',
            subject: { connect: { id: Materia1.id } }
        }
    });
    const Clase2 = await prisma.class.create({
        data: {
            id: 'class2',
            date: addDays(today, 2),
            description: 'Segunda clase de Programacion I',
            subject: { connect: { id: Materia1.id } }
        }
    });

    // 6. Registrar inasistencia de un alumno en la clase
    await prisma.absence.create({
        data: {
            id: 'abs1',
            class: { connect: { id: Clase1.id } },
            student: { connect: { id: Alumno1.id } },
            justified: false
        }
    });
    await prisma.absence.create({
        data: {
            id: 'abs2',
            class: { connect: { id: Clase2.id } },
            student: { connect: { id: Alumno2.id } },
            justified: true
        }
    });

    // 7. Alta de notas: 3 finales (Final1, Final2, Final3), 1 ponderada, 1 promedio
    const Final1 = await prisma.grade.create({
        data: {
            id: 'grade1',
            name: 'TP1',
            type: GradeType.Final,
            date: addDays(today, 1),
            description: 'Final 1',
            subject: { connect: { id: Materia1.id } }
        }
    });
    const Final2 = await prisma.grade.create({
        data: {
            id: 'grade2',
            name: 'TP2',
            type: GradeType.Final,
            date: addDays(today, 2),
            description: 'Final 2',
            subject: { connect: { id: Materia1.id } }
        }
    });
    const Final3 = await prisma.grade.create({
        data: {
            id: 'grade3',
            name: 'TP3',
            type: GradeType.Final,
            date: addDays(today, 3),
            description: 'Final 3',
            subject: { connect: { id: Materia1.id } }
        }
    });
    // Ponderada (usa Final1, Final2, Final3)
    const Ponderada = await prisma.grade.create({
        data: {
            id: 'grade4',
            name: 'Ponderada',
            type: GradeType.Weighted,
            date: addDays(today, 4),
            description: 'Nota ponderada de Final1, Final2 y Final3',
            subject: { connect: { id: Materia1.id } }
        }
    });
    // Promedio (usa Final1, Final2, Final3)
    const Promedio = await prisma.grade.create({
        data: {
            id: 'grade5',
            name: 'Promedio',
            type: GradeType.Average,
            date: addDays(today, 5),
            description: 'Promedio de Final1, Final2 y Final3',
            subject: { connect: { id: Materia1.id } }
        }
    });

    // 8. Relaciones de notas (GradeRelationship para ponderada y promedio)
    // Ponderada: 40% Final1, 30% Final2, 30% Final3
    await prisma.gradeRelationship.create({
        data: {
            id: 'rel1',
            weight: 40,
            derivedGrade: { connect: { id: Ponderada.id } },
            baseGrade: { connect: { id: Final1.id } }
        }
    });
    await prisma.gradeRelationship.create({
        data: {
            id: 'rel2',
            weight: 30,
            derivedGrade: { connect: { id: Ponderada.id } },
            baseGrade: { connect: { id: Final2.id } }
        }
    });
    await prisma.gradeRelationship.create({
        data: {
            id: 'rel3',
            weight: 30,
            derivedGrade: { connect: { id: Ponderada.id } },
            baseGrade: { connect: { id: Final3.id } }
        }
    });
    // Promedio: 1,1,1
    await prisma.gradeRelationship.create({
        data: {
            id: 'rel4',
            weight: 1,
            derivedGrade: { connect: { id: Promedio.id } },
            baseGrade: { connect: { id: Final1.id } }
        }
    });
    await prisma.gradeRelationship.create({
        data: {
            id: 'rel5',
            weight: 1,
            derivedGrade: { connect: { id: Promedio.id } },
            baseGrade: { connect: { id: Final2.id } }
        }
    });
    await prisma.gradeRelationship.create({
        data: {
            id: 'rel6',
            weight: 1,
            derivedGrade: { connect: { id: Promedio.id } },
            baseGrade: { connect: { id: Final3.id } }
        }
    });

    // 9. Cargar notas finales para cada alumno
    await prisma.studentGrade.create({
        data: {
            id: 'sg1',
            value: 8,
            grade: { connect: { id: Final1.id } },
            student: { connect: { id: Alumno1.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg2',
            value: 6,
            grade: { connect: { id: Final1.id } },
            student: { connect: { id: Alumno2.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg3',
            value: 7,
            grade: { connect: { id: Final2.id } },
            student: { connect: { id: Alumno1.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg4',
            value: 9,
            grade: { connect: { id: Final2.id } },
            student: { connect: { id: Alumno2.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg5',
            value: 10,
            grade: { connect: { id: Final3.id } },
            student: { connect: { id: Alumno1.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg6',
            value: 7,
            grade: { connect: { id: Final3.id } },
            student: { connect: { id: Alumno2.id } }
        }
    });

    // 10. Calcular y actualizar las notas ponderadas y promedio para cada alumno
    // Ponderada: 40% Final1 + 30% Final2 + 30% Final3
    const ponderadaAlumno1 = 0.4 * 8 + 0.3 * 7 + 0.3 * 10;
    const ponderadaAlumno2 = 0.4 * 6 + 0.3 * 9 + 0.3 * 7;
    await prisma.studentGrade.create({
        data: {
            id: 'sg7',
            value: Number(ponderadaAlumno1.toFixed(2)),
            grade: { connect: { id: Ponderada.id } },
            student: { connect: { id: Alumno1.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg8',
            value: Number(ponderadaAlumno2.toFixed(2)),
            grade: { connect: { id: Ponderada.id } },
            student: { connect: { id: Alumno2.id } }
        }
    });
    // Promedio: (Final1 + Final2 + Final3) / 3
    const promedioAlumno1 = (8 + 7 + 10) / 3;
    const promedioAlumno2 = (6 + 9 + 7) / 3;
    await prisma.studentGrade.create({
        data: {
            id: 'sg9',
            value: Number(promedioAlumno1.toFixed(2)),
            grade: { connect: { id: Promedio.id } },
            student: { connect: { id: Alumno1.id } }
        }
    });
    await prisma.studentGrade.create({
        data: {
            id: 'sg10',
            value: Number(promedioAlumno2.toFixed(2)),
            grade: { connect: { id: Promedio.id } },
            student: { connect: { id: Alumno2.id } }
        }
    });

    console.log(
        'Seed completo: profesor, alumnos, materia, clases, asistencias, 5 notas (3 finales, ponderada, promedio), relaciones y cálculo de notas automáticas.'
    );
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
