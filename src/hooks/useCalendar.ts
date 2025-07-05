import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarService } from '@/lib/api/calendarService';
import { 
  CalendarEvent, 
  CalendarEventCreate, 
  CalendarEventUpdate, 
  CalendarEventFilter,
  CalendarStatsResponse 
} from '@/types';
import { toast } from 'sonner';

// Hook para obtener eventos de calendario
export const useCalendarEvents = (
  page: number = 1,
  size: number = 10,
  filters?: CalendarEventFilter
) => {
  return useQuery({
    queryKey: ['calendar-events', page, size, filters],
    queryFn: () => calendarService.getCalendarEvents(page, size, filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener un evento específico
export const useCalendarEvent = (id: number) => {
  return useQuery({
    queryKey: ['calendar-event', id],
    queryFn: () => calendarService.getCalendarEvent(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para obtener estadísticas
export const useCalendarStats = () => {
  return useQuery({
    queryKey: ['calendar-stats'],
    queryFn: () => calendarService.getCalendarStats(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para crear evento
export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CalendarEventCreate) => calendarService.createCalendarEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
      toast.success('Evento creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al crear el evento');
    },
  });
};

// Hook para actualizar evento
export const useUpdateCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CalendarEventUpdate }) =>
      calendarService.updateCalendarEvent(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-event', id] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
      toast.success('Evento actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al actualizar el evento');
    },
  });
};

// Hook para eliminar evento
export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => calendarService.deleteCalendarEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
      toast.success('Evento eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al eliminar el evento');
    },
  });
};

// Hook para subir archivo XLSX
export const useUploadCalendarFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => calendarService.uploadCalendarFile(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
      toast.success(`Archivo procesado: ${data.message}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al procesar el archivo');
    },
  });
};

// Hook para activar/desactivar evento
export const useToggleCalendarEventStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      calendarService.toggleCalendarEventStatus(id, isActive),
    onSuccess: (_, { id, isActive }) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-event', id] });
      queryClient.invalidateQueries({ queryKey: ['calendar-stats'] });
      toast.success(`Evento ${isActive ? 'activado' : 'desactivado'} exitosamente`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al cambiar el estado del evento');
    },
  });
}; 