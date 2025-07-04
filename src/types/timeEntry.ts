import { UserResponse } from './user';
import { ProjectResponse } from './project';
import { TaskResponse } from './task';

// Time entry base types
export interface TimeEntryBase {
  work_date: string; // ISO date string
  project_id: number;
  task_id: number;
  description?: string;
  start_time: string; // HH:mm format
  end_time?: string; // HH:mm format
  rate_per_hour?: number;
  currency?: string;
  comments?: string;
  is_billable?: boolean;
}

export interface TimeEntryCreate extends TimeEntryBase {
  // Inherits all properties from TimeEntryBase
}

export interface TimeEntryUpdate {
  work_date?: string; // ISO date string
  project_id?: number;
  task_id?: number;
  description?: string;
  start_time?: string; // HH:mm format
  end_time?: string; // HH:mm format
  rate_per_hour?: number;
  currency?: string;
  comments?: string;
  is_billable?: boolean;
}

export interface TimeEntryResponse extends TimeEntryBase {
  id: number;
  user_id: number;
  total_hours?: number;
  total_cost?: number;
  project_name?: string;
  task_name?: string;
  user_name?: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface TimeEntryWithDetails extends TimeEntryResponse {
  project_details?: any; // ProjectResponse or simplified object
  task_details?: any; // TaskResponse or simplified object
  user_details?: any; // UserResponse or simplified object
}

// Time entry filter types
export interface TimeEntryFilter {
  project_id?: number;
  task_id?: number;
  user_id?: number;
  date_from?: string; // ISO date string
  date_to?: string; // ISO date string
  search?: string;
  is_billable?: boolean;
  is_running?: boolean;
}

// Timer types
export interface TimerStart {
  project_id: number;
  task_id: number;
  description: string;
  start_time: string; // HH:mm format
}

export interface TimerStop {
  end_time: string; // HH:mm format
  description?: string;
}

// Time summary types
export interface TimeSummary {
  total_hours_today: number;
  total_hours_week: number;
  total_hours_month: number;
  active_timer?: TimeEntryResponse;
  billable_hours_today: number;
  billable_hours_week: number;
  billable_hours_month: number;
}

// Time entry management types
export interface TimeEntryTableData extends TimeEntryResponse {
  project_name: string;
  task_name: string;
  user_name: string;
  duration_formatted: string; // e.g., "2h 30m"
  cost_formatted: string; // e.g., "$150.00"
  is_running: boolean;
  status: 'completed' | 'running' | 'paused';
}

// Time entry form types
export interface TimeEntryFormData {
  work_date: string; // ISO date string
  project_id: number;
  task_id: number;
  description?: string;
  start_time: string; // HH:mm format
  end_time?: string; // HH:mm format
  rate_per_hour?: number;
  currency: string;
  comments?: string;
  is_billable: boolean;
}

// Time tracking statistics
export interface TimeTrackingStats {
  total_hours_today: number;
  total_hours_week: number;
  total_hours_month: number;
  billable_hours_today: number;
  billable_hours_week: number;
  billable_hours_month: number;
  total_cost_today: number;
  total_cost_week: number;
  total_cost_month: number;
  active_timers_count: number;
  projects_worked_today: number;
  tasks_worked_today: number;
}

// Time entry with extended information
export interface TimeEntryWithStats extends TimeEntryWithDetails {
  stats: TimeTrackingStats;
}

// Time entry bulk operations
export interface TimeEntryBulkUpdate {
  entry_ids: number[];
  updates: Partial<TimeEntryUpdate>;
}

export interface TimeEntryBulkDelete {
  entry_ids: number[];
}

// Time entry export
export interface TimeEntryExport {
  format: 'csv' | 'excel' | 'pdf';
  date_from: string; // ISO date string
  date_to: string; // ISO date string
  filters?: TimeEntryFilter;
  include_details?: boolean;
}

// Time entry import
export interface TimeEntryImport {
  file: File;
  project_id?: number;
  task_id?: number;
  user_id?: number;
  skip_duplicates?: boolean;
} 