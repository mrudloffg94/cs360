'use client'

import { use } from 'react'
import Link from 'next/link'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Car, 
  ArrowLeft, 
  FileText, 
  Wrench, 
  Calendar,
  Gauge,
  Palette,
  Hash,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

const statusColors = {
  Activo: 'bg-green-500/10 text-green-400 border-green-500/20',
  Mantención: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Pendiente: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const maintenanceStatusColors = {
  Completado: 'bg-green-500/10 text-green-400 border-green-500/20',
  Programado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const docStatusColors = {
  Vigente: 'bg-green-500/10 text-green-400 border-green-500/20',
  'Por vencer': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Vencido: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { vehicles, maintenances, documents } = useApp()

  const vehicle = vehicles.find(v => v.id === id)
  
  if (!vehicle) {
    notFound()
  }

  const vehicleMaintenances = maintenances.filter(m => m.vehicleId === id)
  const vehicleDocuments = documents.filter(d => d.vehicleId === id)
  
  // Calculate total costs
  const totalCosts = vehicleMaintenances
    .filter(m => m.status === 'Completado')
    .reduce((acc, m) => acc + (m.cost || 0), 0)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/vehiculos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Volver a vehículos</span>
      </Link>

      {/* Vehicle Header */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Vehicle Image */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:w-80 shrink-0">
          <CardContent className="p-6">
            <div className="w-full aspect-[4/3] rounded-lg bg-secondary/50 flex items-center justify-center">
              <Car className="h-20 w-20 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Info */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm flex-1">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  {vehicle.brand} {vehicle.model}
                </h1>
                <p className="text-muted-foreground">{vehicle.year}</p>
              </div>
              <Badge variant="outline" className={cn(statusColors[vehicle.status], 'text-sm')}>
                {vehicle.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span className="text-xs">Patente</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{vehicle.plate}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Gauge className="h-4 w-4" />
                  <span className="text-xs">Kilometraje</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {vehicle.mileage?.toLocaleString('es-CL')} km
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Palette className="h-4 w-4" />
                  <span className="text-xs">Color</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{vehicle.color}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Costos acumulados</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  ${totalCosts.toLocaleString('es-CL')}
                </p>
              </div>
            </div>

            {/* Next Service Alert */}
            {vehicle.nextService && (
              <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Próxima mantención</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(vehicle.nextService).toLocaleDateString('es-CL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                    Agendar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="maintenance" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-card">
            <Wrench className="h-4 w-4 mr-2" />
            Mantenciones
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-card">
            <FileText className="h-4 w-4 mr-2" />
            Documentos
          </TabsTrigger>
        </TabsList>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Historial de Mantenciones</h2>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4 mr-2" />
              Solicitar mantención
            </Button>
          </div>

          {vehicleMaintenances.length === 0 ? (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-12 text-center">
                <Wrench className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No hay mantenciones registradas</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {vehicleMaintenances.map((maintenance) => (
                <Card key={maintenance.id} className="border-border/50 bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-foreground">{maintenance.type}</p>
                          <Badge variant="outline" className={cn(maintenanceStatusColors[maintenance.status])}>
                            {maintenance.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(maintenance.date).toLocaleDateString('es-CL')}
                          </span>
                          {maintenance.provider && (
                            <span>{maintenance.provider}</span>
                          )}
                        </div>
                      </div>
                      {maintenance.cost && (
                        <p className="text-lg font-semibold text-foreground">
                          ${maintenance.cost.toLocaleString('es-CL')}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Documentos del Vehículo</h2>
            <Button size="sm" variant="outline" className="border-border/50">
              <Plus className="h-4 w-4 mr-2" />
              Subir documento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicleDocuments.map((doc) => (
              <Card key={doc.id} className={cn(
                'border-border/50',
                doc.status === 'Vencido' && 'border-red-500/20 bg-red-500/5',
                doc.status === 'Por vencer' && 'border-amber-500/20 bg-amber-500/5',
                doc.status === 'Vigente' && 'bg-card/50'
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {doc.status === 'Vigente' ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className={cn(
                          'h-5 w-5',
                          doc.status === 'Vencido' ? 'text-red-400' : 'text-amber-400'
                        )} />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{doc.type}</p>
                        <p className="text-xs text-muted-foreground">
                          Vence: {new Date(doc.expirationDate).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(docStatusColors[doc.status])}>
                      {doc.status}
                    </Badge>
                  </div>
                  {doc.status !== 'Vigente' && (
                    <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                      Gestionar renovación
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
