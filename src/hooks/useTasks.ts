import useSWR from 'swr';
import { getTasks } from '@/lib/api';
import { TaskWithDetails, TaskFilter, PaginatedResponse, PaginationParams } from '@/types';

interface UseTasksOptions {
  pagination?: PaginationParams;
  filters?: TaskFilter;
}

export function useTasks({ pagination = { page: 1, limit: 10 }, filters = {} }: UseTasksOptions = {}) {
  const key = ['/tasks', pagination, filters];
  const fetcher = () => getTasks(pagination, filters);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<TaskWithDetails>>(key, fetcher);

  return {
    tasks: data?.items || [],
    pagination: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 