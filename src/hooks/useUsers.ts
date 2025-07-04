import useSWR from 'swr';
import { getUsers } from '@/lib/api';
import { UserResponse, UserFilter, PaginatedResponse, PaginationParams } from '@/types';

interface UseUsersOptions {
  pagination?: PaginationParams;
  filters?: UserFilter;
}

export function useUsers({ pagination = { page: 1, limit: 10 }, filters = {} }: UseUsersOptions = {}) {
  const key = ['/users', pagination, filters];
  const fetcher = () => getUsers(pagination, filters);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<UserResponse>>(key, fetcher);

  return {
    users: data?.items || [],
    pagination: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 