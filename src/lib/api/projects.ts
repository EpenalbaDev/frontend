import api from "./client";
import {
  ProjectResponse,
  ProjectCreate,
  ProjectUpdate,
  ProjectWithDetails,
  ProjectFilter,
  ProjectStatusResponse,
  PaginatedResponse,
  PaginationParams
} from "@/types";

// Projects service
export const projectsService = {
  // Get paginated list of projects
  async getProjects(
    pagination: PaginationParams = { page: 1, limit: 10 },
    filters: ProjectFilter = {}
  ): Promise<PaginatedResponse<ProjectWithDetails>> {
    const params = new URLSearchParams();
    
    // Add pagination params
    params.append("page", pagination.page?.toString() || "1");
    params.append("limit", pagination.limit?.toString() || "10");
    
    // Add filter params
    if (filters.search) params.append("search", filters.search);
    if (filters.client_id) params.append("client_id", filters.client_id.toString());
    if (filters.project_manager_id) params.append("project_manager_id", filters.project_manager_id.toString());
    if (filters.status_id) params.append("status_id", filters.status_id.toString());
    if (filters.is_active !== undefined) params.append("is_active", filters.is_active.toString());
    
    const response = await api.get(`/projects/?${params.toString()}`);
    return response.data;
  },

  // Get project by ID with details
  async getProjectById(projectId: number): Promise<ProjectWithDetails> {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  },

  // Create new project
  async createProject(projectData: ProjectCreate): Promise<ProjectResponse> {
    const response = await api.post("/projects/", projectData);
    return response.data;
  },

  // Update project
  async updateProject(projectId: number, projectData: ProjectUpdate): Promise<ProjectResponse> {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  },

  // Delete project (soft delete)
  async deleteProject(projectId: number): Promise<void> {
    await api.delete(`/projects/${projectId}`);
  },

  // Get project tasks
  async getProjectTasks(projectId: number): Promise<any[]> {
    const response = await api.get(`/projects/${projectId}/tasks`);
    return response.data;
  },

  // Get project time entries
  async getProjectTimeEntries(projectId: number): Promise<any[]> {
    const response = await api.get(`/projects/${projectId}/time-entries`);
    return response.data;
  },

  // Get project statuses
  async getProjectStatuses(): Promise<ProjectStatusResponse[]> {
    const response = await api.get("/projects/statuses");
    return response.data;
  }
};

// Export individual functions for convenience
export const getProjects = projectsService.getProjects;
export const getProjectById = projectsService.getProjectById;
export const createProject = projectsService.createProject;
export const updateProject = projectsService.updateProject;
export const deleteProject = projectsService.deleteProject;
export const getProjectTasks = projectsService.getProjectTasks;
export const getProjectTimeEntries = projectsService.getProjectTimeEntries;
export const getProjectStatuses = projectsService.getProjectStatuses; 