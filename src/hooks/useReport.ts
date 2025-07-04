import useSWR from 'swr';
import { getTimeSummaryReport } from '@/lib/api';
import { TimeSummaryReport } from '@/types';

interface UseReportOptions {
  startDate: string;
  endDate: string;
  projectId?: number;
  userId?: number;
}

export function useReport({ startDate, endDate, projectId, userId }: UseReportOptions) {
  const key = ['/reports/time-summary', startDate, endDate, projectId, userId];
  const fetcher = () => getTimeSummaryReport(startDate, endDate, projectId, userId);
  const { data, error, isLoading, mutate } = useSWR<TimeSummaryReport>(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  return {
    report: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
} 