import useSWR from 'swr';
import { getTimeEntries } from '@/lib/api';
import { TimeEntryResponse, TimeEntryFilter, PaginatedResponse, PaginationParams } from '@/types';

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