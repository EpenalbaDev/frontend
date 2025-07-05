"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api/auth";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, User } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, { message: "Usuario requerido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMsg("");
    try {
      await login({ username: data.username, password: data.password });
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.detail || "Credenciales incorrectas");
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#7a69e2] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7a69e2] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2000ms'}}></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7a69e2] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4000ms'}}></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-8">
        {/* Header con animación */}
        <div className="text-center transform transition-all duration-1000 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/60 rounded-full blur-lg opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/80 p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-[#f2ede2] animate-[spin_3s_linear_infinite]" />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#232323] to-[#7a69e2] bg-clip-text text-transparent mb-2">
            Bienvenido de vuelta
          </h2>
          <p className="text-[#232323]/70 text-lg">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Error message con animación */}
        {errorMsg && (
          <div className="transform transition-all duration-500 animate-[shake_0.5s_ease-in-out] bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Username field */}
          <div className="group transform transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{animationDelay: '200ms'}}>
            <label htmlFor="username" className="block text-sm font-semibold text-[#232323] mb-3 transition-colors duration-300 group-hover:text-[#7a69e2]">
              Nombre de usuario
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7a69e2]/20 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7a69e2] transition-all duration-300 group-hover:scale-110" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Tu usuario"
                  className="pl-12 pr-4 py-4 bg-[#f2ede2]/50 border-2 border-[#f2ede2] rounded-xl text-[#232323] placeholder-[#232323]/50 focus:border-[#7a69e2] focus:bg-[#f2ede2] transition-all duration-300 hover:border-[#7a69e2]/50 focus:ring-4 focus:ring-[#7a69e2]/20"
                  {...register("username")}
                />
              </div>
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-2 animate-[fadeIn_0.3s_ease-out_forwards] flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="group transform transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{animationDelay: '400ms'}}>
            <label htmlFor="password" className="block text-sm font-semibold text-[#232323] mb-3 transition-colors duration-300 group-hover:text-[#7a69e2]">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7a69e2]/20 to-transparent rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7a69e2] transition-all duration-300 group-hover:scale-110" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 py-4 bg-[#f2ede2]/50 border-2 border-[#f2ede2] rounded-xl text-[#232323] placeholder-[#232323]/50 focus:border-[#7a69e2] focus:bg-[#f2ede2] transition-all duration-300 hover:border-[#7a69e2]/50 focus:ring-4 focus:ring-[#7a69e2]/20"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7a69e2] hover:text-[#7a69e2]/80 transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 animate-[fadeIn_0.3s_ease-out_forwards] flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between transform transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{animationDelay: '600ms'}}>
          <label className="flex items-center group cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 text-[#7a69e2] focus:ring-[#7a69e2] border-[#232323]/30 rounded transition-all duration-300 hover:scale-110"
            />
            <span className="ml-3 text-sm text-[#232323]/70 group-hover:text-[#7a69e2] transition-colors duration-300">
              Recordarme
            </span>
          </label>
          <a 
            href="/forgot-password" 
            className="text-sm text-[#7a69e2] hover:text-[#7a69e2]/80 transition-all duration-300 hover:underline hover:scale-105"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Submit button */}
        <div className="transform transition-all duration-500 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{animationDelay: '800ms'}}>
          <Button 
            type="submit" 
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-[#7a69e2] to-[#7a69e2]/80 hover:from-[#7a69e2]/90 hover:to-[#7a69e2]/70 text-[#f2ede2] border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                <span>Iniciando sesión...</span>
                <div className="ml-3 flex space-x-1">
                  <div className="w-1 h-1 bg-[#f2ede2] rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-[#f2ede2] rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                  <div className="w-1 h-1 bg-[#f2ede2] rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
                </div>
              </div>
            ) : (
              <span className="flex items-center justify-center">
                Iniciar sesión
                <div className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </div>
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}