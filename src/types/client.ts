// Client types
export interface ClientBase {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  timezone: string;
  is_active: boolean;
}

export interface ClientCreate extends ClientBase {
  // Inherits all properties from ClientBase
}

export interface ClientUpdate {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  timezone?: string;
  is_active?: boolean;
}

export interface ClientResponse extends ClientBase {
  id: number;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

// Client management types
export interface ClientTableData extends ClientResponse {
  projects_count?: number;
  total_revenue?: number;
  status: 'active' | 'inactive';
}

// Client form types
export interface ClientFormData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  timezone: string;
  is_active: boolean;
}

// Client statistics
export interface ClientStats {
  total_projects: number;
  active_projects: number;
  total_revenue: number;
  total_hours: number;
  last_activity?: string;
}

// Client with extended information
export interface ClientWithStats extends ClientResponse {
  stats: ClientStats;
} 