import useSWR from 'swr';
import { getProjects } from '@/lib/api';
import { ProjectResponse, ProjectFilter, PaginatedResponse, PaginationParams } from '@/types';

interface UseProjectsOptions {
  pagination?: PaginationParams;
  filters?: ProjectFilter;
}

export function useProjects({ pagination = { page: 1, limit: 10 }, filters = {} }: UseProjectsOptions = {}) {
  const key = ['/projects', pagination, filters];
  const fetcher = () => getProjects(pagination, filters);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<ProjectResponse>>(key, fetcher);

  return {
    projects: data?.items || [],
    pagination: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 