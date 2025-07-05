import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { useClients } from "@/hooks/useClients";
import { projectsService, getProjectStatuses } from "@/lib/api/projects";
import { ProjectCreate, ProjectUpdate, ProjectWithDetails, ProjectStatusResponse } from "@/types";
import { useSWRConfig } from "swr";

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: ProjectWithDetails | null;
}

export function ProjectFormModal({ open, onClose, onSuccess, project }: ProjectFormModalProps) {
  const isEdit = !!project;
  const [form, setForm] = useState<ProjectCreate>({
    name: project?.name || "",
    description: project?.description || "",
    client_id: project?.client_id || 0,
    project_manager_id: project?.project_manager_id || 0,
    status_id: project?.status_id || 0,
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
    estimated_hours: project?.estimated_hours || undefined,
    budget: project?.budget || undefined,
    currency: project?.currency || "USD",
    is_active: project?.is_active ?? true,
  });
  const [statuses, setStatuses] = useState<ProjectStatusResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { clients } = useClients({ pagination: { page: 1, limit: 100 } });
  const { users } = useUsers();

  useEffect(() => {
    getProjectStatuses().then(setStatuses);
  }, []);

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description || "",
        client_id: project.client_id,
        project_manager_id: project.project_manager_id,
        status_id: project.status_id,
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        estimated_hours: project.estimated_hours,
        budget: project.budget,
        currency: project.currency,
        is_active: project.is_active,
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && project) {
        await projectsService.updateProject(project.id, form as ProjectUpdate);
      } else {
        await projectsService.createProject(form);
      }
      mutate("/projects/");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Error al guardar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Proyecto" : "Nuevo Proyecto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Nombre del proyecto" required />
          <Input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
          <select name="client_id" value={form.client_id} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="">Selecciona un cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="project_manager_id" value={form.project_manager_id} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="">Selecciona un responsable</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.full_name}</option>
            ))}
          </select>
          <select name="status_id" value={form.status_id} onChange={handleChange} required className="w-full border rounded p-2">
            <option value="">Selecciona un estado</option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <Input name="start_date" type="date" value={form.start_date} onChange={handleChange} placeholder="Fecha de inicio" />
          <Input name="end_date" type="date" value={form.end_date} onChange={handleChange} placeholder="Fecha de fin" />
          <Input name="estimated_hours" type="number" value={form.estimated_hours ?? ""} onChange={handleChange} placeholder="Horas estimadas" />
          <Input name="budget" type="number" value={form.budget ?? ""} onChange={handleChange} placeholder="Presupuesto" />
          <Input name="currency" value={form.currency} onChange={handleChange} placeholder="Moneda" required />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
            Activo
          </label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{isEdit ? "Guardar Cambios" : "Crear Proyecto"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 