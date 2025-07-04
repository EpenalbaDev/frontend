import { FilterParams } from './common';

// User types
export interface UserBase {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  timezone: string;
  is_active: boolean;
}

export interface UserCreate extends UserBase {
  password: string;
  created_by?: number;
}

export interface UserUpdate {
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  timezone?: string;
  is_active?: boolean;
  password?: string;
}

export interface RoleResponse {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface UserResponse extends UserBase {
  id: number;
  full_name: string;
  last_login?: string; // ISO datetime string
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface UserWithRoles extends UserResponse {
  roles: RoleResponse[];
}

export interface UserFilter extends FilterParams {
  role_id?: number;
}

export interface AssignRoleRequest {
  role_id: number;
}

// User management types
export interface UserTableData extends UserResponse {
  roles: string[]; // Array of role names for display
  status: 'active' | 'inactive';
  last_activity?: string;
}

// User form types
export interface UserFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  confirmPassword?: string;
  timezone: string;
  avatar_url?: string;
  is_active: boolean;
  roles: number[]; // Array of role IDs
}

// User profile types
export interface UserProfile extends UserResponse {
  avatar_url?: string;
  timezone: string;
  roles: RoleResponse[];
  permissions?: string[]; // Array of permission names
} 