"use client";

import { useState } from "react";
import { CalendarEvent, CalendarEventFilter } from "@/types";
import { useCalendarEvents, useDeleteCalendarEvent, useToggleCalendarEventStatus } from "@/hooks/useCalendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { CalendarEventModal } from "@/components/calendar/CalendarEventModal";
import { CalendarUploadModal } from "@/components/calendar/CalendarUploadModal";
import { CalendarStats } from "@/components/calendar/CalendarStats";
import { 
  Plus, 
  Upload, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  Clock,
  MapPin,
  User
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState<CalendarEventFilter>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>(undefined);

  const { data: eventsData, isLoading, refetch } = useCalendarEvents(page, pageSize, filters);
  const deleteMutation = useDeleteCalendarEvent();
  const toggleStatusMutation = useToggleCalendarEventStatus();

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPage(1);
  };

  const handleFilterChange = (key: keyof CalendarEventFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowCreateModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    await toggleStatusMutation.mutateAsync({ id, isActive: !currentStatus });
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingEvent(undefined);
    refetch();
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: es });
    } catch {
      return dateString;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: es });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendario</h1>
          <p className="text-gray-600">Gestiona eventos y reuniones del calendario</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowUploadModal(true)} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Subir Archivo
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <CalendarStats />

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Buscar eventos..."
                value={filters.search || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizer">Organizador</Label>
            <Input
              id="organizer"
              placeholder="Filtrar por organizador"
              value={filters.organizer || ""}
              onChange={(e) => handleFilterChange("organizer", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Filtrar por ubicación"
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <select
              id="status"
              value={filters.is_active === undefined ? "" : filters.is_active.toString()}
              onChange={(e) => handleFilterChange("is_active", e.target.value === "" ? undefined : e.target.value === "true")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Eventos */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Eventos de Calendario</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando eventos...</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Organizador</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Inicio</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsData?.items?.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">{event.event_name}</div>
                          {event.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {event.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{event.organizer || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{event.location || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatDateTime(event.start_time)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatDateTime(event.end_time)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{event.duration_formatted || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.is_active ? "default" : "secondary"}>
                          {event.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(event)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(event.id, event.is_active)}
                            className="h-8 w-8 p-0"
                          >
                            {event.is_active ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Paginación */}
              {eventsData && eventsData.total_items > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Mostrando {((page - 1) * pageSize) + 1} a {Math.min(page * pageSize, eventsData.total_items)} de {eventsData.total_items} eventos
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= eventsData.total_pages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {eventsData?.items?.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No se encontraron eventos</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modales */}
      <CalendarEventModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        event={editingEvent}
      />

      <CalendarUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
} 