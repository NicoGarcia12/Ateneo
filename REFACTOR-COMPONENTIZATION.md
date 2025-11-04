# Plan de Refactorización y Componentización - SubjectDetailsComponent

## 📋 Análisis del Estado Actual

El componente `SubjectDetailsComponent` actualmente tiene:
- **832 líneas de código** en el archivo TypeScript
- **398 líneas de código** en el archivo HTML
- **741 líneas de código** en el archivo SCSS
- **Múltiples responsabilidades**: gestión de tabla, calendario, modales, formularios, etc.

### Problemas Identificados:
1. ✗ **Violación del principio de responsabilidad única** - el componente hace demasiadas cosas
2. ✗ **Dificultad de mantenimiento** - cualquier cambio requiere modificar un archivo gigante
3. ✗ **Baja reutilización** - la lógica está acoplada y no puede reutilizarse
4. ✗ **Testing complejo** - difícil de probar debido a la cantidad de dependencias
5. ✗ **Rendimiento** - Angular debe verificar cambios en un componente muy grande

---

## 🎯 Objetivos de la Refactorización

1. **Separar responsabilidades** en componentes más pequeños y manejables
2. **Mejorar la reusabilidad** de componentes
3. **Facilitar el testing** con componentes más pequeños y enfocados
4. **Optimizar el rendimiento** con OnPush change detection
5. **Reducir la complejidad** del componente principal

---

## 🧩 Propuesta de Componentización

### 1. **GradesTableComponent** (Componente de la Tabla de Notas)

**Responsabilidad:** Mostrar la tabla de estudiantes con sus notas

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/grades-table/
  ├── grades-table.component.ts
  ├── grades-table.component.html
  ├── grades-table.component.scss
  └── grades-table-view-model.service.ts (opcional)
```

**Inputs:**
- `students: Student[]` - Lista de estudiantes
- `grades: Grade[]` - Lista de notas
- `displayedColumns: string[]` - Columnas a mostrar

**Outputs:**
- `editGrade: EventEmitter<string>` - Emite el ID de la nota a editar
- `loadStudentGrades: EventEmitter<string>` - Emite el ID de la nota para cargar notas de estudiantes

**Métodos a mover:**
- `getStudentGradeValue()`
- `isGradeFinal()`

**Beneficios:**
- ✓ Tabla reutilizable en otros contextos
- ✓ Lógica de renderizado aislada
- ✓ Fácil de testear
- ✓ Puede usar OnPush change detection

---

### 2. **ClassCalendarComponent** (Componente del Calendario)

**Responsabilidad:** Mostrar el calendario de clases y gestionar la selección de fechas

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/class-calendar/
  ├── class-calendar.component.ts
  ├── class-calendar.component.html
  ├── class-calendar.component.scss
  └── class-calendar-view-model.service.ts (opcional)
```

**Inputs:**
- `specialDates: Date[]` - Fechas con clases cargadas
- `selectedDate: Date | null` - Fecha seleccionada

**Outputs:**
- `dateSelected: EventEmitter<Date>` - Emite la fecha seleccionada

**Métodos a mover:**
- `dateClass()`
- `formatDateToDDMMYYYY()`

**Beneficios:**
- ✓ Calendario reutilizable
- ✓ Lógica de fechas aislada
- ✓ Fácil de personalizar

---

### 3. **ClassDetailsModalComponent** (Modal de Detalles de Clase)

**Responsabilidad:** Mostrar y editar los detalles de una clase (inasistencias, descripción)

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/class-details-modal/
  ├── class-details-modal.component.ts
  ├── class-details-modal.component.html
  ├── class-details-modal.component.scss
  └── class-details-modal-view-model.service.ts
