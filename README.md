# Ateneo 🎓

> **Ateneo** es un sistema de gestión académica pensado para profesores que dictan materias en diferentes instituciones. Permite a los docentes organizar y administrar las materias que dictan, gestionar los alumnos de cada materia, registrar clases, cargar y consultar notas, y generar reportes tanto para los alumnos como para sí mismos. El sistema también facilita la comunicación con los estudiantes y el seguimiento académico personalizado. Está compuesto por un backend en Node.js (Express + Prisma) y un frontend en Angular.

---



## ✨ ¿Qué puede hacer el usuario?

1. **Gestionar materias y estudiantes:** Crear, editar y eliminar materias, vincular y administrar estudiantes en cada materia.
2. **Registrar y consultar clases y asistencia:** Agregar clases, editar detalles, registrar asistencia y consultar el historial de clases y asistencias.
3. **Cargar, editar y consultar calificaciones:** Registrar notas por estudiante y materia, editar o eliminar calificaciones y visualizar el historial académico.
4. **Generar y enviar reportes académicos:** Obtener resúmenes y reportes detallados por materia y por estudiante, listos para imprimir o compartir por email, con validación automática de destinatarios.
5. **Administrar su perfil y autenticación:** Registrarse, iniciar sesión, recuperar contraseña mediante código de verificación enviado por email, y gestionar sus datos como profesor, accediendo a todas las funcionalidades desde una interfaz web moderna.

---

## 🛠️ Aspectos técnicos principales

1. **Frontend en Angular:** Interfaz web modular, con componentes reutilizables, paneles y modales avanzados para todas las acciones principales.
2. **Backend en Express + Prisma:** API REST robusta y segura, con rutas para todas las entidades y operaciones CRUD, gestión de base de datos relacional y generación dinámica de reportes académicos en múltiples formatos.
3. **ORM Prisma:** Migraciones, generación de cliente, administración y sincronización de esquema de base de datos mediante scripts npm.
4. **Autenticación JWT:** Seguridad en el acceso y gestión de sesiones para profesores.
5. **Recuperación de contraseña:** Sistema de recuperación segura mediante código de verificación de 6 dígitos enviado por email, con validación de expiración (15 minutos).
6. **Integración con Gmail/SMTP:** Envío transaccional de reportes académicos y códigos de verificación por email con adjuntos PDF utilizando Nodemailer y Gmail. Soporta envío individual a estudiantes o al profesor.
7. **Generación de PDFs:** Sistema de generación automática de reportes académicos con diseño profesional, incluyendo notas, asistencias y datos del estudiante.
8. **Arquitectura escalable:** Separación clara de responsabilidades (controllers, handlers, helpers), estructura organizada en capas y posibilidad de extender funcionalidades fácilmente.


---

## 🚦 Requisitos previos al desarrollo

| Programa            | Comando de verificación/instalación                | Uso                        |
|---------------------|----------------------------------------------------|----------------------------|
| Visual Studio Code 🖥️ | `code`                                            | Editor de código           |
| Node.js y npm 🟩     | `node -v` / `npm -v`                               | Entorno de ejecución JS    |
| Git 🐙              | `git --version`                                    | Control de versiones       |
| Angular CLI 🅰️      | `npm install -g @angular/cli`                      | CLI para Angular           |
| Prisma CLI 💎        | `npm install -g prisma`                            | ORM para Node.js           |

---

## 📥 Clonar el repositorio

```cmd
git clone <URL_DEL_REPOSITORIO>
cd Ateneo
```

---

## 🛠️ Instalación y ejecución del Backend

1. Entra a la carpeta del backend:
   ```cmd
   cd Ateneo-backend-Express
   ```
