"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Square, Clock, User, FolderOpen, CheckSquare } from "lucide-react";
import { TimeEntryResponse } from "@/types";
import { startTimer, stopTimer } from "@/lib/api/timeEntries";
import { useActiveTimer } from "@/hooks/useTimeEntries";

interface TimerProps {
  onTimerStart?: (timer: TimeEntryResponse) => void;
  onTimerStop?: (timer: TimeEntryResponse) => void;
}

export function Timer({ onTimerStart, onTimerStop }: TimerProps) {
  const { activeTimer, isLoading, mutate } = useActiveTimer();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  // Update elapsed time every second when timer is active
  useEffect(() => {
    if (!activeTimer) {
      setElapsedSeconds(0);
      return;
    }

    const startTime = new Date(`2000-01-01T${activeTimer.start_time}`);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    setElapsedSeconds(Math.max(0, elapsed));

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = async () => {
    setIsStarting(true);
    try {
      // For now, we'll use a default project and task
      // In a real app, you'd have a modal to select project/task
      const timerData = {
        project_id: 1, // This should come from a selection
        task_id: 1,    // This should come from a selection
        description: "Trabajo en progreso",
        start_time: new Date().toTimeString().slice(0, 5)
      };
      
      const newTimer = await startTimer(timerData);
      await mutate();
      onTimerStart?.(newTimer);
    } catch (error) {
      console.error("Error starting timer:", error);
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopTimer = async () => {
    if (!activeTimer) return;
    
    setIsStopping(true);
    try {
      const stopData = {
        end_time: new Date().toTimeString().slice(0, 5),
        description: activeTimer.description
      };
      
      const stoppedTimer = await stopTimer(stopData);
      await mutate();
      onTimerStop?.(stoppedTimer);
    } catch (error) {
      console.error("Error stopping timer:", error);
    } finally {
      setIsStopping(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeTimer ? (
          <div className="space-y-4">
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-blue-600">
                {formatTime(elapsedSeconds)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Tiempo transcurrido
              </div>
            </div>

            {/* Timer Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FolderOpen className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Proyecto:</span>
                <span>{activeTimer.project_name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckSquare className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Tarea:</span>
                <span>{activeTimer.task_name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Usuario:</span>
                <span>{activeTimer.user_name || "N/A"}</span>
              </div>
            </div>

            {/* Description */}
            {activeTimer.description && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                {activeTimer.description}
              </div>
            )}

            {/* Stop Button */}
            <Button
              onClick={handleStopTimer}
              disabled={isStopping}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Square className="h-4 w-4 mr-2" />
              {isStopping ? "Deteniendo..." : "Detener Timer"}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl font-mono font-bold text-gray-300">
              00:00:00
            </div>
            <div className="text-sm text-gray-500">
              No hay timer activo
            </div>
            <Button
              onClick={handleStartTimer}
              disabled={isStarting}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              {isStarting ? "Iniciando..." : "Iniciar Timer"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 