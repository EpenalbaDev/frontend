import { LoginForm } from "@/components/forms/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Shield, Users, Clock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-gray-600">
              Inicia sesión en tu cuenta para continuar
            </p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <LoginForm />
            </CardContent>
          </Card>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-8">
            Gestiona tu negocio de manera eficiente
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Gestión de Clientes</h3>
                <p className="text-blue-100">
                  Organiza y mantén un seguimiento completo de todos tus clientes en un solo lugar.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Control de Tiempo</h3>
                <p className="text-blue-100">
                  Registra y analiza el tiempo dedicado a cada proyecto y tarea.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-blue-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Seguridad Garantizada</h3>
                <p className="text-blue-100">
                  Tus datos están protegidos con las mejores prácticas de seguridad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 