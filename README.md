# Ateneo 🎓

> **Ateneo** es un sistema de gestión académica completo pensado para profesores que dictan materias en diferentes instituciones educativas. Permite a los docentes organizar y administrar materias, gestionar estudiantes, registrar clases con control de asistencia, cargar calificaciones con diferentes tipos de evaluación (finales, ponderadas y promediadas), y generar reportes académicos profesionales en PDF con envío automático por email. El sistema está desarrollado con tecnologías modernas: **Angular** en el frontend, **Node.js + Express** en el backend, y **Prisma ORM** para la gestión de base de datos.

---

## 📋 Tabla de Contenidos

1. [Características Principales](#-características-principales)
2. [Arquitectura del Sistema](#-arquitectura-del-sistema)
3. [Requisitos Previos](#-requisitos-previos)
4. [Instalación Paso a Paso](#-instalación-paso-a-paso)
5. [Comandos Útiles de Prisma](#-comandos-útiles-de-prisma)
6. [Uso del Sistema](#-uso-del-sistema)
7. [Arquitectura y Patrones de Diseño](#️-arquitectura-y-patrones-de-diseño)
8. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
9. [Comandos Disponibles](#-comandos-disponibles)
10. [Solución de Problemas](#-solución-de-problemas)
11. [Despliegue en Producción](#-despliegue-en-producción)
12. [Próximas Mejoras](#-próximas-mejoras-sugeridas)

---

## ✨ Características Principales

### 1. **Gestión de Materias**
- ✅ Crear, editar y eliminar materias
- ✅ Visualizar todas las materias del profesor en un dashboard
- ✅ Ver detalles completos de cada materia (estudiantes, clases, notas)
- ✅ Agregar y remover estudiantes de materias
- ✅ Validación de datos en tiempo real

### 2. **Gestión de Estudiantes**
- ✅ Buscar estudiantes existentes por DNI
- ✅ Crear nuevos estudiantes con validación de datos
- ✅ Editar información de estudiantes (nombre, apellido, email, teléfono)
- ✅ Vincular/desvincular estudiantes a materias
- ✅ Ver el historial académico de cada estudiante

### 3. **Registro de Clases y Asistencia**
- ✅ Crear clases con fecha y descripción
- ✅ Registrar asistencia individual por estudiante
- ✅ Editar clases y asistencias existentes
- ✅ Eliminar clases (con eliminación en cascada de asistencias)
- ✅ Visualización en calendario interactivo
- ✅ Cálculo automático de porcentaje de asistencia por estudiante

### 4. **Sistema de Calificaciones Avanzado**
- ✅ **Notas Finales**: Calificaciones directas del 1 al 10
- ✅ **Notas Ponderadas**: Calculadas automáticamente basándose en otras notas con pesos asignados (el total debe sumar 100%)
- ✅ **Notas Promediadas**: Calculadas como el promedio simple de otras notas base
- ✅ Cargar notas individuales o masivas para todos los estudiantes
- ✅ Editar y eliminar notas con validación de dependencias
- ✅ Prevención de ciclos en relaciones entre notas
- ✅ Visualización en tabla con todas las notas por estudiante

### 5. **Generación de Reportes Académicos**
- ✅ Generar reportes en formato PDF profesional
- ✅ Incluye: datos del estudiante, todas las notas con fechas, porcentaje de asistencia
- ✅ Enviar reportes por email a:
  - El profesor (a sí mismo)
  - Estudiantes individuales o grupos seleccionados
  - Todos los estudiantes de la materia
- ✅ Validación automática de emails disponibles
- ✅ Indicadores visuales de estudiantes con/sin email

### 6. **Autenticación y Seguridad**
- ✅ Registro de profesores con validación de datos
- ✅ Inicio de sesión con JWT (JSON Web Tokens)
- ✅ Recuperación de contraseña mediante código de verificación
- ✅ Códigos de 6 dígitos enviados por email (válidos por 15 minutos)
- ✅ Protección de rutas y endpoints con tokens
- ✅ Actualización de perfil del profesor

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Programa            | Comando de verificación                            | Uso                        |
|---------------------|----------------------------------------------------|----------------------------|
| Visual Studio Code 🖥️ | `code --version`                                  | Editor de código           |
| Node.js y npm 🟩     | `node -v` / `npm -v`                               | Entorno de ejecución JS    |
| Git 🐙              | `git --version`                                    | Control de versiones       |
| MySQL o PostgreSQL 🗄️| `mysql --version` / `psql --version`             | Base de datos              |

---

## 📥 Instalación Paso a Paso

### **Paso 1: Clonar el repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd Ateneo
```

---

## 🛠️ Instalación y ejecución del Backend

### **Paso 2: Instalar dependencias del backend**

```bash
cd Ateneo-backend-Express
npm install
```

### **Paso 3: Configurar variables de entorno**

Crea un archivo `.env` en la raíz de `Ateneo-backend-Express` con las siguientes variables:

```env
# Base de datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ateneo
DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Backend
PORT=3000
URL_BASE=http://localhost:4200

# JWT
JWT_SECRET_KEY=tu_clave_secreta_muy_segura

# SMTP (opcional - solo si usarás envío de emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
SMTP_SENDER_NAME=Sistema Ateneo
```

**Notas importantes:**
- Reemplaza los valores de ejemplo por tus propios datos
- Para Gmail, usa una [Contraseña de Aplicación](https://myaccount.google.com/apppasswords), no tu contraseña normal
- Si usas PostgreSQL, cambia el `DATABASE_URL` a: `postgresql://usuario:contraseña@localhost:5432/ateneo`

### **Paso 4: Configurar el motor de base de datos**

Asegúrate de que el archivo `prisma/schema.prisma` tenga el proveedor correcto:

**Para MySQL:**
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**Para PostgreSQL:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### **Paso 5: Crear la base de datos y ejecutar migraciones**

```bash
npx prisma migrate dev --name init
```

Este comando:
- Crea la base de datos si no existe
- Aplica todas las migraciones
- Genera el cliente de Prisma

### **Paso 6: (Opcional) Cargar datos de prueba**

```bash
npm run seed
```

### **Paso 7: Iniciar el servidor backend**

```bash
npm start
```

El backend estará corriendo en `http://localhost:3000` (o el puerto que configuraste).

---

## 🖼️ Instalación y ejecución del Frontend

### **Paso 8: Instalar dependencias del frontend**

Abre una **nueva terminal** y ejecuta:

```bash
cd Ateneo-frontend-Angular
npm install
```

### **Paso 9: Configurar la URL del backend**

Si tu backend NO está en `http://localhost:3000`, edita el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // Cambia esto si es necesario
};
```

### **Paso 10: Iniciar la aplicación Angular**

```bash
npm start
```

El frontend estará disponible en `http://localhost:4200`.

---

## ✅ ¡Listo para usar!

1. Abre tu navegador en `http://localhost:4200`
2. Regístrate como profesor
3. Comienza a crear materias y gestionar estudiantes

---

## 🏗️ Resumen de Arquitectura y Separación de Responsabilidades

### **¿Por qué separar Frontend y Backend?**

Ateneo implementa una **arquitectura de dos capas** (Frontend y Backend separados) que permite:

- ✅ **Escalabilidad independiente**: Cada parte puede crecer sin afectar a la otra
- ✅ **Desarrollo paralelo**: Equipos diferentes pueden trabajar simultáneamente
- ✅ **Reutilización**: El backend puede servir a múltiples clientes (web, móvil, desktop)
- ✅ **Despliegue independiente**: Actualizar el frontend no requiere tocar el backend y viceversa

---

### **🎨 Frontend - Angular: Clean Architecture + MVVM**

El frontend está organizado en **capas separadas** donde cada parte tiene una única responsabilidad:
- La **lógica de negocio** (reglas del sistema) está separada de la **interfaz visual** (lo que ve el usuario)
- Usamos servicios intermedios llamados **"ViewModel"** que conectan la pantalla con los datos y mantienen todo sincronizado
- Los componentes son **pequeños y reutilizables**, como piezas de LEGO que se usan en múltiples lugares
- Esto hace que el código sea ordenado, fácil de probar y simple de modificar en el futuro

---

### **⚙️ Backend - Express: Arquitectura en Capas**

El backend está dividido en **3 capas principales** que trabajan en secuencia:

**1. Handlers** → Reciben las peticiones HTTP del frontend y devuelven respuestas  
**2. Controllers** → Ejecutan la lógica de negocio (las reglas y validaciones del sistema)  
**3. Helpers** → Se comunican directamente con la base de datos usando Prisma

**¿Por qué separar en capas?**
- Cada capa hace **una sola cosa** y la hace bien
- Podemos **cambiar una capa sin romper las demás** (por ejemplo, cambiar la base de datos sin tocar la lógica)
- El código es más **fácil de testear y mantener**
- Podemos **reutilizar funciones** en diferentes partes del sistema

**Tecnologías usadas:**
- **Node.js + Express**: Stack estándar para crear APIs REST
- **Prisma ORM**: Herramienta moderna para trabajar con bases de datos de forma segura
- **JWT**: Sistema de autenticación con tokens
- **bcrypt**: Para encriptar contraseñas de forma segura

---

**¡Gracias por usar Ateneo! 🎓**


