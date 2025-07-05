import api from "./client";
import {
  TimeEntryResponse,
  TimeEntryCreate,
  TimeEntryUpdate,
  TimeEntryWithDetails,
  TimeEntryFilter,
  TimerStart,
  TimerStop,
  TimeSummary,
  PaginatedResponse,
  PaginationParams
} from "@/types";

// Time entries service
export const timeEntriesService = {
  // Get paginated list of time entries
  async getTimeEntries(
    pagination: PaginationParams = { page: 1, limit: 10 },
    filters: TimeEntryFilter = {}
  ): Promise<PaginatedResponse<TimeEntryResponse>> {
    const params = new URLSearchParams();
    
    // Add pagination params
    params.append("page", pagination.page?.toString() || "1");
    params.append("limit", pagination.limit?.toString() || "10");
    
    // Add filter params
    if (filters.project_id) params.append("project_id", filters.project_id.toString());
    if (filters.task_id) params.append("task_id", filters.task_id.toString());
    if (filters.user_id) params.append("user_id", filters.user_id.toString());
    if (filters.date_from) params.append("date_from", filters.date_from);
    if (filters.date_to) params.append("date_to", filters.date_to);
    if (filters.search) params.append("search", filters.search);
    if (filters.is_billable !== undefined) params.append("is_billable", filters.is_billable.toString());
    if (filters.is_running !== undefined) params.append("is_running", filters.is_running.toString());
    
    const response = await api.get(`/time-entries/?${params.toString()}`);
    return response.data;
  },

  // Get time entry by ID with details
  async getTimeEntryById(entryId: number): Promise<TimeEntryWithDetails> {
    const response = await api.get(`/time-entries/${entryId}`);
    return response.data;
  },

  // Create new time entry
  async createTimeEntry(entryData: TimeEntryCreate): Promise<TimeEntryResponse> {
    const response = await api.post("/time-entries/", entryData);
    return response.data;
  },

  // Update time entry
  async updateTimeEntry(entryId: number, entryData: TimeEntryUpdate): Promise<TimeEntryResponse> {
    const response = await api.put(`/time-entries/${entryId}`, entryData);
    return response.data;
  },

  // Delete time entry (soft delete)
  async deleteTimeEntry(entryId: number): Promise<void> {
    await api.delete(`/time-entries/${entryId}`);
  },

  // Get active timer for current user
  async getActiveTimer(): Promise<TimeEntryResponse | null> {
    const response = await api.get("/time-entries/active-timer");
    return response.data;
  },

  // Get time summary for current user
  async getTimeSummary(): Promise<TimeSummary> {
    const response = await api.get("/time-entries/summary");
    return response.data;
  },

  // Start a new timer
  async startTimer(timerData: TimerStart): Promise<TimeEntryResponse> {
    const response = await api.post("/time-entries/start-timer", timerData);
    return response.data;
  },

  // Stop the active timer
  async stopTimer(timerData: TimerStop): Promise<TimeEntryResponse> {
    const response = await api.post("/time-entries/stop-timer", timerData);
    return response.data;
  }
};

// Export individual functions for convenience
export const getTimeEntries = timeEntriesService.getTimeEntries;
export const getTimeEntryById = timeEntriesService.getTimeEntryById;
export const createTimeEntry = timeEntriesService.createTimeEntry;
export const updateTimeEntry = timeEntriesService.updateTimeEntry;
export const deleteTimeEntry = timeEntriesService.deleteTimeEntry;
export const getActiveTimer = timeEntriesService.getActiveTimer;
export const getTimeSummary = timeEntriesService.getTimeSummary;
export const startTimer = timeEntriesService.startTimer;
export const stopTimer = timeEntriesService.stopTimer; 