import api from './client';
import { 
  CalendarEvent, 
  CalendarEventCreate, 
  CalendarEventUpdate, 
  CalendarEventFilter,
  CalendarUploadResponse,
  CalendarStatsResponse,
  PaginatedResponse 
} from '@/types';

const BASE_URL = '/calendar';

export const calendarService = {
  // Listar eventos con paginación y filtros
  async getCalendarEvents(
    page: number = 1,
    size: number = 10,
    filters?: CalendarEventFilter
  ): Promise<PaginatedResponse<CalendarEvent>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(filters && Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
      ))
    });

    const response = await api.get(`${BASE_URL}/?${params}`);
    return response.data;
  },

  // Obtener evento específico
  async getCalendarEvent(id: number): Promise<CalendarEvent> {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Crear nuevo evento
  async createCalendarEvent(data: CalendarEventCreate): Promise<CalendarEvent> {
    const response = await api.post(BASE_URL, data);
    return response.data;
  },

  // Actualizar evento
  async updateCalendarEvent(id: number, data: CalendarEventUpdate): Promise<CalendarEvent> {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // Eliminar evento (soft delete)
  async deleteCalendarEvent(id: number): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },

  // Subir archivo XLSX
  async uploadCalendarFile(file: File): Promise<CalendarUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`${BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Obtener estadísticas
  async getCalendarStats(): Promise<CalendarStatsResponse> {
    const response = await api.get(`${BASE_URL}/stats`);
    return response.data;
  },

  // Activar/desactivar evento
  async toggleCalendarEventStatus(id: number, isActive: boolean): Promise<CalendarEvent> {
    return this.updateCalendarEvent(id, { is_active: isActive });
  }
}; 