```

**Inputs:**
- `classData: Class | null` - Datos de la clase
- `students: Student[]` - Lista de estudiantes
- `isEditMode: boolean` - Modo de edición

**Outputs:**
- `classSaved: EventEmitter<Class>` - Emite la clase guardada
- `classDeleted: EventEmitter<string>` - Emite el ID de la clase eliminada

**Métodos a mover:**
- `toggleEditMode()`
- `addStudentToLoadedClass()`
- `removeStudentFromLoadedClass()`
- `saveClassChanges()`
- `deleteClass()`

**Beneficios:**
- ✓ Modal reutilizable para editar clases
- ✓ Lógica de edición aislada
- ✓ Fácil de testear

---

### 4. **AddClassModalComponent** (Modal para Agregar Clase)

**Responsabilidad:** Agregar una nueva clase con inasistencias

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/add-class-modal/
  ├── add-class-modal.component.ts
  ├── add-class-modal.component.html
  ├── add-class-modal.component.scss
  └── add-class-modal-view-model.service.ts
```

**Inputs:**
- `students: Student[]` - Lista de estudiantes
- `selectedDate: Date` - Fecha de la clase

**Outputs:**
- `classAdded: EventEmitter<Class>` - Emite la clase agregada

**Métodos a mover:**
- `toggleModalView()`
- `addSelectedStudent()`
- `removeSelectedStudent()`
- `addClass()`

**Beneficios:**
- ✓ Modal reutilizable
- ✓ Lógica de creación aislada

---

### 5. **AddStudentButtonComponent** (Botón y Modal para Agregar Estudiante)

**Responsabilidad:** Buscar y agregar estudiantes a la materia

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/add-student-button/
  ├── add-student-button.component.ts
  ├── add-student-button.component.html
  ├── add-student-button.component.scss
  └── add-student-button-view-model.service.ts
```

**Inputs:**
- `subjectId: string` - ID de la materia
- `currentStudents: Student[]` - Estudiantes actuales de la materia

**Outputs:**
- `studentAdded: EventEmitter<void>` - Emite cuando se agrega un estudiante

**Métodos a mover:**
- `openAddStudentModal()`
- `searchStudentByDni()`
- `addStudent()`
- `onNewStudentFormChange()`
- Validaciones: `isFirstNameInvalid`, `isLastNameInvalid`, `isEmailInvalid`, `isNewStudentFormValid`

**Beneficios:**
- ✓ Componente autocontenido
- ✓ Reutilizable en otros contextos
- ✓ Lógica de validación aislada

---

### 6. **EditGradeModalComponent** (Modal para Editar Nota)

**Responsabilidad:** Editar los datos de una nota existente

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/edit-grade-modal/
  ├── edit-grade-modal.component.ts
  ├── edit-grade-modal.component.html
  ├── edit-grade-modal.component.scss
  └── edit-grade-modal-view-model.service.ts
```

**Inputs:**
- `grade: Grade` - Nota a editar
- `availableGrades: Grade[]` - Notas disponibles para seleccionar como base

**Outputs:**
- `gradeSaved: EventEmitter<Grade>` - Emite la nota guardada

**Métodos a mover:**
- `openEditGradeModal()`
- `onEditGradeFormChange()`
- `onEditGradeTypeChange()`
- `onEditBaseGradeSelect()`
- `removeEditBaseGrade()`
- `onEditWeightChange()`
- `getEditTotalWeight()`
- `validateEditGradeForm()`
- `saveEditGrade()`

**Beneficios:**
- ✓ Modal reutilizable
- ✓ Lógica de edición aislada
- ✓ Similar a AddGradeButtonComponent (consistencia)

---

### 7. **LoadStudentGradesModalComponent** (Modal para Cargar Notas de Estudiantes)

**Responsabilidad:** Cargar/editar notas de estudiantes para una nota Final

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/load-student-grades-modal/
  ├── load-student-grades-modal.component.ts
  ├── load-student-grades-modal.component.html
  ├── load-student-grades-modal.component.scss
  └── load-student-grades-modal-view-model.service.ts
```

**Inputs:**
- `grade: Grade` - Nota para la cual cargar las notas de estudiantes
- `students: Student[]` - Lista de estudiantes

**Outputs:**
- `gradesSaved: EventEmitter<void>` - Emite cuando se guardan las notas

**Métodos a mover:**
- `openLoadStudentGradesModal()`
- `onLoadStudentGradeChange()`
- `validateLoadStudentGrades()`
- `saveLoadStudentGrades()`

**Beneficios:**
- ✓ Modal reutilizable
- ✓ Lógica de carga de notas aislada
- ✓ Similar a AddGradeButtonComponent (consistencia)

---

### 8. **SubjectActionsComponent** (Botones de Acciones de Materia)

**Responsabilidad:** Agrupar los botones de acciones generales de la materia

**Ubicación sugerida:**
```
src/app/ui/pages/dashboard/subjects/subject-details/components/subject-actions/
  ├── subject-actions.component.ts
  ├── subject-actions.component.html
  └── subject-actions.component.scss