2. Instala las dependencias:
   ```cmd
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz de `Ateneo-backend-Express` y completa **todas** las siguientes variables:
     ```env
     DB_USER=<usuario_de_bd>
     DB_PASSWORD=<contraseña_de_bd>
     DB_HOST=<host_de_bd>
     DB_PORT=<puerto_de_bd>
     DB_NAME=<nombre_de_bd>
     PORT=<puerto_backend>
     URL_BASE=<url_del_frontend>
     DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
     JWT_SECRET_KEY=<clave_secreta_para_tokens>
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=<tu_correo@gmail.com>
     SMTP_PASS=<tu_contraseña_de_aplicacion_sin_espacios>
     SMTP_SENDER_NAME=Sistema Ateneo
     ```
   - Reemplaza los valores entre <> por los datos reales de tu entorno.
   - **Todas las variables son necesarias para que el sistema funcione correctamente.**
   - Las variables de SMTP son opcionales solo si no usarás la funcionalidad de envío de emails. Si deseas enviar reportes por correo con Gmail, debes configurarlas.


    #### 🔗 ¿Qué motor de base de datos puedo usar?
    Puedes usar **PostgreSQL** o **MySQL**. Debes tener el motor instalado y corriendo en tu máquina o usar un servicio en la nube.

    - Para **PostgreSQL**:
       ```env
       DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/ateneo"
       ```
    - Para **MySQL**:
       ```env
       DATABASE_URL="mysql://usuario:contraseña@localhost:3306/ateneo"
       ```

   #### ⚙️ ¿Dónde se configura el motor?
   - En el archivo `Ateneo-backend-Express/prisma/schema.prisma`, la primera línea debe indicar el proveedor:
     ```prisma
     datasource db {
       provider = "postgresql" // o "mysql"
       url      = env("DATABASE_URL")
     }
     ```
   - Asegúrate de que el valor de `provider` coincida con el tipo de base de datos que usas en `DATABASE_URL`.


4. Crea la migración inicial de la base de datos:
    - Una vez configurado el archivo `schema.prisma` y las variables de entorno, ejecuta:
       ```bash
       npx prisma migrate dev --name init
       ```
    - Esto generará la migración inicial y aplicará los cambios en tu base de datos.
    - Si cambias de motor (por ejemplo, de MySQL a PostgreSQL), elimina la base de datos y la carpeta `prisma/migrations/` antes de crear la migración inicial nuevamente:
       ```bash
       rm -rf Ateneo-backend-Express/prisma/migrations
       # Borra la base de datos manualmente desde tu gestor (MySQL/Postgres)
       ```
---


## 🧩 Comandos útiles de Prisma

Ejecuta estos comandos dentro de la carpeta `Ateneo-backend-Express` usando npm:

| Comando                                 | Descripción                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `npm run prisma:migrate`                | Ejecuta migraciones y actualiza la base de datos          |
| `npm run prisma:reset`                  | Resetea la base de datos y aplica todas las migraciones   |
| `npm run prisma:generate`               | Genera el cliente de Prisma según el esquema              |
| `npm run prisma:studio`                 | Abre Prisma Studio para visualizar y editar datos         |
| `npm run prisma:dbpush`                 | Sincroniza el esquema Prisma con la base de datos         |
| `npm run prisma:status`                 | Muestra el estado de las migraciones                      |
| `npm run prisma:format`                 | Formatea el archivo `schema.prisma`                       |

Para borrar todas las migraciones existentes:
```bash
rm -rf Ateneo-backend-Express/prisma/migrations
# Borra la base de datos manualmente desde tu gestor
```

Para crear una nueva migración personalizada:
```bash
npm run prisma:migrate -- --name <nombre>
```

Estos comandos te permiten gestionar el ciclo de vida de la base de datos y el esquema de manera sencilla.

5. (Opcional) Ejecuta el seed para datos iniciales:
   ```cmd
   npm run seed
   ```
6. Inicia el servidor backend:
   ```cmd
   npm start
   ```
   El backend estará corriendo normalmente en `http://localhost:3000` (o el puerto configurado).

---

## 🖼️ Instalación y ejecución del Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```cmd
   cd Ateneo-frontend-Angular
   ```
2. Instala las dependencias:
   ```cmd
   npm install
   ```
3. Inicia la aplicación Angular:
   ```cmd
   npm start
   ```
   El frontend estará disponible en `http://localhost:4200`.

---

## ℹ️ Notas adicionales

- ✅ Asegúrate de que el backend esté corriendo antes de usar el frontend.
- 🔄 Si tienes problemas con dependencias, verifica la versión de Node.js recomendada en la documentación de Angular y Prisma.
- 📝 Puedes personalizar las variables de entorno según tu entorno local.
- 📦 Si necesitas instalar dependencias manualmente, usa `npm install <paquete>`.

---

¡Listo! 🚀 Ahora puedes desarrollar y probar el sistema Ateneo en tu entorno local.
