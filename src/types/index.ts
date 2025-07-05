// Export all types from their respective modules
export * from './common';
export * from './auth';
export * from './user';
export * from './client';
export * from './project';
export * from './task';
export * from './timeEntry';
export * from './reports';

// Calendar Event Types
export interface CalendarEvent {
  id: number;
  event_name: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  organizer?: string;
  attendees?: string;
  recurring?: string;
  meeting_link?: string;
  description?: string;
  duration_minutes?: number;
  duration_hours?: number;
  duration_formatted?: string;
  unique_hash: string;
  is_active: boolean;
  created_by: number;
  created_by_user_name?: string;
  modified_by?: number;
  modified_by_user_name?: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarEventCreate {
  event_name: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  organizer?: string;
  attendees?: string;
  recurring?: string;
  meeting_link?: string;
  description?: string;
  duration_minutes?: number;
  duration_hours?: number;
  duration_formatted?: string;
  is_active?: boolean;
}

export interface CalendarEventUpdate {
  event_name?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  organizer?: string;
  attendees?: string;
  recurring?: string;
  meeting_link?: string;
  description?: string;
  duration_minutes?: number;
  duration_hours?: number;
  duration_formatted?: string;
  is_active?: boolean;
}

export interface CalendarEventFilter {
  event_name?: string;
  organizer?: string;
  location?: string;
  start_date_from?: string;
  start_date_to?: string;
  end_date_from?: string;
  end_date_to?: string;
  recurring?: string;
  is_active?: boolean;
  search?: string;
}

export interface CalendarUploadResponse {
  success: boolean;
  total_records: number;
  inserted_records: number;
  duplicate_records: number;
  invalid_records: number;
  message: string;
}

export interface CalendarStatsResponse {
  total_events: number;
  unique_events: number;
  earliest_event?: string;
  latest_event?: string;
  avg_duration_hours?: number;
  total_duration_hours?: number;
} 