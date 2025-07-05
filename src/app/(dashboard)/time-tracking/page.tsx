"use client";

import { ProtectedRoute } from "@/components/ui/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { timeEntriesService } from "@/lib/api/timeEntries";
import { Timer } from "@/components/time-tracking/Timer";
import { TimeSummary } from "@/components/time-tracking/TimeSummary";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, Clock, User, FolderOpen, CheckSquare, DollarSign, Calendar } from "lucide-react";
import { TimeEntryResponse, TimeEntryCreate, TimeEntryUpdate } from "@/types";
import { TimeEntryFormModal } from "@/components/time-tracking/TimeEntryFormModal";
import { useCreateTimeEntry } from "@/hooks/useTimeEntryMutations";

export default function TimeTrackingPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { timeEntries, pagination, isLoading, isError, mutate } = useTimeEntries({
    pagination: { page, limit },
    filters: search ? { search } : {}
  });
  const [showModal, setShowModal] = useState(false);
  const { create } = useCreateTimeEntry();

  const handleDeleteTimeEntry = async (entry: TimeEntryResponse) => {
    if (confirm(`¿Estás seguro de que quieres eliminar esta entrada de tiempo?`)) {
      try {
        await timeEntriesService.deleteTimeEntry(entry.id);
        mutate();
      } catch (error) {
        console.error('Error deleting time entry:', error);
        alert('Error al eliminar la entrada de tiempo');
      }
    }
  };

  const formatDuration = (startTime: string, endTime?: string): string => {
    if (!endTime) return "En progreso";
    
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    const hours = Math.floor(diffHours);
    const minutes = Math.round((diffHours - hours) * 60);
    
    return `${hours}h ${minutes}m`;
  };

  const formatTime = (time: string): string => {
    return time;
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-ES');
  };

  const formatCurrency = (amount?: number): string => {
    if (!amount) return "-";
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleTimerStart = (timer: TimeEntryResponse) => {
    console.log("Timer started:", timer);
    // You could show a notification or update UI
  };

  const handleTimerStop = (timer: TimeEntryResponse) => {
    console.log("Timer stopped:", timer);
    mutate(); // Refresh the time entries list
  };

  // Handler para crear nueva entrada
  const handleCreateTimeEntry = async (data: TimeEntryCreate | TimeEntryUpdate) => {
    await create(data as TimeEntryCreate);
    setShowModal(false);
    mutate(); // refresca la lista
  };

  return (
    <ProtectedRoute>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Seguimiento de Tiempo</h1>
          </div>

          {/* Time Summary Cards */}
          <TimeSummary />

          {/* Timer and Time Entries Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timer Section */}
            <div className="lg:col-span-1">
              <Timer onTimerStart={handleTimerStart} onTimerStop={handleTimerStop} />
            </div>

            {/* Time Entries Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-2xl font-bold">Entradas de Tiempo</CardTitle>
                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar entradas..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                        className="pl-8"
                      />
                    </div>
                    <Button className="flex-shrink-0" onClick={() => setShowModal(true)}>
                      <Plus className="h-4 w-4 mr-1" /> Nueva Entrada
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="py-12 text-center">Cargando entradas de tiempo...</div>
                  ) : isError ? (
                    <div className="py-12 text-center text-red-500">
                      Error al cargar entradas de tiempo 
                      <Button onClick={() => mutate()} className="ml-2">Reintentar</Button>
                    </div>
                  ) : timeEntries.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      No hay entradas de tiempo para mostrar
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Proyecto</TableHead>
                          <TableHead>Tarea</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Hora Inicio</TableHead>
                          <TableHead>Hora Fin</TableHead>
                          <TableHead>Duración</TableHead>
                          <TableHead>Costo</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeEntries.map(entry => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-500" />
                                {formatDate(entry.work_date)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <FolderOpen className="h-3 w-3 text-gray-500" />
                                {entry.project_name || entry.project_id}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <CheckSquare className="h-3 w-3 text-gray-500" />
                                {entry.task_name || entry.task_id}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {entry.description || "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-gray-500" />
                                {formatTime(entry.start_time)}
                              </div>
                            </TableCell>
                            <TableCell>
                              {entry.end_time ? formatTime(entry.end_time) : "-"}
                            </TableCell>
                            <TableCell>
                              <span className={`font-medium ${
                                !entry.end_time ? 'text-blue-600' : 'text-gray-900'
                              }`}>
                                {formatDuration(entry.start_time, entry.end_time)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-gray-500" />
                                {formatCurrency(entry.total_cost)}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Editar entrada"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteTimeEntry(entry)}
                                  title="Eliminar entrada"
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
                  
                  {/* Pagination */}
                  {pagination && pagination.total_items > limit && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-muted-foreground">
                        Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, pagination.total_items)} de {pagination.total_items} entradas
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
            </div>
          </div>
        </main>
      </div>
      <TimeEntryFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateTimeEntry}
      />
    </ProtectedRoute>
  );
} 