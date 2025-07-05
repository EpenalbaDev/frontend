"use client";

import { useCalendarStats } from "@/hooks/useCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, TrendingUp } from "lucide-react";

export function CalendarStats() {
  const { data: stats, isLoading, error } = useCalendarStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardTitle>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-red-600">Error al cargar las estadísticas</p>
        </CardContent>
      </Card>
    );
  }

  const formatDuration = (hours?: number) => {
    if (!hours) return "0h";
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    return `${hours.toFixed(1)}h`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total de Eventos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total de Eventos
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {stats?.total_events || 0}
          </div>
          <p className="text-xs text-gray-500">
            Eventos únicos: {stats?.unique_events || 0}
          </p>
        </CardContent>
      </Card>

      {/* Duración Total */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Duración Total
          </CardTitle>
          <Clock className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {formatDuration(stats?.total_duration_hours)}
          </div>
          <p className="text-xs text-gray-500">
            Promedio: {formatDuration(stats?.avg_duration_hours)}
          </p>
        </CardContent>
      </Card>

      {/* Evento Más Antiguo */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Evento Más Antiguo
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {formatDate(stats?.earliest_event)}
          </div>
          <p className="text-xs text-gray-500">
            Más reciente: {formatDate(stats?.latest_event)}
          </p>
        </CardContent>
      </Card>

      {/* Estado General */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Estado General
          </CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {stats?.total_events ? "Activo" : "Vacío"}
          </div>
          <p className="text-xs text-gray-500">
            {stats?.total_events ? `${stats.total_events} eventos registrados` : "Sin eventos"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 