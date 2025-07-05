import { LoginForm } from "@/components/forms/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Shield, Users, Clock, Sparkles, Zap, Star } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Fondo animado global */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f2ede2] via-[#f2ede2]/95 to-[#f2ede2]/90">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23232323' fill-opacity='0.02'%3E%3Cpath d='M30 0L45 15L30 30L15 15zM0 30L15 15L30 30L15 45zM30 30L45 15L60 30L45 45z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md relative">
          {/* Contenedor del formulario con efectos */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7a69e2]/20 to-[#7a69e2]/10 rounded-3xl blur-xl transform scale-105 animate-pulse"></div>
            
          
            
            {/* Card del formulario */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden transform transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:300ms]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7a69e2]/5 to-transparent"></div>
              <CardContent className="p-8 relative z-10">
                <LoginForm />
              </CardContent>
            </Card>
            
            {/* Footer */}
            <div className="text-center mt-8 transform transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_forwards] [animation-delay:600ms]">
              <p className="text-sm text-[#232323]/60">
                ¿No tienes una cuenta?{" "}
                <a href="/register" className="text-[#7a69e2] hover:text-[#7a69e2]/80 font-semibold transition-all duration-300 hover:underline relative group">
                  Regístrate aquí
                  <span className="absolute inset-0 bg-[#7a69e2]/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#232323] via-[#232323]/95 to-[#232323]/90 items-center justify-center p-12 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#7a69e2]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#7a69e2]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2000ms'}}></div>
          
          {/* Líneas decorativas */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7a69e2]/40 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7a69e2]/40 to-transparent animate-pulse" style={{animationDelay: '1000ms'}}></div>
          
          {/* Partículas flotantes */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-[#7a69e2] rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-[#7a69e2]/60 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{animationDelay: '1000ms'}}></div>
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-[#7a69e2]/40 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{animationDelay: '2000ms'}}></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-[#7a69e2] rounded-full animate-[float_8s_ease-in-out_infinite]" style={{animationDelay: '3000ms'}}></div>
        </div>

        <div className="max-w-lg text-[#f2ede2] relative z-10">
          <div className="transform transition-all duration-1000 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#f2ede2] to-[#7a69e2] bg-clip-text text-transparent">
              Gestiona tu negocio
            </h2>
            <h3 className="text-2xl font-semibold mb-12 text-[#7a69e2]">
              de manera eficiente
            </h3>
          </div>
          
          <div className="space-y-8">
            {/* Feature 1 - Gestión de Clientes */}
            <div className="flex items-start space-x-6 group transform transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_forwards] hover:translate-x-2" style={{animationDelay: '300ms'}}>
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#7a69e2]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/80 p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Users className="h-6 w-6 text-[#f2ede2] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold mb-3 text-[#f2ede2] group-hover:text-[#7a69e2] transition-colors duration-300">
                  Gestión de Clientes
                </h4>
                <p className="text-[#f2ede2]/80 leading-relaxed">
                  Organiza y mantén un seguimiento completo de todos tus clientes en un solo lugar con herramientas avanzadas.
                </p>
              </div>
            </div>
            
            {/* Feature 2 - Control de Tiempo */}
            <div className="flex items-start space-x-6 group transform transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_forwards] hover:translate-x-2" style={{animationDelay: '500ms'}}>
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#7a69e2]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/80 p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Clock className="h-6 w-6 text-[#f2ede2] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold mb-3 text-[#f2ede2] group-hover:text-[#7a69e2] transition-colors duration-300">
                  Control de Tiempo
                </h4>
                <p className="text-[#f2ede2]/80 leading-relaxed">
                  Registra y analiza el tiempo dedicado a cada proyecto y tarea con precisión milimétrica.
                </p>
              </div>
            </div>
            
            {/* Feature 3 - Seguridad Garantizada */}
            <div className="flex items-start space-x-6 group transform transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_forwards] hover:translate-x-2" style={{animationDelay: '700ms'}}>
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#7a69e2]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/80 p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-6 w-6 text-[#f2ede2] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold mb-3 text-[#f2ede2] group-hover:text-[#7a69e2] transition-colors duration-300">
                  Seguridad Garantizada
                </h4>
                <p className="text-[#f2ede2]/80 leading-relaxed">
                  Tus datos están protegidos con las mejores prácticas de seguridad y encriptación avanzada.
                </p>
              </div>
            </div>

            {/* Feature 4 - Rendimiento Optimizado */}
            <div className="flex items-start space-x-6 group transform transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_forwards] hover:translate-x-2" style={{animationDelay: '900ms'}}>
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#7a69e2]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/80 p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Zap className="h-6 w-6 text-[#f2ede2] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold mb-3 text-[#f2ede2] group-hover:text-[#7a69e2] transition-colors duration-300">
                  Rendimiento Optimizado
                </h4>
                <p className="text-[#f2ede2]/80 leading-relaxed">
                  Experimenta velocidad y eficiencia sin precedentes en cada acción que realices.
                </p>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-16 grid grid-cols-3 gap-6 transform transition-all duration-1000 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{animationDelay: '1100ms'}}>
            <div className="text-center group">
              <div className="text-3xl font-bold text-[#7a69e2] mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-sm text-[#f2ede2]/70">Tiempo activo</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-[#7a69e2] mb-2 group-hover:scale-110 transition-transform duration-300">
                10k+
              </div>
              <div className="text-sm text-[#f2ede2]/70">Usuarios activos</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-[#7a69e2] mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-sm text-[#f2ede2]/70">Soporte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}