"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TimeTracker() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      const id = setInterval(() => setSeconds((s) => s + 1), 1000);
      setIntervalId(id);
    }
  };
  const stop = () => {
    setRunning(false);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };
  const reset = () => {
    setSeconds(0);
    setRunning(false);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };
  const format = (s: number) => `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m ${s % 60}s`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-mono">{format(seconds)}</div>
      <div className="flex gap-2">
        <Button onClick={start} disabled={running}>Iniciar</Button>
        <Button onClick={stop} disabled={!running}>Pausar</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      {/* Aquí puedes agregar un formulario para registrar tiempo manual */}
    </div>
  );
} 