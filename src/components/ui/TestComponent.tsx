import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

export function TestComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Componente de Prueba</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Este es un componente de prueba para verificar que las importaciones funcionan.</p>
        <div className="flex gap-2">
          <Button>Botón Primario</Button>
          <Button variant="outline">Botón Outline</Button>
        </div>
        <div className="flex gap-2">
          <Badge>Badge Default</Badge>
          <Badge variant="secondary">Badge Secondary</Badge>
        </div>
      </CardContent>
    </Card>
  );
} 