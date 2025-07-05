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
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { TaskCreate, TaskUpdate, TaskWithDetails } from "@/types";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { getTaskCategories, getTaskStatuses, getPriorities, getTasks } from "@/lib/api/tasks";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskCreate | TaskUpdate) => Promise<void>;
  task?: TaskWithDetails | null;
  isLoading?: boolean;
}

export function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  task,
  isLoading = false
}: TaskFormModalProps) {
  const [formData, setFormData] = useState<TaskCreate>({
    name: "",
    description: "",
    project_id: 0,
    parent_task_id: undefined,
    category_id: 0,
    priority_id: 0,
    status_id: 0,
    assigned_to: undefined,
    estimated_hours: undefined,
    rate_per_hour: undefined,
    currency: "USD",
    due_date: undefined,
    is_active: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data for dropdowns
  const { projects } = useProjects({ pagination: { page: 1, limit: 100 } });
  const { users } = useUsers({ pagination: { page: 1, limit: 100 } });
  const [categories, setCategories] = useState<any[]>([]);
  const [statuses, setStatuses] = useState<any[]>([]);
  const [priorities, setPriorities] = useState<any[]>([]);
  const [parentTasks, setParentTasks] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load dropdown data
  useEffect(() => {
    const loadDropdownData = async () => {
      setIsLoadingData(true);
      try {
        const [categoriesData, statusesData, prioritiesData] = await Promise.all([
          getTaskCategories(),
          getTaskStatuses(),
          getPriorities()
        ]);
        setCategories(categoriesData);
        setStatuses(statusesData);
        setPriorities(prioritiesData);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isOpen) {
      loadDropdownData();
    }
  }, [isOpen]);

  // Load parent tasks when project changes
  useEffect(() => {
    const loadParentTasks = async () => {
      if (formData.project_id && isOpen) {
        try {
          // Fetch tasks for the selected project that could be parent tasks
          const data = await getTasks(
            { page: 1, limit: 100 },
            { project_id: formData.project_id }
          );
          // Filter out the current task if editing to avoid self-reference
          const availableParentTasks = data.items.filter((t: any) => 
            !task || t.id !== task.id
          );
          setParentTasks(availableParentTasks);
        } catch (error) {
          console.error("Error loading parent tasks:", error);
          setParentTasks([]);
        }
      } else {
        setParentTasks([]);
      }
    };

    loadParentTasks();
  }, [formData.project_id, isOpen, task]);

  // Initialize form when editing
  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        name: task.name,
        description: task.description || "",
        project_id: task.project_id,
        parent_task_id: task.parent_task_id,
        category_id: task.category_id,
        priority_id: task.priority_id,
        status_id: task.status_id,
        assigned_to: task.assigned_to,
        estimated_hours: task.estimated_hours,
        rate_per_hour: task.rate_per_hour,
        currency: task.currency,
        due_date: task.due_date,
        is_active: task.is_active
      });
    } else if (isOpen) {
      // Reset form for new task
      setFormData({
        name: "",
        description: "",
        project_id: 0,
        parent_task_id: undefined,
        category_id: 0,
        priority_id: 0,
        status_id: 0,
        assigned_to: undefined,
        estimated_hours: undefined,
        rate_per_hour: undefined,
        currency: "USD",
        due_date: undefined,
        is_active: true
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.project_id) {
      newErrors.project_id = "El proyecto es requerido";
    }

    if (!formData.category_id) {
      newErrors.category_id = "La categoría es requerida";
    }

    if (!formData.priority_id) {
      newErrors.priority_id = "La prioridad es requerida";
    }

    if (!formData.status_id) {
      newErrors.status_id = "El estado es requerido";
    }

    if (formData.estimated_hours !== undefined && formData.estimated_hours < 0) {
      newErrors.estimated_hours = "Las horas estimadas deben ser positivas";
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
      console.error("Error submitting task:", error);
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {task ? "Editar Tarea" : "Nueva Tarea"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Básica</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nombre de la tarea"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descripción de la tarea"
                rows={3}
              />
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
                <Label htmlFor="parent_task">Tarea Padre</Label>
                <Select
                  value={formData.parent_task_id?.toString() || ""}
                  onChange={(e) => handleInputChange("parent_task_id", e.target.value ? parseInt(e.target.value) : undefined)}
                >
                  <option value="">Sin tarea padre</option>
                  {parentTasks.map((parentTask) => (
                    <option key={parentTask.id} value={parentTask.id.toString()}>
                      {parentTask.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Clasificación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category_id?.toString() || ""}
                  onChange={(e) => handleInputChange("category_id", parseInt(e.target.value))}
                  className={errors.category_id ? "border-red-500" : ""}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad *</Label>
                <Select
                  value={formData.priority_id?.toString() || ""}
                  onChange={(e) => handleInputChange("priority_id", parseInt(e.target.value))}
                  className={errors.priority_id ? "border-red-500" : ""}
                >
                  <option value="">Seleccionar prioridad</option>
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id.toString()}>
                      {priority.name}
                    </option>
                  ))}
                </Select>
                {errors.priority_id && <p className="text-sm text-red-500">{errors.priority_id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado *</Label>
                <Select
                  value={formData.status_id?.toString() || ""}
                  onChange={(e) => handleInputChange("status_id", parseInt(e.target.value))}
                  className={errors.status_id ? "border-red-500" : ""}
                >
                  <option value="">Seleccionar estado</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id.toString()}>
                      {status.name}
                    </option>
                  ))}
                </Select>
                {errors.status_id && <p className="text-sm text-red-500">{errors.status_id}</p>}
              </div>
            </div>
          </div>

          {/* Assignment and Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Asignación y Tiempo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assigned_to">Asignar a</Label>
                <Select
                  value={formData.assigned_to?.toString() || ""}
                  onChange={(e) => handleInputChange("assigned_to", e.target.value ? parseInt(e.target.value) : undefined)}
                >
                  <option value="">Sin asignar</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id.toString()}>
                      {user.full_name || user.email}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_date">Fecha de Vencimiento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.due_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.due_date ? format(new Date(formData.due_date), "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.due_date ? new Date(formData.due_date) : undefined}
                      onSelect={(date) => handleInputChange("due_date", date ? format(date, "yyyy-MM-dd") : undefined)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimated_hours">Horas Estimadas</Label>
                <Input
                  id="estimated_hours"
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.estimated_hours || ""}
                  onChange={(e) => handleInputChange("estimated_hours", e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="0.0"
                  className={errors.estimated_hours ? "border-red-500" : ""}
                />
                {errors.estimated_hours && <p className="text-sm text-red-500">{errors.estimated_hours}</p>}
              </div>

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
                task ? "Actualizar" : "Crear"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 