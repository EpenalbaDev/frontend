import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createTask, updateTask, deleteTask, assignTask, updateTaskStatus } from '@/lib/api';
import { TaskCreate, TaskUpdate } from '@/types';

export function useCreateTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const create = async (taskData: TaskCreate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newTask = await createTask(taskData);
      
      // Invalidate and revalidate tasks cache
      mutate((key) => Array.isArray(key) && key[0] === '/tasks');
      
      return newTask;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function useUpdateTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const update = async (taskId: number, taskData: TaskUpdate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedTask = await updateTask(taskId, taskData);
      
      // Invalidate and revalidate tasks cache
      mutate((key) => Array.isArray(key) && key[0] === '/tasks');
      
      // Update specific task cache
      mutate(`/tasks/${taskId}`, updatedTask, false);
      
      return updatedTask;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}

export function useDeleteTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const remove = async (taskId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteTask(taskId);
      
      // Invalidate and revalidate tasks cache
      mutate((key) => Array.isArray(key) && key[0] === '/tasks');
      
      // Remove specific task from cache
      mutate(`/tasks/${taskId}`, undefined, false);
      
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error };
}

export function useAssignTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const assign = async (taskId: number, userId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedTask = await assignTask(taskId, userId);
      
      // Invalidate and revalidate tasks cache
      mutate((key) => Array.isArray(key) && key[0] === '/tasks');
      
      // Update specific task cache
      mutate(`/tasks/${taskId}`, updatedTask, false);
      
      return updatedTask;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { assign, isLoading, error };
}

export function useUpdateTaskStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const updateStatus = async (taskId: number, statusId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedTask = await updateTaskStatus(taskId, statusId);
      
      // Invalidate and revalidate tasks cache
      mutate((key) => Array.isArray(key) && key[0] === '/tasks');
      
      // Update specific task cache
      mutate(`/tasks/${taskId}`, updatedTask, false);
      
      return updatedTask;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading, error };
} 