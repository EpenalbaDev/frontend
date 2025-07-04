import useSWR from 'swr';
import { getDashboardMetrics } from '@/lib/api';
import { DashboardMetrics } from '@/types';
import { useUsers } from '@/hooks/useUsers';

export function useDashboardMetrics() {
  const { data, error, isLoading, mutate } = useSWR<DashboardMetrics>(
    '/dashboard/metrics',
    getDashboardMetrics
  );

  const { users, isLoading: usersLoading, isError: usersError, pagination } = useUsers({
    pagination: { page: 1, limit: 20 },
    filters: { search: 'john' }
  });

  return {
    metrics: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 