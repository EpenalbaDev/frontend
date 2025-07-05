export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f2ede2] via-[#f2ede2]/90 to-[#f2ede2]/80 relative overflow-hidden">
      {/* Fondo animado con formas geométricas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculos animados */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#7a69e2]/20 to-[#7a69e2]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#7a69e2]/20 to-[#7a69e2]/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#7a69e2]/10 to-transparent rounded-full blur-3xl animate-spin-slow"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#7a69e2] rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-[#7a69e2]/60 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-[#7a69e2] rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-[#7a69e2]/80 rounded-full animate-float animation-delay-3000"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-[#7a69e2] rounded-full animate-float animation-delay-4000"></div>
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7a69e2]/20 to-transparent animate-pulse"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7a69e2]/20 to-transparent animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Grid pattern sutil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #232323 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Contenido principal: NO centrar ni limitar ancho */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}