# Ateneo 🎓

> **Ateneo** es un sistema de gestión académica pensado para profesores que dictan materias en diferentes instituciones. Permite a los docentes organizar y administrar las materias que dictan, gestionar los alumnos de cada materia, registrar clases, cargar y consultar notas, y generar reportes tanto para los alumnos como para sí mismos. El sistema también facilita la comunicación con los estudiantes y el seguimiento académico personalizado. Está compuesto por un backend en Node.js (Express + Prisma) y un frontend en Angular.

---

## ✨ Características principales

- Gestión de materias dictadas por el profesor en distintas instituciones
- Administración de alumnos por materia
- Registro de clases dictadas y asistencia
- Carga y consulta de calificaciones
- Generación de reportes académicos para alumnos y para el propio docente
- Comunicación y seguimiento académico con los estudiantes
- Interfaz web moderna y fácil de usar
- API REST segura y escalable

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
     ```
   - Reemplaza los valores entre <> por los datos reales de tu entorno.
   - **Todas las variables son necesarias para que el sistema funcione correctamente.**


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

- **Crear la primera migración:**
   ```bash
   npx prisma migrate dev --name init
   ```
- **Borrar todas las migraciones existentes:**
   ```bash
   rm -rf Ateneo-backend-Express/prisma/migrations
   # Borra la base de datos manualmente desde tu gestor
   ```
- **Crear una nueva migración (actualizar el esquema):**
   ```bash
   npx prisma migrate dev --name <nombre>
   ```
- **Levantar Prisma Studio (UI para la base de datos):**
   ```bash
   npx prisma studio
   ```
- **Resetear la base de datos y aplicar todas las migraciones:**
   ```bash
   npx prisma migrate reset
   ```
- **Generar el cliente de Prisma manualmente:**
   ```bash
   npx prisma generate
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

## 💎 Comandos útiles de Prisma

Ejecuta estos comandos dentro de la carpeta `Ateneo-backend-Express`:

| Comando                        | Descripción                                               |
|---------------------------------|-----------------------------------------------------------|
| `npx prisma migrate dev`        | Ejecuta migraciones y actualiza la base de datos          |
| `npx prisma migrate reset`      | Resetea la base de datos y aplica todas las migraciones   |
| `npx prisma generate`           | Genera el cliente de Prisma según el esquema              |
| `npx prisma studio`             | Abre Prisma Studio para visualizar y editar datos         |
| `npx prisma db push`            | Sincroniza el esquema Prisma con la base de datos         |
| `npx prisma migrate status`     | Muestra el estado de las migraciones                      |
| `npx prisma format`             | Formatea el archivo `schema.prisma`                       |

---

¡Listo! 🚀 Ahora puedes desarrollar y probar el sistema Ateneo en tu entorno local.
