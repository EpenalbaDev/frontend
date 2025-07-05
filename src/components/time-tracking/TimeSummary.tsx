"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { useTimeSummary } from "@/hooks/useTimeEntries";

export function TimeSummary() {
  const { summary, isLoading, isError } = useTimeSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            Error al cargar el resumen
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatHours = (hours: number): string => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Hours */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Horas Hoy</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatHours(summary.total_hours_today)}</div>
          <p className="text-xs text-muted-foreground">
            {formatHours(summary.billable_hours_today)} facturables
          </p>
        </CardContent>
      </Card>

      {/* This Week's Hours */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Horas Esta Semana</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatHours(summary.total_hours_week)}</div>
          <p className="text-xs text-muted-foreground">
            {formatHours(summary.billable_hours_week)} facturables
          </p>
        </CardContent>
      </Card>

      {/* This Month's Hours */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Horas Este Mes</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatHours(summary.total_hours_month)}</div>
          <p className="text-xs text-muted-foreground">
            {formatHours(summary.billable_hours_month)} facturables
          </p>
        </CardContent>
      </Card>

      {/* Active Timer Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estado Timer</CardTitle>
          <div className={`h-4 w-4 rounded-full ${summary.active_timer ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summary.active_timer ? 'Activo' : 'Inactivo'}
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.active_timer ? 'Timer en ejecución' : 'No hay timer activo'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 