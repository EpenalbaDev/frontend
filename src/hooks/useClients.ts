import useSWR from 'swr';
import { getClients } from '@/lib/api';
import { ClientResponse, FilterParams, PaginatedResponse, PaginationParams } from '@/types';

interface UseClientsOptions {
  pagination?: PaginationParams;
  filters?: FilterParams;
}

export function useClients({ pagination = { page: 1, limit: 10 }, filters = {} }: UseClientsOptions = {}) {
  const key = ['/clients', pagination, filters];
  const fetcher = () => getClients(pagination, filters);
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<ClientResponse>>(key, fetcher);

  return {
    clients: data?.items || [],
    pagination: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 