```

**Inputs:**
- `subjectId: string` - ID de la materia

**Outputs:**
- `generateReport: EventEmitter<void>`
- `editSubject: EventEmitter<void>`
- `deleteSubject: EventEmitter<void>`

**Beneficios:**
- ✓ Agrupa acciones relacionadas
- ✓ Fácil de extender con nuevas acciones

---

## 📦 Estructura de Carpetas Propuesta

```
subject-details/
├── subject-details.component.ts (Componente orquestador - ~150 líneas)
├── subject-details.component.html (~50 líneas)
├── subject-details.component.scss (~100 líneas)
├── subject-details-view-model.service.ts (Lógica de negocio centralizada)
└── components/
    ├── grades-table/
    │   ├── grades-table.component.ts
    │   ├── grades-table.component.html
    │   └── grades-table.component.scss
    ├── class-calendar/
    │   ├── class-calendar.component.ts
    │   ├── class-calendar.component.html
    │   └── class-calendar.component.scss
    ├── class-details-modal/
    │   ├── class-details-modal.component.ts
    │   ├── class-details-modal.component.html
    │   ├── class-details-modal.component.scss
    │   └── class-details-modal-view-model.service.ts
    ├── add-class-modal/
    │   ├── add-class-modal.component.ts
    │   ├── add-class-modal.component.html
    │   ├── add-class-modal.component.scss
    │   └── add-class-modal-view-model.service.ts
    ├── add-student-button/
    │   ├── add-student-button.component.ts
    │   ├── add-student-button.component.html
    │   ├── add-student-button.component.scss
    │   └── add-student-button-view-model.service.ts
    ├── edit-grade-modal/
    │   ├── edit-grade-modal.component.ts
    │   ├── edit-grade-modal.component.html
    │   ├── edit-grade-modal.component.scss
    │   └── edit-grade-modal-view-model.service.ts
    ├── load-student-grades-modal/
    │   ├── load-student-grades-modal.component.ts
    │   ├── load-student-grades-modal.component.html
    │   ├── load-student-grades-modal.component.scss
    │   └── load-student-grades-modal-view-model.service.ts
    ├── subject-actions/
    │   ├── subject-actions.component.ts
    │   ├── subject-actions.component.html
    │   └── subject-actions.component.scss
    └── add-grade-button/ (ya existe)
        ├── add-grade-button.component.ts
        ├── add-grade-button.component.html
        ├── add-grade-button.component.scss
        └── add-grade-button-view-model.service.ts
```

---

## 🔄 SubjectDetailsComponent Refactorizado (Orquestador)

Después de la refactorización, el componente principal quedaría así:

### HTML (~50 líneas):
```html
<div class="subject-details-container">
    <app-grades-table
        [students]="studentsList"
        [grades]="gradesList"
        [displayedColumns]="displayedColumns"
        (editGrade)="onEditGrade($event)"
        (loadStudentGrades)="onLoadStudentGrades($event)"
    ></app-grades-table>

    <app-class-calendar
        [specialDates]="specialDates"
        [selectedDate]="selectedDate"
        (dateSelected)="onDateSelected($event)"
    ></app-class-calendar>

    <div class="buttons-container">
        <app-add-student-button
            [subjectId]="idSubject"
            [currentStudents]="studentsList"
            (studentAdded)="onDataChanged()"
        ></app-add-student-button>

        <app-add-grade-button
            [grades]="viewModel.grades$ | async"
            [subjectId]="idSubject"
            [students]="studentsList"
            (gradeAdded)="onDataChanged()"
        ></app-add-grade-button>

        <app-subject-actions
            [subjectId]="idSubject"
            (generateReport)="onGenerateReport()"
            (editSubject)="onEditSubject()"
            (deleteSubject)="onDeleteSubject()"
        ></app-subject-actions>
    </div>
