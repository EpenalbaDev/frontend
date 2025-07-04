import api from "./client";
import {
  TaskResponse,
  TaskCreate,
  TaskUpdate,
  TaskWithDetails,
  TaskWithSubtasks,
  TaskFilter,
  TaskCategoryResponse,
  TaskStatusResponse,
  PriorityResponse,
  PaginatedResponse,
  PaginationParams
} from "@/types";

// Tasks service
export const tasksService = {
  // Get paginated list of tasks
  async getTasks(
    pagination: PaginationParams = { page: 1, limit: 10 },
    filters: TaskFilter = {}
  ): Promise<PaginatedResponse<TaskResponse>> {
    const params = new URLSearchParams();
    
    // Add pagination params
    params.append("page", pagination.page?.toString() || "1");
    params.append("limit", pagination.limit?.toString() || "10");
    
    // Add filter params
    if (filters.search) params.append("search", filters.search);
    if (filters.project_id) params.append("project_id", filters.project_id.toString());
    if (filters.category_id) params.append("category_id", filters.category_id.toString());
    if (filters.priority_id) params.append("priority_id", filters.priority_id.toString());
    if (filters.status_id) params.append("status_id", filters.status_id.toString());
    if (filters.assigned_to) params.append("assigned_to", filters.assigned_to.toString());
    if (filters.parent_task_id) params.append("parent_task_id", filters.parent_task_id.toString());
    if (filters.is_active !== undefined) params.append("is_active", filters.is_active.toString());
    if (filters.due_date_from) params.append("due_date_from", filters.due_date_from);
    if (filters.due_date_to) params.append("due_date_to", filters.due_date_to);
    
    const response = await api.get(`/tasks/?${params.toString()}`);
    return response.data;
  },

  // Get task by ID with details
  async getTaskById(taskId: number): Promise<TaskWithDetails> {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  // Create new task
  async createTask(taskData: TaskCreate): Promise<TaskResponse> {
    const response = await api.post("/tasks/", taskData);
    return response.data;
  },

  // Update task
  async updateTask(taskId: number, taskData: TaskUpdate): Promise<TaskResponse> {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Delete task (soft delete)
  async deleteTask(taskId: number): Promise<void> {
    await api.delete(`/tasks/${taskId}`);
  },

  // Get task subtasks
  async getTaskSubtasks(taskId: number): Promise<TaskResponse[]> {
    const response = await api.get(`/tasks/${taskId}/subtasks`);
    return response.data;
  },

  // Create subtask
  async createSubtask(taskId: number, taskData: TaskCreate): Promise<TaskResponse> {
    const response = await api.post(`/tasks/${taskId}/subtasks`, taskData);
    return response.data;
  },

  // Get task with subtasks
  async getTaskWithSubtasks(taskId: number): Promise<TaskWithSubtasks> {
    const response = await api.get(`/tasks/${taskId}/with-subtasks`);
    return response.data;
  },

  // Get task categories
  async getTaskCategories(): Promise<TaskCategoryResponse[]> {
    const response = await api.get("/tasks/categories");
    return response.data;
  },

  // Get task statuses
  async getTaskStatuses(): Promise<TaskStatusResponse[]> {
    const response = await api.get("/tasks/statuses");
    return response.data;
  },

  // Get priorities
  async getPriorities(): Promise<PriorityResponse[]> {
    const response = await api.get("/tasks/priorities");
    return response.data;
  },

  // Get my tasks (assigned to current user)
  async getMyTasks(
    pagination: PaginationParams = { page: 1, limit: 10 }
  ): Promise<PaginatedResponse<TaskResponse>> {
    const params = new URLSearchParams();
    params.append("page", pagination.page?.toString() || "1");
    params.append("limit", pagination.limit?.toString() || "10");
    
    const response = await api.get(`/tasks/my-tasks?${params.toString()}`);
    return response.data;
  },

  // Assign task to user
  async assignTask(taskId: number, userId: number): Promise<TaskResponse> {
    const response = await api.put(`/tasks/${taskId}/assign`, { assigned_to: userId });
    return response.data;
  },

  // Update task status
  async updateTaskStatus(taskId: number, statusId: number): Promise<TaskResponse> {
    const response = await api.put(`/tasks/${taskId}/status`, { status_id: statusId });
    return response.data;
  }
};

// Export individual functions for convenience
export const getTasks = tasksService.getTasks;
export const getTaskById = tasksService.getTaskById;
export const createTask = tasksService.createTask;
export const updateTask = tasksService.updateTask;
export const deleteTask = tasksService.deleteTask;
export const getTaskSubtasks = tasksService.getTaskSubtasks;
export const createSubtask = tasksService.createSubtask;
export const getTaskWithSubtasks = tasksService.getTaskWithSubtasks;
export const getTaskCategories = tasksService.getTaskCategories;
export const getTaskStatuses = tasksService.getTaskStatuses;
export const getPriorities = tasksService.getPriorities;
export const getMyTasks = tasksService.getMyTasks;
export const assignTask = tasksService.assignTask;
export const updateTaskStatus = tasksService.updateTaskStatus; 