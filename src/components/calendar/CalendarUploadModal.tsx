"use client";

import { useState, useCallback } from "react";
import { useUploadCalendarFile } from "@/hooks/useCalendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarUploadModal({ isOpen, onClose }: CalendarUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    total_records: number;
    inserted_records: number;
    duplicate_records: number;
    invalid_records: number;
    message: string;
  } | null>(null);

  const uploadMutation = useUploadCalendarFile();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
        selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
    } else {
      alert("Por favor selecciona un archivo XLSX válido");
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await uploadMutation.mutateAsync(file);
      setUploadProgress(result);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClose = () => {
    setFile(null);
    setUploadProgress(null);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Subir Archivo de Calendario</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Área de Drag & Drop */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400",
              file && "border-green-500 bg-green-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">
                    Arrastra y suelta tu archivo XLSX aquí, o
                  </p>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    haz clic para seleccionar
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Solo archivos XLSX, máximo 10MB
                </p>
                <Input
                  id="file-input"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <FileSpreadsheet className="mx-auto h-12 w-12 text-green-500" />
                <div>
                  <p className="font-medium text-green-700">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remover archivo
                </Button>
              </div>
            )}
          </div>

          {/* Resultado de la carga */}
          {uploadProgress && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h4 className="font-medium text-green-700">Archivo procesado exitosamente</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total de registros:</span>
                  <span className="font-medium">{uploadProgress.total_records}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Registros insertados:</span>
                  <span className="font-medium">{uploadProgress.inserted_records}</span>
                </div>
                <div className="flex justify-between text-yellow-600">
                  <span>Registros duplicados:</span>
                  <span className="font-medium">{uploadProgress.duplicate_records}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Registros inválidos:</span>
                  <span className="font-medium">{uploadProgress.invalid_records}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-600">{uploadProgress.message}</p>
            </div>
          )}

          {/* Instrucciones */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Formato esperado del archivo:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>Event Name:</strong> Nombre del evento (obligatorio)</p>
              <p>• <strong>Start Time:</strong> Fecha y hora de inicio (obligatorio)</p>
              <p>• <strong>End Time:</strong> Fecha y hora de fin</p>
              <p>• <strong>Location:</strong> Ubicación del evento</p>
              <p>• <strong>Organizer:</strong> Organizador del evento</p>
              <p>• <strong>Attendees:</strong> Lista de asistentes</p>
              <p>• <strong>Description:</strong> Descripción del evento</p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cerrar
            </Button>
            {file && !uploadProgress && (
              <Button
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
              >
                {uploadMutation.isPending ? (
                  "Procesando..."
                ) : (
                  "Subir y Procesar"
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 