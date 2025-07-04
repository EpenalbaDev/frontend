# TypeScript Types Documentation

Este directorio contiene todos los tipos TypeScript definidos para el frontend de Project Manager, basados en los schemas del backend.

## 📁 Estructura de Archivos

```
types/
├── index.ts          # Exporta todos los tipos
├── common.ts         # Tipos comunes (paginación, filtros, etc.)
├── auth.ts           # Tipos de autenticación
├── user.ts           # Tipos de usuarios y roles
├── client.ts         # Tipos de clientes
├── project.ts        # Tipos de proyectos
├── task.ts           # Tipos de tareas
├── timeEntry.ts      # Tipos de entradas de tiempo
├── reports.ts        # Tipos de reportes y dashboard
└── README.md         # Esta documentación
```

## 🔧 Uso

### Importación Básica
```typescript
import { UserResponse, ProjectResponse, TaskResponse } from '@/types';
```

### Importación Específica
```typescript
import { UserResponse } from '@/types/user';
import { ProjectResponse } from '@/types/project';
```

## 📋 Tipos Principales

### 🔐 Autenticación (`auth.ts`)
- `AuthUserBase` - Usuario base para autenticación
- `AuthUserCreate` - Crear usuario
- `UserLogin` - Datos de login
- `Token` - Token JWT
- `CurrentUser` - Usuario actual con información extendida
- `AuthState` - Estado de autenticación

### 👥 Usuarios (`user.ts`)
- `UserResponse` - Respuesta de usuario
- `UserWithRoles` - Usuario con roles
- `UserFilter` - Filtros para usuarios
- `UserTableData` - Datos para tabla de usuarios
- `RoleResponse` - Información de rol

### 🏢 Clientes (`client.ts`)
- `ClientResponse` - Respuesta de cliente
- `ClientCreate` - Crear cliente
- `ClientUpdate` - Actualizar cliente
- `ClientTableData` - Datos para tabla de clientes
- `ClientStats` - Estadísticas del cliente

### 📋 Proyectos (`project.ts`)
- `ProjectResponse` - Respuesta de proyecto
- `ProjectWithDetails` - Proyecto con detalles completos
- `ProjectFilter` - Filtros para proyectos
- `ProjectTableData` - Datos para tabla de proyectos
- `ProjectStats` - Estadísticas del proyecto

### ✅ Tareas (`task.ts`)
- `TaskResponse` - Respuesta de tarea
- `TaskWithDetails` - Tarea con detalles completos
- `TaskWithSubtasks` - Tarea con subtareas
- `TaskFilter` - Filtros para tareas
- `TaskTableData` - Datos para tabla de tareas
- `TaskCategoryResponse` - Categoría de tarea
- `TaskStatusResponse` - Estado de tarea
- `PriorityResponse` - Prioridad

### ⏱️ Entradas de Tiempo (`timeEntry.ts`)
- `TimeEntryResponse` - Respuesta de entrada de tiempo
- `TimeEntryCreate` - Crear entrada de tiempo
- `TimeEntryUpdate` - Actualizar entrada de tiempo
- `TimeEntryFilter` - Filtros para entradas de tiempo
- `TimerStart` - Iniciar timer
- `TimerStop` - Detener timer
- `TimeSummary` - Resumen de tiempo

### 📊 Reportes (`reports.ts`)
- `TimeSummaryReport` - Reporte resumen de tiempo
- `UserProductivityReport` - Reporte de productividad
- `ProjectProgressReport` - Reporte de progreso de proyecto
- `CostAnalysisReport` - Reporte de análisis de costos
- `DashboardMetrics` - Métricas del dashboard
- `ChartDataPoint` - Punto de datos para gráficos
- `PieChartData` - Datos para gráfico de pastel
- `BarChartData` - Datos para gráfico de barras
- `LineChartData` - Datos para gráfico de líneas

### 🔧 Comunes (`common.ts`)
- `FilterParams` - Parámetros de filtro base
- `PaginationParams` - Parámetros de paginación
- `PaginatedResponse<T>` - Respuesta paginada
- `DateRangeFilter` - Filtro de rango de fechas
- `ApiResponse<T>` - Respuesta de API
- `ApiError` - Error de API
- `FormField` - Campo de formulario

## 🎯 Convenciones

### Nombres de Tipos
- **Base**: `EntityBase` - Tipos base con propiedades comunes
- **Create**: `EntityCreate` - Para crear entidades
- **Update**: `EntityUpdate` - Para actualizar entidades
- **Response**: `EntityResponse` - Respuestas de API
- **WithDetails**: `EntityWithDetails` - Con información detallada
- **Filter**: `EntityFilter` - Filtros para listados
- **TableData**: `EntityTableData` - Datos optimizados para tablas
- **FormData**: `EntityFormData` - Datos para formularios
- **Stats**: `EntityStats` - Estadísticas de la entidad

### Fechas y Tiempos
- **Fechas**: `string` (formato ISO: "2024-01-01")
- **Tiempos**: `string` (formato HH:mm: "14:30")
- **Timestamps**: `string` (formato ISO: "2024-01-01T14:30:00Z")

### Números
- **IDs**: `number`
- **Precios/Costos**: `number` (en centavos o con decimales)
- **Horas**: `number` (con decimales para minutos)

## 🔄 Actualización de Tipos

Cuando se actualicen los schemas del backend:

1. Revisar los cambios en `backend/app/schemas/`
2. Actualizar los tipos correspondientes en `frontend/src/types/`
3. Verificar que no haya conflictos de nombres
4. Actualizar esta documentación si es necesario

## 📝 Notas Importantes

- Todos los tipos están basados en los schemas de Pydantic del backend
- Se mantiene la consistencia de nombres entre frontend y backend
- Los tipos incluyen validaciones y documentación
- Se usan tipos genéricos para respuestas paginadas
- Los tipos de formularios incluyen validaciones adicionales 