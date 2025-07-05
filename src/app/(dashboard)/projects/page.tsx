"use client";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ProjectFormModal } from "@/components/ui/ProjectFormModal";
import { useProjects } from "@/hooks/useProjects";
import { projectsService } from "@/lib/api/projects";
import { useState } from "react";
import { Plus, Search, Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import { ProjectWithDetails } from "@/types";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithDetails | null>(null);
  const { projects, pagination, isLoading, isError, mutate } = useProjects({
    pagination: { page, limit },
    filters: search ? { search } : {}
  });

  const handleToggleActive = async (project: ProjectWithDetails) => {
    try {
      await projectsService.updateProject(project.id, {
        is_active: !project.is_active
      });
      mutate();
    } catch (error) {
      console.error('Error toggling project status:', error);
      alert('Error al cambiar el estado del proyecto');
    }
  };

  const handleDeleteProject = async (project: ProjectWithDetails) => {
    if (confirm(`¿Estás seguro de que quieres eliminar el proyecto "${project.name}"?`)) {
      try {
        await projectsService.deleteProject(project.id);
        mutate();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error al eliminar el proyecto');
      }
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
              <CardTitle className="text-2xl font-bold">Proyectos</CardTitle>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar proyectos..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    className="pl-8"
                  />
                </div>
                <Button className="flex-shrink-0" onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Nuevo Proyecto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-12 text-center">Cargando proyectos...</div>
              ) : isError ? (
                <div className="py-12 text-center text-red-500">Error al cargar proyectos <Button onClick={() => mutate()}>Reintentar</Button></div>
              ) : projects.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">No hay proyectos para mostrar</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha de inicio</TableHead>
                      <TableHead>Fecha de fin</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map(project => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.client?.name ?? project.client_id ?? "-"}</TableCell>
                        <TableCell>{project.status?.name ?? project.status_id ?? "-"}</TableCell>
                        <TableCell>{project.start_date ? new Date(project.start_date).toLocaleDateString() : "-"}</TableCell>
                        <TableCell>{project.end_date ? new Date(project.end_date).toLocaleDateString() : "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingProject(project);
                                setModalOpen(true);
                              }}
                              title="Editar proyecto"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(project)}
                              title={project.is_active ? "Inactivar proyecto" : "Activar proyecto"}
                            >
                              {project.is_active ? (
                                <EyeOff className="h-4 w-4 text-orange-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProject(project)}
                              title="Eliminar proyecto"
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
                    Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, pagination.total_items)} de {pagination.total_items} proyectos
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
      <ProjectFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
        onSuccess={() => {
          setModalOpen(false);
          setEditingProject(null);
          mutate();
        }}
        project={editingProject}
      />
    </ProtectedRoute>
  );
} 