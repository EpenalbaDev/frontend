import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createProject, updateProject, deleteProject } from '@/lib/api';
import { ProjectCreate, ProjectUpdate } from '@/types';

export function useCreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const create = async (projectData: ProjectCreate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newProject = await createProject(projectData);
      
      // Invalidate and revalidate projects cache
      mutate((key) => Array.isArray(key) && key[0] === '/projects');
      
      return newProject;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function useUpdateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const update = async (projectId: number, projectData: ProjectUpdate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedProject = await updateProject(projectId, projectData);
      
      // Invalidate and revalidate projects cache
      mutate((key) => Array.isArray(key) && key[0] === '/projects');
      
      // Update specific project cache
      mutate(`/projects/${projectId}`, updatedProject, false);
      
      return updatedProject;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}

export function useDeleteProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const remove = async (projectId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteProject(projectId);
      
      // Invalidate and revalidate projects cache
      mutate((key) => Array.isArray(key) && key[0] === '/projects');
      
      // Remove specific project from cache
      mutate(`/projects/${projectId}`, undefined, false);
      
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error };
} 