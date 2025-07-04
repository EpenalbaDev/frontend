'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-2">¡Ha ocurrido un error!</h2>
      <p className="mb-4">{error.message}</p>
      <button className="btn btn-primary" onClick={() => reset()}>Reintentar</button>
    </div>
  );
} 