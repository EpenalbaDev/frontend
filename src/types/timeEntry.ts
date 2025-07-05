import { UserResponse } from './user';
import { ProjectResponse } from './project';
import { TaskResponse } from './task';

// Time entry types
export interface TimeEntryBase {
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
  project_details?: {
    id: number;
    name: string;
    description?: string;
    client_id: number;
    is_active: boolean;
  };
  task_details?: {
    id: number;
    name: string;
    description?: string;
    project_id: number;
    is_active: boolean;
  };
  user_details?: {
    id: number;
    full_name: string;
    email: string;
    is_active: boolean;
  };
}

// Filter types
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

// Summary types
export interface TimeSummary {
  total_hours_today: number;
  total_hours_week: number;
  total_hours_month: number;
  billable_hours_today: number;
  billable_hours_week: number;
  billable_hours_month: number;
  active_timer?: TimeEntryResponse;
}

// Time entry form types
export interface TimeEntryFormData {
  work_date: string; // ISO date string
  project_id: number;
  task_id: number;
  description: string;
  start_time: string; // HH:mm format
  end_time?: string; // HH:mm format
  rate_per_hour?: number;
  currency: string;
  comments?: string;
  is_billable: boolean;
}

// Time entry table data
export interface TimeEntryTableData extends TimeEntryResponse {
  duration_formatted?: string;
  cost_formatted?: string;
  is_running?: boolean;
  can_edit?: boolean;
  can_delete?: boolean;
}

// Time tracking statistics
export interface TimeTrackingStats {
  total_entries: number;
  total_hours: number;
  total_cost: number;
  average_hours_per_day: number;
  most_active_project?: {
    id: number;
    name: string;
    hours: number;
  };
  most_active_task?: {
    id: number;
    name: string;
    hours: number;
  };
}

// Timer state
export interface TimerState {
  is_running: boolean;
  active_timer?: TimeEntryResponse;
  elapsed_time?: number; // seconds
  start_time?: Date;
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