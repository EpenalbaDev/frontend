# React Hooks Documentation

Este directorio contiene hooks personalizados para consumir los servicios API de Project Manager.

## 📁 Estructura

```
hooks/
├── index.ts                    # Exporta todos los hooks
├── useCurrentUser.ts           # Hook para usuario autenticado
├── useUsers.ts                 # Hook para listar usuarios
├── useClients.ts               # Hook para listar clientes
├── useProjects.ts              # Hook para listar proyectos
├── useTasks.ts                 # Hook para listar tareas
├── useTimeEntries.ts           # Hook para listar entradas de tiempo
├── useDashboardMetrics.ts      # Hook para métricas del dashboard
├── useReport.ts                # Hook para reportes
├── useUserMutations.ts         # Hooks de mutación para usuarios
├── useProjectMutations.ts      # Hooks de mutación para proyectos
├── useTaskMutations.ts         # Hooks de mutación para tareas
├── useTimeEntryMutations.ts    # Hooks de mutación para entradas de tiempo
└── README.md                   # Esta documentación
```

## 🔧 Configuración

Los hooks usan **SWR** para:
- Caché automático de datos
- Revalidación en foco
- Sincronización entre pestañas
- Optimistic updates
- Error handling

## 📋 Hooks de Lectura (Queries)

### 🔐 **useCurrentUser**
Obtiene el usuario autenticado actual.

```typescript
import { useCurrentUser } from '@/hooks';

function MyComponent() {
  const { user, isLoading, isError, error } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return <div>Welcome, {user?.full_name}!</div>;
}
```

### 👥 **useUsers**
Lista usuarios con paginación y filtros.

```typescript
import { useUsers } from '@/hooks';

function UsersList() {
  const { users, pagination, isLoading, isError } = useUsers({
    pagination: { page: 1, limit: 20 },
    filters: { search: 'john', is_active: true }
  });

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.full_name}</div>
      ))}
      <div>Page {pagination?.current_page} of {pagination?.total_pages}</div>
    </div>
  );
}
```

### 🏢 **useClients**
Lista clientes con paginación y filtros.

```typescript
import { useClients } from '@/hooks';

function ClientsList() {
  const { clients, pagination, isLoading } = useClients({
    pagination: { page: 1, limit: 10 },
    filters: { search: 'company' }
  });

  return (
    <div>
      {clients.map(client => (
        <div key={client.id}>{client.name}</div>
      ))}
    </div>
  );
}
```

### 📋 **useProjects**
Lista proyectos con paginación y filtros.

```typescript
import { useProjects } from '@/hooks';

function ProjectsList() {
  const { projects, pagination, isLoading } = useProjects({
    pagination: { page: 1, limit: 10 },
    filters: { client_id: 1, status_id: 2 }
  });

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
```

### ✅ **useTasks**
Lista tareas con paginación y filtros.

```typescript
import { useTasks } from '@/hooks';

function TasksList() {
  const { tasks, pagination, isLoading } = useTasks({
    pagination: { page: 1, limit: 10 },
    filters: { project_id: 1, status_id: 2 }
  });

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
```

### ⏱️ **useTimeEntries**
Lista entradas de tiempo con paginación y filtros.

```typescript
import { useTimeEntries } from '@/hooks';

function TimeEntriesList() {
  const { timeEntries, pagination, isLoading } = useTimeEntries({
    pagination: { page: 1, limit: 10 },
    filters: { project_id: 1, date_from: '2024-01-01' }
  });

  return (
    <div>
      {timeEntries.map(entry => (
        <div key={entry.id}>{entry.description}</div>
      ))}
    </div>
  );
}
```

### 📊 **useDashboardMetrics**
Obtiene métricas del dashboard.

```typescript
import { useDashboardMetrics } from '@/hooks';

function Dashboard() {
  const { metrics, isLoading } = useDashboardMetrics();

  return (
    <div>
      <div>Total Projects: {metrics?.total_projects}</div>
      <div>Active Tasks: {metrics?.active_tasks}</div>
      <div>Total Hours: {metrics?.total_hours}</div>
    </div>
  );
}
```

