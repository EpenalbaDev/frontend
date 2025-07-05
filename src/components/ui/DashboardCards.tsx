import { Card } from "@/components/ui/card";
import { LucideTimer, LucideFolder, LucideListChecks } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

export function DashboardCards() {
  const { metrics, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Card className="flex flex-col items-center p-6">
        <LucideTimer className="w-8 h-8 mb-2" />
        <div className="text-lg font-bold">{metrics?.today_hours ?? "--"}</div>
        <div className="text-xs text-muted-foreground">Horas trabajadas hoy</div>
      </Card>
      <Card className="flex flex-col items-center p-6">
        <LucideFolder className="w-8 h-8 mb-2" />
        <div className="text-lg font-bold">{metrics?.active_projects ?? "--"}</div>
        <div className="text-xs text-muted-foreground">Proyectos activos</div>
      </Card>
      <Card className="flex flex-col items-center p-6">
        <LucideListChecks className="w-8 h-8 mb-2" />
        <div className="text-lg font-bold">{metrics?.active_timers ?? "--"}</div>
        <div className="text-xs text-muted-foreground">Tareas pendientes</div>
      </Card>
    </>
  );
} 