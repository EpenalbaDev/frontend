export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="mb-4">Página no encontrada</p>
      <a href="/" className="btn btn-primary">Volver al inicio</a>
    </div>
  );
} 