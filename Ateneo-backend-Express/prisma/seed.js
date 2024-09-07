const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Paso 1: Borrar datos existentes en las tablas de manera ordenada
  await prisma.nota_Alumno.deleteMany({});
  await prisma.relacion_Nota.deleteMany({});
  await prisma.inasistencia.deleteMany({});
  await prisma.clase.deleteMany({});
  await prisma.nota.deleteMany({});
  await prisma.materia.deleteMany({});
  await prisma.alumno.deleteMany({});
  await prisma.profesor.deleteMany({});

  // Paso 2: Crear 3 Profesores
  const profesores = await Promise.all([
    prisma.profesor.create({
      data: {
        nombres: "Juan",
        apellidos: "Pérez",
        email: "juan.perez@example.com",
        contrasena: "contrasena123",
        recuperar_contrasena: new Date("2024-09-01T10:00:00Z"),
        correo_activado: true
      }
    }),
    prisma.profesor.create({
      data: {
        nombres: "Ana",
        apellidos: "Martínez",
        email: "ana.martinez@example.com",
        contrasena: "contrasena456",
        recuperar_contrasena: new Date("2024-09-02T11:00:00Z"),
        correo_activado: false
      }
    }),
    prisma.profesor.create({
      data: {
        nombres: "Carlos",
        apellidos: "García",
        email: "carlos.garcia@example.com",
        contrasena: "contrasena789",
        recuperar_contrasena: new Date("2024-09-03T12:00:00Z"),
        correo_activado: true
      }
    })
  ]);

  // Paso 3: Crear 1 Materia para los dos primeros profesores
  await prisma.materia.create({
    data: {
      nombre: "Matemáticas",
      ciclo_lectivo: 2024,
      institucion: "Institución Ejemplo",
      titulo: "Matemáticas Avanzadas",
      profesor: { connect: { id: profesores[0].id } } // Conectar con el primer profesor
    }
  });

  await prisma.materia.create({
    data: {
      nombre: "Programación",
      ciclo_lectivo: 2024,
      institucion: "Institución Ejemplo",
      titulo: "Programador",
      profesor: { connect: { id: profesores[2].id } } // Conectar con el tercer profesor
    }
  });

  console.log("Datos de ejemplo creados exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