### 📈 **useReport**
Obtiene reportes de tiempo.

```typescript
import { useReport } from '@/hooks';

function TimeReport() {
  const { report, isLoading } = useReport({
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    projectId: 1
  });

  return (
    <div>
      <div>Total Hours: {report?.total_hours}</div>
      <div>Billable Hours: {report?.billable_hours}</div>
    </div>
  );
}
```

## 🔄 Hooks de Mutación

### 👥 **useUserMutations**

```typescript
import { useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks';

const { create, isLoading: isCreating } = useCreateUser();
const { update, isLoading: isUpdating } = useUpdateUser();
const { remove, isLoading: isDeleting } = useDeleteUser();

const handleCreate = async (userData) => {
  await create(userData);
};
```

### 📋 **useProjectMutations**

```typescript
import { useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks';

function ProjectForm() {
  const { create, isLoading } = useCreateProject();

  const handleCreate = async (projectData) => {
    try {
      await create(projectData);
      // Cache se actualiza automáticamente
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
}
```

### ✅ **useTaskMutations**

```typescript
import { useCreateTask, useUpdateTaskStatus, useAssignTask } from '@/hooks';

function TaskActions() {
  const { create, isLoading: isCreating } = useCreateTask();
  const { updateStatus, isLoading: isUpdatingStatus } = useUpdateTaskStatus();
  const { assign, isLoading: isAssigning } = useAssignTask();

  const handleStatusChange = async (taskId, statusId) => {
    try {
      await updateStatus(taskId, statusId);
      // Cache se actualiza automáticamente
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleAssign = async (taskId, userId) => {
    try {
      await assign(taskId, userId);
      // Cache se actualiza automáticamente
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };
}
```

### ⏱️ **useTimeEntryMutations**

```typescript
import { useStartTimer, useStopTimer } from '@/hooks';

function Timer() {
  const { start, isLoading: isStarting } = useStartTimer();
  const { stop, isLoading: isStopping } = useStopTimer();

  const handleStart = async (timerData) => {
    try {
      await start(timerData);
      // Cache se actualiza automáticamente
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  const handleStop = async (timerData) => {
    try {
      await stop(timerData);
      // Cache se actualiza automáticamente
    } catch (error) {
      console.error('Error stopping timer:', error);
    }
  };
}
```

## 🎯 Patrones de Uso

### Manejo de Estados de Carga

```typescript
function MyComponent() {
  const { users, isLoading, isError, error } = useUsers();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;
  
  return <UsersList users={users} />;
}
```

### Optimistic Updates

```typescript
function TaskItem({ task }) {
  const { updateStatus, isLoading } = useUpdateTaskStatus();

  const handleStatusChange = async (newStatusId) => {
    // Optimistic update
    const optimisticTask = { ...task, status_id: newStatusId };
    
    try {
      await updateStatus(task.id, newStatusId);
    } catch (error) {
      // Revert on error
      console.error('Error updating status:', error);
    }
  };
}
```

### Revalidación Manual

```typescript
function RefreshButton() {
  const { users, mutate } = useUsers();

  const handleRefresh = () => {
    mutate(); // Revalida los datos
  };

  return <button onClick={handleRefresh}>Refresh</button>;
}
```

## 🔄 Cache Management

Los hooks de mutación automáticamente:

1. **Invalidan caches relacionados** después de mutaciones
2. **Actualizan caches específicos** para optimistic updates
3. **Revalidan datos** para mantener consistencia
4. **Manejan errores** y rollbacks

## 📝 Notas Importantes

- **Tipado completo** con TypeScript
- **Manejo automático de errores** en mutaciones
- **Cache invalidation** inteligente
- **Loading states** para UX
- **Optimistic updates** donde aplica
- **Revalidación automática** con SWR

## 🚀 Próximos Pasos

1. **Integrar en componentes** de la UI
2. **Agregar error boundaries** para mejor UX
3. **Implementar retry logic** para operaciones críticas
4. **Agregar hooks especializados** según necesidades específicas 