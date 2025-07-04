import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a Project Manager</h1>
      <p className="mb-6">Gestión moderna de proyectos y equipos.</p>
      <a href="/(auth)/login" className="btn btn-primary">Iniciar sesión</a>
    </section>
  );
}
