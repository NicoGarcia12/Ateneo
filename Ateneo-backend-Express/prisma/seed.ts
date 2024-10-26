import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Crear dos profesores
    const professor1 = await prisma.professor.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            emailActivated: true,
        },
    });

    const professor2 = await prisma.professor.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'password456',
            emailActivated: true,
        },
    });

    // Crear tres materias: una para el primer profesor y dos para el segundo
    await prisma.subject.create({
        data: {
            name: 'Matemáticas',
            academicYear: 2023,
            institution: 'Universidad Nacional',
            degree: 'Licenciatura en Matemáticas',
            professor: {
                connect: { id: professor1.id },
            },
        },
    });

    await prisma.subject.create({
        data: {
            name: 'Física',
            academicYear: 2023,
            institution: 'Universidad Nacional',
            degree: 'Licenciatura en Física',
            professor: {
                connect: { id: professor2.id },
            },
        },
    });

    await prisma.subject.create({
        data: {
            name: 'Química',
            academicYear: 2023,
            institution: 'Universidad Nacional',
            degree: 'Licenciatura en Química',
            professor: {
                connect: { id: professor2.id },
            },
        },
    });

    console.log('Datos insertados exitosamente.');
}

main()
    .catch((e) => {
        console.error(e);
        // process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
