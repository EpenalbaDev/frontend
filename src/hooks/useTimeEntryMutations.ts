import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createTimeEntry, updateTimeEntry, deleteTimeEntry, startTimer, stopTimer } from '@/lib/api';
import { TimeEntryCreate, TimeEntryUpdate, TimerStart, TimerStop } from '@/types';

export function useCreateTimeEntry() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const create = async (entryData: TimeEntryCreate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newEntry = await createTimeEntry(entryData);
      
      // Invalidate and revalidate time entries cache
      mutate((key) => Array.isArray(key) && key[0] === '/time-entries');
      
      return newEntry;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function useUpdateTimeEntry() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const update = async (entryId: number, entryData: TimeEntryUpdate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedEntry = await updateTimeEntry(entryId, entryData);
      
      // Invalidate and revalidate time entries cache
      mutate((key) => Array.isArray(key) && key[0] === '/time-entries');
      
      // Update specific time entry cache
      mutate(`/time-entries/${entryId}`, updatedEntry, false);
      
      return updatedEntry;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}

export function useDeleteTimeEntry() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const remove = async (entryId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteTimeEntry(entryId);
      
      // Invalidate and revalidate time entries cache
      mutate((key) => Array.isArray(key) && key[0] === '/time-entries');
      
      // Remove specific time entry from cache
      mutate(`/time-entries/${entryId}`, undefined, false);
      
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error };
}

export function useStartTimer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const start = async (timerData: TimerStart) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const timer = await startTimer(timerData);
      
      // Invalidate and revalidate time entries cache
      mutate((key) => Array.isArray(key) && key[0] === '/time-entries');
      
      // Update active timer cache
      mutate('/time-entries/active-timer', timer, false);
      
      return timer;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { start, isLoading, error };
}

export function useStopTimer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const stop = async (timerData: TimerStop) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const stoppedEntry = await stopTimer(timerData);
      
      // Invalidate and revalidate time entries cache
      mutate((key) => Array.isArray(key) && key[0] === '/time-entries');
      
      // Clear active timer cache
      mutate('/time-entries/active-timer', null, false);
      
      // Update time summary cache
      mutate('/time-entries/summary');
      
      return stoppedEntry;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { stop, isLoading, error };
} 