</div>

<!-- Modales gestionados por componentes hijos -->
```

### TypeScript (~150 líneas):
```typescript
@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
    public idSubject: string = '';
    public selectedDate: Date | null = null;
    public studentsList: Student[] = [];
    public specialDates: Date[] = [];
    public displayedColumns: string[] = [];
    public gradesList: Grade[] = [];

    private subscriptions = new Subscription();

    constructor(
        public viewModel: SubjectDetailsViewModelService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService
    ) {}

    public ngOnInit(): void {
        this.initializeSubject();
        this.subscribeToData();
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private initializeSubject(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            const subjectId = params.get('idSubject');
            if (!subjectId) {
                this.router.navigate(['/dashboard/subjects']);
                return;
            }
            this.idSubject = subjectId;
            this.loadAllData();
        });
    }

    private subscribeToData(): void {
        this.subscriptions.add(
            this.viewModel.students$.subscribe((students) => {
                this.studentsList = students;
            })
        );

        this.subscriptions.add(
            this.viewModel.classes$.subscribe((classes) => {
                this.specialDates = classes
                    .map((c) => (c.date ? new Date(c.date) : null))
                    .filter((d): d is Date => d !== null);
            })
        );

        this.subscriptions.add(
            this.viewModel.grades$.subscribe((grades: Grade[]) => {
                this.gradesList = grades;
                this.displayedColumns = ['identification', 'name', ...grades.map(g => g.id), 'attendance'];
            })
        );
    }

    private loadAllData(): void {
        this.viewModel.loadStudents(this.idSubject);
        this.viewModel.loadClasses(this.idSubject);
        this.viewModel.loadGrades(this.idSubject);
    }

    public onDataChanged(): void {
        this.loadAllData();
    }

    public onDateSelected(date: Date): void {
        // Lógica delegada a modales específicos
    }

    public onEditGrade(gradeId: string): void {
        // Abrir modal de edición
    }

    public onLoadStudentGrades(gradeId: string): void {
        // Abrir modal de carga de notas
    }

    public onGenerateReport(): void {
        // Implementar generación de informe
    }

    public onEditSubject(): void {
        // Implementar edición de materia
    }

    public onDeleteSubject(): void {
        // Implementar eliminación de materia
    }
}
```

---

## 🎯 Lógica del ViewModel

El **SubjectDetailsViewModelService** debe contener:

### Responsabilidades:
1. **Gestión de datos**: Llamadas a casos de uso y manejo de estados
2. **Transformación de datos**: Formateo y procesamiento de datos para la UI
3. **Validaciones de negocio**: Lógica de validación compartida
4. **Manejo de errores**: Centralizar manejo de errores

### Métodos a incluir:
```typescript
// Carga de datos
loadStudents(subjectId: string): void
loadClasses(subjectId: string): void
loadGrades(subjectId: string): void

// Filtrado y búsqueda
filterStudents(students: Student[], exclude: Student[], search: string): Student[]

