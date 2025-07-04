import useSWR from 'swr';
import { getCurrentUser } from '@/lib/api';
import { CurrentUser } from '@/types';

// Hook para obtener el usuario autenticado actual
export function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR<CurrentUser>(
    '/auth/me',
    getCurrentUser
  );

  return {
    user: data,
    isLoading,
    isError: !!error,
    error,
    mutate, // Permite revalidar manualmente
  };
} 