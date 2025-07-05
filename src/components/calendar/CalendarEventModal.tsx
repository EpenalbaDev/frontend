"use client";

import { useState, useEffect } from "react";
import { CalendarEvent, CalendarEventCreate, CalendarEventUpdate } from "@/types";
import { useCreateCalendarEvent, useUpdateCalendarEvent } from "@/hooks/useCalendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent;
}

export function CalendarEventModal({ isOpen, onClose, event }: CalendarEventModalProps) {
  const [formData, setFormData] = useState<CalendarEventCreate>({
    event_name: "",
    start_time: undefined,
    end_time: undefined,
    location: "",
    organizer: "",
    attendees: "",
    recurring: "No",
    meeting_link: "",
    description: "",
    is_active: true,
  });

  const createMutation = useCreateCalendarEvent();
  const updateMutation = useUpdateCalendarEvent();

  useEffect(() => {
    if (event) {
      setFormData({
        event_name: event.event_name,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location || "",
        organizer: event.organizer || "",
        attendees: event.attendees || "",
        recurring: event.recurring || "No",
        meeting_link: event.meeting_link || "",
        description: event.description || "",
        is_active: event.is_active,
      });
    } else {
      setFormData({
        event_name: "",
        start_time: undefined,
        end_time: undefined,
        location: "",
        organizer: "",
        attendees: "",
        recurring: "No",
        meeting_link: "",
        description: "",
        is_active: true,
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (event) {
      await updateMutation.mutateAsync({ id: event.id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    
    onClose();
  };

  const handleInputChange = (field: keyof CalendarEventCreate, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDateTime = (date: Date | undefined, time: string) => {
    if (!date) return undefined;
    const dateStr = format(date, "yyyy-MM-dd");
    return time ? `${dateStr}T${time}` : dateStr;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <DialogHeader>
          <DialogTitle>
            {event ? "Editar Evento de Calendario" : "Nuevo Evento de Calendario"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event_name">Nombre del Evento *</Label>
                <Input
                  id="event_name"
                  value={formData.event_name}
                  onChange={(e) => handleInputChange("event_name", e.target.value)}
                  placeholder="Nombre del evento"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer">Organizador</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => handleInputChange("organizer", e.target.value)}
                  placeholder="Organizador del evento"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descripción del evento"
                rows={3}
              />
            </div>
          </div>

          {/* Fechas y Horarios */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Fechas y Horarios</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha y Hora de Inicio</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.start_time && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.start_time ? format(new Date(formData.start_time), "PPP") : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.start_time ? new Date(formData.start_time) : undefined}
                        onSelect={(date) => handleInputChange("start_time", formatDateTime(date, "00:00"))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={formData.start_time ? new Date(formData.start_time).toTimeString().slice(0, 5) : ""}
                    onChange={(e) => {
                      const currentDate = formData.start_time ? new Date(formData.start_time) : new Date();
                      const newDateTime = formatDateTime(currentDate, e.target.value);
                      handleInputChange("start_time", newDateTime);
                    }}
                    className="w-32"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fecha y Hora de Fin</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.end_time && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.end_time ? format(new Date(formData.end_time), "PPP") : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.end_time ? new Date(formData.end_time) : undefined}
                        onSelect={(date) => handleInputChange("end_time", formatDateTime(date, "00:00"))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={formData.end_time ? new Date(formData.end_time).toTimeString().slice(0, 5) : ""}
                    onChange={(e) => {
                      const currentDate = formData.end_time ? new Date(formData.end_time) : new Date();
                      const newDateTime = formatDateTime(currentDate, e.target.value);
                      handleInputChange("end_time", newDateTime);
                    }}
                    className="w-32"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación y Detalles */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Ubicación y Detalles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Ubicación del evento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recurring">Recurrente</Label>
                <select
                  id="recurring"
                  value={formData.recurring}
                  onChange={(e) => handleInputChange("recurring", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="No">No</option>
                  <option value="Diario">Diario</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_link">Enlace de Reunión</Label>
              <Input
                id="meeting_link"
                value={formData.meeting_link}
                onChange={(e) => handleInputChange("meeting_link", e.target.value)}
                placeholder="https://meet.google.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Asistentes</Label>
              <Textarea
                id="attendees"
                value={formData.attendees}
                onChange={(e) => handleInputChange("attendees", e.target.value)}
                placeholder="Lista de asistentes (separados por comas)"
                rows={2}
              />
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label htmlFor="is_active">Estado</Label>
            <select
              id="is_active"
              value={formData.is_active ? "active" : "inactive"}
              onChange={(e) => handleInputChange("is_active", e.target.value === "active")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? (
                "Guardando..."
              ) : event ? (
                "Actualizar Evento"
              ) : (
                "Crear Evento"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 