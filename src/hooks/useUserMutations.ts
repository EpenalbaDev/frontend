import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createUser, updateUser, deleteUser, assignRoleToUser, removeRoleFromUser } from '@/lib/api';
import { UserCreate, UserUpdate, AssignRoleRequest } from '@/types';

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const create = async (userData: UserCreate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newUser = await createUser(userData);
      
      // Invalidate and revalidate users cache
      mutate((key) => Array.isArray(key) && key[0] === '/users');
      
      return newUser;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const update = async (userId: number, userData: UserUpdate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedUser = await updateUser(userId, userData);
      
      // Invalidate and revalidate users cache
      mutate((key) => Array.isArray(key) && key[0] === '/users');
      
      // Update specific user cache
      mutate(`/users/${userId}`, updatedUser, false);
      
      return updatedUser;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}

export function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const remove = async (userId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await deleteUser(userId);
      
      // Invalidate and revalidate users cache
      mutate((key) => Array.isArray(key) && key[0] === '/users');
      
      // Remove specific user from cache
      mutate(`/users/${userId}`, undefined, false);
      
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error };
}

export function useAssignRole() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const assign = async (userId: number, roleData: AssignRoleRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await assignRoleToUser(userId, roleData);
      
      // Invalidate user roles cache
      mutate(`/users/${userId}/roles`);
      
      // Invalidate users cache to refresh user data
      mutate((key) => Array.isArray(key) && key[0] === '/users');
      
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { assign, isLoading, error };
}

export function useRemoveRole() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const remove = async (userId: number, roleId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await removeRoleFromUser(userId, roleId);
      
      // Invalidate user roles cache
      mutate(`/users/${userId}/roles`);
      
      // Invalidate users cache to refresh user data
      mutate((key) => Array.isArray(key) && key[0] === '/users');
      
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading, error };
} 