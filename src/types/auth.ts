// Authentication types
export interface AuthUserBase {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthUserCreate extends AuthUserBase {
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthUserResponse extends AuthUserBase {
  id: number;
  is_active: boolean;
  created_at: string; // ISO datetime string
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenData {
  username?: string;
}

// Extended user types for the frontend
export interface CurrentUser extends AuthUserResponse {
  full_name: string;
  avatar_url?: string;
  timezone: string;
  last_login?: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

// Register form data
export interface RegisterFormData extends AuthUserCreate {
  confirmPassword: string;
  acceptTerms: boolean;
}

// Auth state
export interface AuthState {
  user: CurrentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 