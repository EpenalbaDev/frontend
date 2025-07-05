"use client";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useTasks } from "@/hooks/useTasks";
import { tasksService } from "@/lib/api/tasks";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { useState } from "react";
import { Plus, Search, Edit, Eye, EyeOff, Trash2, User, Calendar, Flag } from "lucide-react";
import { TaskWithDetails, TaskCreate, TaskUpdate } from "@/types";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskWithDetails | null>(null);
  const { tasks, pagination, isLoading, isError, mutate } = useTasks({
    pagination: { page, limit },
    filters: search ? { search } : {}
  });

  const handleToggleActive = async (task: TaskWithDetails) => {
    try {
      await tasksService.updateTask(task.id, {
        is_active: !task.is_active
      });
      mutate();
    } catch (error) {
      console.error('Error toggling task status:', error);
      alert('Error al cambiar el estado de la tarea');
    }
  };

  const handleDeleteTask = async (task: TaskWithDetails) => {
    if (confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.name}"?`)) {
      try {
        await tasksService.deleteTask(task.id);
        mutate();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error al eliminar la tarea');
      }
    }
  };

  const handleSubmitTask = async (data: TaskCreate | TaskUpdate) => {
    try {
      if (editingTask) {
        await tasksService.updateTask(editingTask.id, data as TaskUpdate);
      } else {
        await tasksService.createTask(data as TaskCreate);
      }
      mutate();
      setModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error al guardar la tarea');
      throw error;
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'crítica':
        return 'text-red-600';
      case 'alta':
        return 'text-orange-600';
      case 'media':
        return 'text-yellow-600';
      case 'baja':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completado':
        return 'text-green-600';
      case 'en progreso':
        return 'text-blue-600';
      case 'en revisión':
        return 'text-yellow-600';
      case 'pendiente':
        return 'text-gray-600';
      case 'cancelado':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <ProtectedRoute>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-2xl font-bold">Tareas</CardTitle>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar tareas..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    className="pl-8"
                  />
                </div>
                <Button className="flex-shrink-0" onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Nueva Tarea
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-12 text-center">Cargando tareas...</div>
              ) : isError ? (
                <div className="py-12 text-center text-red-500">Error al cargar tareas <Button onClick={() => mutate()}>Reintentar</Button></div>
              ) : tasks.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">No hay tareas para mostrar</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Asignado a</TableHead>
                      <TableHead>Fecha límite</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>{task.project?.name ?? task.project_id ?? "-"}</TableCell>
                        <TableCell>{task.category?.name ?? task.category_id ?? "-"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Flag className={`h-3 w-3 ${getPriorityColor(task.priority?.name ?? "")}`} />
                            <span className={getPriorityColor(task.priority?.name ?? "")}>
                              {task.priority?.name ?? task.priority_id ?? "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={getStatusColor(task.status?.name ?? "")}>
                            {task.status?.name ?? task.status_id ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-gray-500" />
                            {task.assigned_user?.full_name ?? task.assigned_to ?? "-"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingTask(task);
                                setModalOpen(true);
                              }}
                              title="Editar tarea"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(task)}
                              title={task.is_active ? "Inactivar tarea" : "Activar tarea"}
                            >
                              {task.is_active ? (
                                <EyeOff className="h-4 w-4 text-orange-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTask(task)}
                              title="Eliminar tarea"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {/* Paginación básica */}
              {pagination && pagination.total_items > limit && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, pagination.total_items)} de {pagination.total_items} tareas
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                    >
                      Anterior
                    </Button>
                    <span className="text-sm px-3 py-1 bg-muted rounded">
                      Página {page} de {Math.ceil(pagination.total_items / limit)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= Math.ceil(pagination.total_items / limit)}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <TaskFormModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
        task={editingTask}
        isLoading={isLoading}
      />
    </ProtectedRoute>
  );
} 