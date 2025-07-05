"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { TimeEntryCreate, TimeEntryUpdate, TimeEntryWithDetails } from "@/types";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";

interface TimeEntryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TimeEntryCreate | TimeEntryUpdate) => Promise<void>;
  timeEntry?: TimeEntryWithDetails | null;
  isLoading?: boolean;
}

export function TimeEntryFormModal({
  isOpen,
  onClose,
  onSubmit,
  timeEntry,
  isLoading = false
}: TimeEntryFormModalProps) {
  const [formData, setFormData] = useState<TimeEntryCreate>({
    work_date: new Date().toISOString().split('T')[0],
    project_id: 0,
    task_id: 0,
    description: "",
    start_time: "09:00",
    end_time: undefined,
    rate_per_hour: undefined,
    currency: "USD",
    comments: "",
    is_billable: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data for dropdowns
  const { projects } = useProjects({ pagination: { page: 1, limit: 100 } });
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load tasks when project changes
  useEffect(() => {
    const loadTasks = async () => {
      if (formData.project_id && isOpen) {
        setIsLoadingData(true);
        try {
          const response = await fetch(`/api/tasks?project_id=${formData.project_id}&limit=100`);
          const data = await response.json();
          setTasks(data.items || []);
        } catch (error) {
          console.error("Error loading tasks:", error);
          setTasks([]);
        } finally {
          setIsLoadingData(false);
        }
      } else {
        setTasks([]);
      }
    };

    loadTasks();
  }, [formData.project_id, isOpen]);

  // Initialize form when editing
  useEffect(() => {
    if (timeEntry && isOpen) {
      setFormData({
        work_date: timeEntry.work_date,
        project_id: timeEntry.project_id,
        task_id: timeEntry.task_id,
        description: timeEntry.description || "",
        start_time: timeEntry.start_time,
        end_time: timeEntry.end_time,
        rate_per_hour: timeEntry.rate_per_hour,
        currency: timeEntry.currency,
        comments: timeEntry.comments || "",
        is_billable: timeEntry.is_billable
      });
    } else if (isOpen) {
      // Reset form for new entry
      setFormData({
        work_date: new Date().toISOString().split('T')[0],
        project_id: 0,
        task_id: 0,
        description: "",
        start_time: "09:00",
        end_time: undefined,
        rate_per_hour: undefined,
        currency: "USD",
        comments: "",
        is_billable: true
      });
    }
    setErrors({});
  }, [timeEntry, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.project_id) {
      newErrors.project_id = "El proyecto es requerido";
    }

    if (!formData.task_id) {
      newErrors.task_id = "La tarea es requerida";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.start_time) {
      newErrors.start_time = "La hora de inicio es requerida";
    }

    if (formData.end_time && formData.start_time) {
      const start = new Date(`2000-01-01T${formData.start_time}`);
      const end = new Date(`2000-01-01T${formData.end_time}`);
      if (end <= start) {
        newErrors.end_time = "La hora de fin debe ser posterior a la hora de inicio";
      }
    }

    if (formData.rate_per_hour !== undefined && formData.rate_per_hour < 0) {
      newErrors.rate_per_hour = "La tarifa por hora debe ser positiva";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting time entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <DialogHeader>
          <DialogTitle>
            {timeEntry ? "Editar Entrada de Tiempo" : "Nueva Entrada de Tiempo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="work_date">Fecha *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.work_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.work_date ? format(new Date(formData.work_date), "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50">
                    <Calendar
                      mode="single"
                      selected={formData.work_date ? new Date(formData.work_date) : undefined}
                      onSelect={(date) => handleInputChange("work_date", date ? format(date, "yyyy-MM-dd") : undefined)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descripción del trabajo realizado"
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project">Proyecto *</Label>
                <Select
                  value={formData.project_id?.toString() || ""}
                  onChange={(e) => handleInputChange("project_id", parseInt(e.target.value))}
                  className={errors.project_id ? "border-red-500" : ""}
                >
                  <option value="">Seleccionar proyecto</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id.toString()}>
                      {project.name}
                    </option>
                  ))}
                </Select>
                {errors.project_id && <p className="text-sm text-red-500">{errors.project_id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="task">Tarea *</Label>
                <Select
                  value={formData.task_id?.toString() || ""}
                  onChange={(e) => handleInputChange("task_id", parseInt(e.target.value))}
                  className={errors.task_id ? "border-red-500" : ""}
                  disabled={!formData.project_id || isLoadingData}
                >
                  <option value="">Seleccionar tarea</option>
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id.toString()}>
                      {task.name}
                    </option>
                  ))}
                </Select>
                {errors.task_id && <p className="text-sm text-red-500">{errors.task_id}</p>}
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información de Tiempo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_time">Hora de Inicio *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => handleInputChange("start_time", e.target.value)}
                    className={`pl-10 ${errors.start_time ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.start_time && <p className="text-sm text-red-500">{errors.start_time}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_time">Hora de Fin</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time || ""}
                    onChange={(e) => handleInputChange("end_time", e.target.value || undefined)}
                    className={`pl-10 ${errors.end_time ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.end_time && <p className="text-sm text-red-500">{errors.end_time}</p>}
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información de Facturación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate_per_hour">Tarifa por Hora</Label>
                <Input
                  id="rate_per_hour"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.rate_per_hour || ""}
                  onChange={(e) => handleInputChange("rate_per_hour", e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="0.00"
                  className={errors.rate_per_hour ? "border-red-500" : ""}
                />
                {errors.rate_per_hour && <p className="text-sm text-red-500">{errors.rate_per_hour}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select
                  value={formData.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="PEN">PEN</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="is_billable">Facturable</Label>
                <Select
                  value={formData.is_billable.toString()}
                  onChange={(e) => handleInputChange("is_billable", e.target.value === "true")}
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                placeholder="Comentarios adicionales"
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoadingData}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                timeEntry ? "Actualizar" : "Crear"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 