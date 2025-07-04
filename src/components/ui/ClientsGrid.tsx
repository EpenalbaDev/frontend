import { useState } from 'react';
import { useClients } from '@/hooks/useClients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Building2, 
  Grid3X3, 
  List,
  Plus 
} from 'lucide-react';
import { ClientCard } from './ClientCard';
import { ClientResponse } from '@/types';

interface ClientsGridProps {
  onAddClient?: () => void;
  onEditClient?: (client: ClientResponse) => void;
  onViewClient?: (client: ClientResponse) => void;
}

export function ClientsGrid({ 
  onAddClient, 
  onEditClient, 
  onViewClient 
}: ClientsGridProps) {
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // More items for grid view
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { clients, pagination, isLoading, isError, mutate } = useClients({
    pagination: { page, limit },
    filters: searchTerm ? { search: searchTerm } : {}
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando clientes...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">No se pudieron cargar los clientes</p>
          <Button onClick={() => mutate()} className="mt-2">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Clientes ({pagination?.total_items || 0})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          {onAddClient && (
            <Button onClick={onAddClient}>
              <Plus className="h-4 w-4 mr-1" />
              Nuevo Cliente
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {clients.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm ? 'No se encontraron clientes' : 'No hay clientes registrados'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'Intenta con otros términos de búsqueda' 
                : 'Comienza agregando tu primer cliente'
              }
            </p>
            {onAddClient && !searchTerm && (
              <Button onClick={onAddClient}>
                <Plus className="h-4 w-4 mr-1" />
                Agregar Cliente
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {clients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    onEdit={onEditClient}
                    onView={onViewClient}
                  />
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {clients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    onEdit={onEditClient}
                    onView={onViewClient}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.total_items > limit && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, pagination.total_items)} de {pagination.total_items} clientes
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm px-3 py-1 bg-muted rounded">
                    Página {page} de {Math.ceil(pagination.total_items / limit)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= Math.ceil(pagination.total_items / limit)}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
} 