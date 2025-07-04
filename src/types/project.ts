import { UserResponse } from './user';
import { ClientResponse } from './client';

// Project status types
export interface ProjectStatusResponse {
  id: number;
  name: string;
  color?: string;
  description?: string;
  is_active: boolean;
}

// Project base types
export interface ProjectBase {
  name: string;
  description?: string;
  client_id: number;
  project_manager_id: number;
  status_id: number;
  start_date?: string; // ISO date string
  end_date?: string; // ISO date string
  estimated_hours?: number;
  budget?: number;
  currency: string;
  is_active: boolean;
}

export interface ProjectCreate extends ProjectBase {
  // Inherits all properties from ProjectBase
}

export interface ProjectUpdate {
  name?: string;
  description?: string;
  project_manager_id?: number;
  status_id?: number;
  start_date?: string; // ISO date string
  end_date?: string; // ISO date string
  estimated_hours?: number;
  budget?: number;
  currency?: string;
  is_active?: boolean;
}

export interface ProjectResponse extends ProjectBase {
  id: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface ProjectWithDetails extends ProjectResponse {
  client?: ClientResponse;
  project_manager?: UserResponse;
  status?: ProjectStatusResponse;
}

// Project filter types
export interface ProjectFilter {
  client_id?: number;
  project_manager_id?: number;
  status_id?: number;
  is_active?: boolean;
  search?: string;
}

// Project management types
export interface ProjectTableData extends ProjectResponse {
  client_name?: string;
  project_manager_name?: string;
  status_name?: string;
  status_color?: string;
  progress_percentage?: number;
  tasks_count?: number;
  completed_tasks_count?: number;
  total_hours?: number;
  total_cost?: number;
}

// Project form types
export interface ProjectFormData {
  name: string;
  description?: string;
  client_id: number;
  project_manager_id: number;
  status_id: number;
  start_date?: string; // ISO date string
  end_date?: string; // ISO date string
  estimated_hours?: number;
  budget?: number;
  currency: string;
  is_active: boolean;
}

// Project statistics
export interface ProjectStats {
  total_tasks: number;
  completed_tasks: number;
  total_hours: number;
  total_cost: number;
  progress_percentage: number;
  budget_utilization: number;
  team_size: number;
}

// Project with extended information
export interface ProjectWithStats extends ProjectWithDetails {
  stats: ProjectStats;
}

// Project timeline
export interface ProjectTimeline {
  project_id: number;
  project_name: string;
  start_date: string;
  end_date: string;
  milestones: ProjectMilestone[];
}

export interface ProjectMilestone {
  id: number;
  name: string;
  description?: string;
  due_date: string;
  completed: boolean;
  completed_date?: string;
} 