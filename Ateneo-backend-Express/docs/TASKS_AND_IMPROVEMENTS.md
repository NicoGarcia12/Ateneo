# Tareas y mejoras propuestas 🚀

Este documento lista las tareas de mejora para el backend, explica qué cambia en cada una, incluye ejemplos de cómo quedaría un handler / controller / helper y por qué es mejor.

**Leyenda de estados (tabla):** ✅ = hecho, 🔧 = en progreso, ⏳ = por hacer

|   # | Estado | Tarea                                                                  | Qué cambia                                                                                   | Impacto                                                                   |
| --: | :----: | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
|  1️⃣ |   ✅   | Refactorizar handlers/controllers/helpers al patrón consistente        | Handlers ligeros → Controllers con lógica y errores → Helpers sólo acceso a BD               | Menos duplicación, errores de dominio centralizados, código más testeable |
|  2️⃣ |   ✅   | Finalizar migración a Prisma singleton                                 | Todos los helpers usan `src/config/prisma.ts` en vez de instanciar `PrismaClient` localmente | Evita churn de conexiones, mejora rendimiento y estabilidad               |
|  3️⃣ |   ✅   | Normalizar firmas a objetos de parámetros (DTOs)                       | Todas las funciones públicas reciben un único objeto tipado (ej. `{ classId, description }`) | claridad en params, backward-compatible, más fácil extender               |
|  4️⃣ |   ✅   | Forzar controllers llamen a otros controllers para checks cross-entity | ControllerA llama a ControllerB (no a HelperB) para validaciones de negocio                  | Un único lugar para lanzar errores de dominio por entidad                 |
|  5️⃣ |   ✅   | Centralizar manejo de errores en handlers                              | Todos los handlers usan `handleControllerError(error, res)`                                  | Respuestas HTTP consistentes y menos lógica repetida                      |
|  6️⃣ |   ⏳   | Ejecutar build y corregir errores estáticos                            | `npm run build` y resolver los TypeScript errors                                             | Evitar regresiones de tipos e imports rotos                               |
|  7️⃣ |   ⏳   | Agregar pruebas unitarias mínimas                                      | Tests para controladores clave (happy path + 1-2 errores)                                    | Detectar regresiones y asegurar reglas de negocio                         |
|  8️⃣ |   ⏳   | Documentación de convenciones                                          | `docs/CONVENTIONS.md` con ejemplos y reglas                                                  | Facilita la adopción por nuevos contribuyentes                            |

---

## 1️⃣ Refactorizar handlers/controllers/helpers al patrón consistente ✨

Qué cambio: Handlers mínimos, controllers que contengan toda la lógica, helpers sólo consultas/updates.

Ejemplo:

`src/handlers/class/get-class-handler.ts`

```ts
import { Request, Response } from 'express';
import { GetClassController } from 'src/controllers/class/get-class-controller';
import { handleControllerError } from 'src/utils/error-handler';

export const GetClassHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { classId } = req.params;
        const result = await GetClassController({ classId });
        return res.status(200).json(result);
    } catch (err: any) {
        return handleControllerError(err, res);
    }
};
```

`src/controllers/class/get-class-controller.ts`

```ts
import { GetClassHelper } from 'src/helpers/class/get-class-helper';
import { NotFoundError } from 'src/utils/custom-errors';

export interface GetClassControllerParams {
    classId: string;
}

export const GetClassController = async ({ classId }: GetClassControllerParams) => {
    const classData = await GetClassHelper({ classId });
    if (!classData) throw new NotFoundError('Clase no encontrada');
    return classData;
};
```

`src/helpers/class/get-class-helper.ts`

```ts
import { prisma } from 'src/config/prisma';

export const GetClassHelper = async ({ classId }: { classId: string }) => {
    try {
        return await prisma.class.findUnique({ where: { id: classId } });
    } catch (e) {
        throw e;
    }
};
```

Por qué es mejor:

-   Contrato claro entre capas.
-   Errores de dominio centralizados en controllers.
-   Helpers simples y fáciles de testear.

### Estado actual

Las Tareas 1, 3 y 4 fueron aplicadas a los paquetes principales en la rama actual (ej.: `class`, `subject`, `student`, `professor`). Los handlers, controllers y helpers han sido normalizados: controladores lanzan errores de negocio, helpers usan el `prisma` singleton, y las firmas públicas fueron tipadas a objetos. Se recomienda ejecutar la build para validar tipos globales y confirmar que no hay imports rotos.

---

## 2️⃣ Finalizar migración a Prisma singleton 🧩

`src/config/prisma.ts` debe exportar:

```ts
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

Luego todos los helpers usan `import { prisma } from 'src/config/prisma';`.

Por qué es mejor:

-   Evita crear/destruir clientes Prisma en cada helper.
-   Mejora performance y estabilidad.

---

## 3️⃣ Normalizar firmas a objetos de parámetros (DTOs) 🧾

Ejemplo:

```ts
export interface UpdateClassControllerParams {
    classId: string;
    description?: string | null;
    studentsWithAbsences?: string[];
}

export const UpdateClassController = async (params: UpdateClassControllerParams) => {
    const { classId, description, studentsWithAbsences } = params;
    // ...
};
```

Por qué:

-   Evita errores por orden de parámetros.
-   Fácil extender sin romper llamadas.

---

## 4️⃣ Forzar controllers llamen a otros controllers para checks cross-entity 🔁

Ejemplo:

```ts
await GetSubjectController({ subjectId }); // lanzará NotFoundError si no existe
const students = await GetStudentsBySubjectController({ subjectId });
```

Por qué:

-   Un solo punto de verdad por entidad.
-   Evita duplicar reglas y inconsistencias.

---

## 5️⃣ Centralizar manejo de errores en handlers ⚖️

Ejemplo:

```ts
try {
    const r = await SomeController(params);
    return res.status(200).json(r);
} catch (err) {
    return handleControllerError(err, res);
}
```

Por qué:

-   Respuestas HTTP unificadas.
-   `handleControllerError` mapea errores a códigos HTTP.

---

## 6️⃣ Ejecutar build y corregir errores estáticos 🔧

Pasos sugeridos:

```powershell
# si PowerShell bloquea scripts, usar cmd:
cmd /c npm install
cmd /c npm run build
```

O en PowerShell con política temporal:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
npm run build
```

Por qué:

-   Detecta imports/firmas inconsistentes.

---

## 7️⃣ Agregar pruebas unitarias mínimas 🧪

Tests sugeridos:

-   `GetClassController`: happy path y NotFound
-   `UpdateClassController`: student inválido -> ValidationError; happy path

Herramientas: Jest + ts-jest o vitest.

---

## 8️⃣ Documentación de convenciones 📚

Crear `docs/CONVENTIONS.md` con las reglas y ejemplos.

---

## Notas finales

-   Recomiendo abordar las tareas por batches: primero `class` (handlers/controllers/helpers), luego `subject` y `student`, etc.
-   Después de cada batch, ejecutar `npm run build` y correr los tests.

---

Si querés, puedo ahora:

-   Aplicar la Tarea 1 para el paquete `class` y generar los parches.
-   O generar `docs/CONVENTIONS.md` y `docs/TASKS_AND_IMPROVEMENTS.md` adicionales.

Decime con cuál te gustaría que continúe.