// Observables de datos
students$: Observable<Student[]>
classes$: Observable<Class[]>
grades$: Observable<Grade[]>
```

---

## 🚀 Plan de Migración (Paso a Paso)

### Fase 1: Preparación
1. ✓ Crear el nuevo update-grade-use-case ✅ (Completado)
2. ✓ Integrar casos de uso en el componente actual ✅ (Completado)
3. Crear branch `refactor/subject-details-componentization`
4. Hacer backup del componente actual
5. Escribir tests para el componente actual (si no existen)

### Fase 2: Componentización (En orden de prioridad)
1. **GradesTableComponent** (Mayor impacto, menor riesgo)
2. **ClassCalendarComponent** (Independiente, fácil de extraer)
3. **AddStudentButtonComponent** (Autocontenido)
4. **EditGradeModalComponent** (Similar a AddGradeButton)
5. **LoadStudentGradesModalComponent** (Similar a AddGradeButton)
6. **ClassDetailsModalComponent** (Lógica compleja)
7. **AddClassModalComponent** (Relacionado con ClassDetailsModal)
8. **SubjectActionsComponent** (Más simple, último)

### Fase 3: Refactorización del ViewModel
1. Mover lógica de negocio del componente al ViewModel
2. Centralizar llamadas a casos de uso
3. Implementar gestión de estado si es necesario (NgRx, Signals, etc.)

### Fase 4: Testing y Validación
1. Escribir tests unitarios para cada componente nuevo
2. Escribir tests de integración para el componente orquestador
3. Realizar testing manual exhaustivo
4. Performance testing (antes y después)

### Fase 5: Limpieza y Documentación
1. Eliminar código muerto
2. Actualizar documentación
3. Code review del equipo
4. Merge a develop/main

---

## 📊 Métricas de Éxito

### Antes de la refactorización:
- **SubjectDetailsComponent**: 832 líneas (TS) + 398 (HTML) + 741 (SCSS) = **1,971 líneas totales**
- **Complejidad ciclomática**: ~50+ (muy alta)
- **Número de responsabilidades**: 8+
- **Número de dependencias**: 7+
- **Cobertura de tests**: ? (probablemente baja)

### Después de la refactorización (objetivo):
- **SubjectDetailsComponent**: ~150 líneas (TS) + ~50 (HTML) + ~100 (SCSS) = **~300 líneas totales**
- **Complejidad ciclomática**: <10 por componente (baja)
- **Número de responsabilidades**: 1 por componente
- **Número de dependencias**: 2-3 por componente
- **Cobertura de tests**: >80%
- **8 componentes reutilizables** bien definidos

---

## 🎨 Patrones y Principios Aplicados

1. **Single Responsibility Principle (SRP)**: Cada componente tiene una única responsabilidad
2. **Don't Repeat Yourself (DRY)**: Reutilización de componentes
3. **Separation of Concerns**: UI, lógica de negocio y estado separados
4. **Component/Container Pattern**: Componentes tontos (presentacionales) y componentes inteligentes (contenedores)
5. **ViewModel Pattern**: Lógica de presentación en servicios dedicados
6. **Observable Pattern**: Uso de RxJS para gestión reactiva de datos

---

## ⚠️ Consideraciones y Riesgos

### Riesgos:
1. **Tiempo de desarrollo**: Refactorización completa puede tomar 2-4 semanas
2. **Regresiones**: Posibilidad de introducir bugs durante la migración
3. **Coordinación del equipo**: Requiere que todo el equipo esté alineado
4. **Testing**: Necesita tiempo dedicado para escribir tests

### Mitigaciones:
1. **Refactorización incremental**: Hacer por fases, no todo de una vez
2. **Tests exhaustivos**: Escribir tests antes de refactorizar
3. **Code review riguroso**: Revisar cada componente antes de integrar
4. **Feature flags**: Usar flags para habilitar/deshabilitar nuevos componentes

---

## 📝 Checklist de Refactorización

Por cada componente a extraer:

- [ ] Identificar responsabilidades específicas
- [ ] Definir inputs y outputs claramente
- [ ] Crear estructura de carpetas
- [ ] Implementar componente con lógica básica
- [ ] Migrar estilos necesarios
- [ ] Escribir tests unitarios
- [ ] Integrar en componente padre
- [ ] Validar funcionamiento
- [ ] Code review
- [ ] Documentar componente

---

## 🔗 Referencias y Recursos

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Component Interaction Patterns](https://angular.io/guide/component-interaction)
- [Smart vs Presentational Components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
- [OnPush Change Detection](https://angular.io/api/core/ChangeDetectionStrategy)

---

## 💡 Conclusión

Esta refactorización transformará el componente monolítico de **1,971 líneas** en:
- 1 componente orquestador pequeño (~300 líneas)
- 8 componentes especializados y reutilizables
- Mejor mantenibilidad, testabilidad y rendimiento
- Código más limpio y profesional

**Recomendación:** Implementar la refactorización por fases, comenzando con los componentes de menor riesgo (tabla y calendario) y avanzando hacia los más complejos (modales). Esto permite validar el enfoque y ajustar según sea necesario.

---

**Fecha de creación:** 3 de noviembre de 2025  
**Autor:** GitHub Copilot  
**Estado:** Propuesta - Pendiente de aprobación e implementación
