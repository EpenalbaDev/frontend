import useSWR from 'swr';
import { getTimeEntries, getTimeSummary, getActiveTimer } from '@/lib/api/timeEntries';
import { TimeEntryResponse, TimeEntryFilter, TimeSummary, PaginatedResponse, PaginationParams } from '@/types';

interface UseTimeEntriesOptions {
  pagination?: PaginationParams;
  filters?: TimeEntryFilter;
}

export function useTimeEntries({ pagination = { page: 1, limit: 10 }, filters = {} }: UseTimeEntriesOptions = {}) {
  const key = ['/time-entries', pagination, filters];
  const fetcher = () => getTimeEntries(pagination, filters);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<TimeEntryResponse>>(key, fetcher);

  return {
    timeEntries: data?.items || [],
    pagination: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useTimeSummary() {
  const { data, error, isLoading, mutate } = useSWR<TimeSummary>('/time-entries/summary', getTimeSummary);

  return {
    summary: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

export function useActiveTimer() {
  const { data, error, isLoading, mutate } = useSWR<TimeEntryResponse | null>('/time-entries/active-timer', getActiveTimer);

  return {
    activeTimer: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 