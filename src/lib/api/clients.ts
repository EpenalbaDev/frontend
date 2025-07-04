import api from "./client";
import {
  ClientResponse,
  ClientCreate,
  ClientUpdate,
  PaginatedResponse,
  PaginationParams,
  FilterParams
} from "@/types";

// Clients service
export const clientsService = {
  // Get paginated list of clients
  async getClients(
    pagination: PaginationParams = { page: 1, limit: 10 },
    filters: FilterParams = {}
  ): Promise<PaginatedResponse<ClientResponse>> {
    const params = new URLSearchParams();
    
    // Add pagination params
    params.append("page", pagination.page?.toString() || "1");
    params.append("limit", pagination.limit?.toString() || "10");
    
    // Add filter params
    if (filters.search) params.append("search", filters.search);
    if (filters.is_active !== undefined) params.append("is_active", filters.is_active.toString());
    
    const response = await api.get(`/clients/?${params.toString()}`);
    return response.data;
  },

  // Get client by ID
  async getClientById(clientId: number): Promise<ClientResponse> {
    const response = await api.get(`/clients/${clientId}`);
    return response.data;
  },

  // Create new client
  async createClient(clientData: ClientCreate): Promise<ClientResponse> {
    const response = await api.post("/clients/", clientData);
    return response.data;
  },

  // Update client
  async updateClient(clientId: number, clientData: ClientUpdate): Promise<ClientResponse> {
    const response = await api.put(`/clients/${clientId}`, clientData);
    return response.data;
  },

  // Delete client (soft delete)
  async deleteClient(clientId: number): Promise<void> {
    await api.delete(`/clients/${clientId}`);
  },

  // Get client projects
  async getClientProjects(clientId: number): Promise<any[]> {
    const response = await api.get(`/clients/${clientId}/projects`);
    return response.data;
  }
};

// Export individual functions for convenience
export const getClients = clientsService.getClients;
export const getClientById = clientsService.getClientById;
export const createClient = clientsService.createClient;
export const updateClient = clientsService.updateClient;
export const deleteClient = clientsService.deleteClient;
export const getClientProjects = clientsService.getClientProjects; 