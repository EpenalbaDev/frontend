import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar,
  Edit,
  Eye
} from 'lucide-react';
import { ClientResponse } from '@/types';

interface ClientCardProps {
  client: ClientResponse;
  onEdit?: (client: ClientResponse) => void;
  onView?: (client: ClientResponse) => void;
}

export function ClientCard({ client, onEdit, onView }: ClientCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{client.name}</CardTitle>
              <p className="text-sm text-muted-foreground">ID: {client.id}</p>
            </div>
          </div>
          <Badge variant={client.is_active ? "default" : "secondary"}>
            {client.is_active ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          {client.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a 
                href={`mailto:${client.email}`}
                className="text-primary hover:underline"
              >
                {client.email}
              </a>
            </div>
          )}
          
          {client.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a 
                href={`tel:${client.phone}`}
                className="text-primary hover:underline"
              >
                {client.phone}
              </a>
            </div>
          )}
        </div>

        {/* Location */}
        {(client.address || client.country) && (
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              {client.address && <div>{client.address}</div>}
              {client.country && <div className="text-muted-foreground">{client.country}</div>}
            </div>
          </div>
        )}

        {/* Timezone */}
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span>Zona horaria: {client.timezone}</span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Creado: {new Date(client.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(client)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              Ver
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(client)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 