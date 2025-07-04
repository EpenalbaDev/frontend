import api from "./client";
import {
  UserResponse,
  UserCreate,
  UserUpdate,
  UserWithRoles,
  UserFilter,
  AssignRoleRequest,
  RoleResponse,
  PaginatedResponse,
  PaginationParams
} from "@/types";

// Users service
export const usersService = {
  // Get paginated list of users
  async getUsers(
    pagination: PaginationParams = { page: 1, limit: 10 },
    filters: UserFilter = {}
  ): Promise<PaginatedResponse<UserResponse>> {
    const params = new URLSearchParams();
    
    // Add pagination params
    params.append("page", pagination.page?.toString() || "1");
    params.append("limit", pagination.limit?.toString() || "10");
    
    // Add filter params
    if (filters.search) params.append("search", filters.search);
    if (filters.is_active !== undefined) params.append("is_active", filters.is_active.toString());
    if (filters.role_id) params.append("role_id", filters.role_id.toString());
    
    const response = await api.get(`/users/?${params.toString()}`);
    return response.data;
  },

  // Get user by ID with roles
  async getUserById(userId: number): Promise<UserWithRoles> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Create new user
  async createUser(userData: UserCreate): Promise<UserResponse> {
    const response = await api.post("/users/", userData);
    return response.data;
  },

  // Update user
  async updateUser(userId: number, userData: UserUpdate): Promise<UserResponse> {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  // Delete user (soft delete)
  async deleteUser(userId: number): Promise<void> {
    await api.delete(`/users/${userId}`);
  },

  // Get user roles
  async getUserRoles(userId: number): Promise<RoleResponse[]> {
    const response = await api.get(`/users/${userId}/roles`);
    return response.data;
  },

  // Assign role to user
  async assignRoleToUser(userId: number, roleData: AssignRoleRequest): Promise<void> {
    await api.post(`/users/${userId}/roles`, roleData);
  },

  // Remove role from user
  async removeRoleFromUser(userId: number, roleId: number): Promise<void> {
    await api.delete(`/users/${userId}/roles/${roleId}`);
  },

  // Get all roles (for dropdowns, etc.)
  async getRoles(): Promise<RoleResponse[]> {
    const response = await api.get("/roles/");
    return response.data;
  }
};

// Export individual functions for convenience
export const getUsers = usersService.getUsers;
export const getUserById = usersService.getUserById;
export const createUser = usersService.createUser;
export const updateUser = usersService.updateUser;
export const deleteUser = usersService.deleteUser;
export const getUserRoles = usersService.getUserRoles;
export const assignRoleToUser = usersService.assignRoleToUser;
export const removeRoleFromUser = usersService.removeRoleFromUser;
export const getRoles = usersService.getRoles; 