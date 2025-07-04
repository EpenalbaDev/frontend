import { Card } from "@/components/ui/card";
import { LucideTimer, LucideFolder, LucideListChecks } from "lucide-react";

export function DashboardCards() {
  return (
    <>
      <Card className="flex flex-col items-center p-6">
        <LucideTimer className="w-8 h-8 mb-2" />
        <div className="text-lg font-bold">8h 30m</div>
        <div className="text-xs text-muted-foreground">Horas trabajadas hoy</div>
      </Card>
      <Card className="flex flex-col items-center p-6">
        <LucideFolder className="w-8 h-8 mb-2" />
        <div className="text-lg font-bold">5</div>
        <div className="text-xs text-muted-foreground">Proyectos activos</div>
      </Card>
      <Card className="flex flex-col items-center p-6">
        <LucideListChecks className="w-8 h-8 mb-2" />
        <div className="text-lg font-bold">12</div>
        <div className="text-xs text-muted-foreground">Tareas pendientes</div>
      </Card>
    </>
  );
} 