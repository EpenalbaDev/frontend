import { UserResponse } from './user';
import { ProjectResponse } from './project';

// Task category types
export interface TaskCategoryResponse {
  id: number;
  name: string;
  description?: string;
  color?: string;
  is_active: boolean;
}

// Task status types
export interface TaskStatusResponse {
  id: number;
  name: string;
  color?: string;
  is_final: boolean;
  is_active: boolean;
}

// Priority types
export interface PriorityResponse {
  id: number;
  name: string;
  level: number;
  color?: string;
  is_active: boolean;
}

// Task base types
export interface TaskBase {
  name: string;
  description?: string;
  project_id: number;
  parent_task_id?: number;
  category_id: number;
  priority_id: number;
  status_id: number;
  assigned_to?: number;
  estimated_hours?: number;
  rate_per_hour?: number;
  currency: string;
  due_date?: string; // ISO date string
  is_active: boolean;
}

export interface TaskCreate extends TaskBase {
  // Inherits all properties from TaskBase
}

export interface TaskUpdate {
  name?: string;
  description?: string;
  category_id?: number;
  priority_id?: number;
  status_id?: number;
  assigned_to?: number;
  estimated_hours?: number;
  rate_per_hour?: number;
  currency?: string;
  due_date?: string; // ISO date string
  is_active?: boolean;
}

export interface TaskResponse extends TaskBase {
  id: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface TaskWithDetails extends TaskResponse {
  project?: ProjectResponse;
  category?: TaskCategoryResponse;
  priority?: PriorityResponse;
  status?: TaskStatusResponse;
  assigned_user?: UserResponse;
  parent_task?: any; // Could be TaskResponse or simplified object
}

export interface TaskWithSubtasks extends TaskWithDetails {
  subtasks: any[]; // Array of TaskResponse or simplified objects
}

// Task filter types
export interface TaskFilter {
  project_id?: number;
  category_id?: number;
  priority_id?: number;
  status_id?: number;
  assigned_to?: number;
  parent_task_id?: number;
  is_active?: boolean;
  search?: string;
  due_date_from?: string; // ISO date string
  due_date_to?: string; // ISO date string
}

// Task management types
export interface TaskTableData extends TaskResponse {
  project_name?: string;
  category_name?: string;
  category_color?: string;
  priority_name?: string;
  priority_color?: string;
  status_name?: string;
  status_color?: string;
  assigned_user_name?: string;
  subtasks_count?: number;
  time_spent?: number;
  time_estimated?: number;
  progress_percentage?: number;
  is_overdue?: boolean;
}

// Task form types
export interface TaskFormData {
  name: string;
  description?: string;
  project_id: number;
  parent_task_id?: number;
  category_id: number;
  priority_id: number;
  status_id: number;
  assigned_to?: number;
  estimated_hours?: number;
  rate_per_hour?: number;
  currency: string;
  due_date?: string; // ISO date string
  is_active: boolean;
}

// Task statistics
export interface TaskStats {
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  overdue_tasks: number;
  total_hours_spent: number;
  total_hours_estimated: number;
  completion_rate: number;
}

// Task with extended information
export interface TaskWithStats extends TaskWithDetails {
  stats: TaskStats;
}

// Task assignment
export interface TaskAssignment {
  task_id: number;
  user_id: number;
  assigned_at: string; // ISO datetime string
  assigned_by: number;
}

// Task comment
export interface TaskComment {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  user?: UserResponse;
}

// Task attachment
export interface TaskAttachment {
  id: number;
  task_id: number;
  filename: string;
  file_size: number;
  file_type: string;
  uploaded_by: number;
  uploaded_at: string; // ISO datetime string
  user?: UserResponse;
} 