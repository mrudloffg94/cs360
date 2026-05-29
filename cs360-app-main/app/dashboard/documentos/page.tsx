'use client'

import { useApp } from '@/lib/context'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Car,
  Download,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

const statusColors = {
  Vigente: 'bg-green-500/10 text-green-400 border-green-500/20',
  'Por vencer': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Vencido: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const statusIcons = {
  Vigente: CheckCircle,
  'Por vencer': Clock,
  Vencido: AlertTriangle,
}

export default function DocumentosPage() {
  const { documents, vehicles } = useApp()

  const getVehicle = (vehicleId: string) => vehicles.find(v => v.id === vehicleId)

  // Group by status
  const documentsByStatus = {
    Vencido: documents.filter(d => d.status === 'Vencido'),
    'Por vencer': documents.filter(d => d.status === 'Por vencer'),
    Vigente: documents.filter(d => d.status === 'Vigente'),
  }

  // Group by vehicle
  const documentsByVehicle = vehicles.map(vehicle => ({
    vehicle,
    documents: documents.filter(d => d.vehicleId === vehicle.id),
  }))

  const alertCount = documentsByStatus.Vencido.length + documentsByStatus['Por vencer'].length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Documentos</h1>
          <p className="text-muted-foreground">Gestión de documentación vehicular</p>
        </div>
        {alertCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-amber-400">
              {alertCount} documento(s) requieren atención
            </span>
          </div>
        )}
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['Vigente', 'Por vencer', 'Vencido'] as const).map((status) => {
          const Icon = statusIcons[status]
          const count = documentsByStatus[status].length
          return (
            <Card key={status} className={cn(
              'border-border/50',
              status === 'Vencido' && count > 0 && 'border-red-500/20 bg-red-500/5',
              status === 'Por vencer' && count > 0 && 'border-amber-500/20 bg-amber-500/5',
              status === 'Vigente' && 'bg-card/50'
            )}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      'h-5 w-5',
                      status === 'Vigente' && 'text-green-400',
                      status === 'Por vencer' && 'text-amber-400',
                      status === 'Vencido' && 'text-red-400'
                    )} />
                    <div>
                      <p className="font-medium text-foreground">{status}</p>
                      <p className="text-sm text-muted-foreground">
                        {count} documento(s)
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn(statusColors[status], 'text-lg px-3 py-1')}>
                    {count}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Documents View */}
      <Tabs defaultValue="status" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="status" className="data-[state=active]:bg-card">
            Por estado
          </TabsTrigger>
          <TabsTrigger value="vehicle" className="data-[state=active]:bg-card">
            Por vehículo
          </TabsTrigger>
        </TabsList>

        {/* By Status */}
        <TabsContent value="status" className="space-y-6">
          {/* Show alerts first */}
          {(documentsByStatus.Vencido.length > 0 || documentsByStatus['Por vencer'].length > 0) && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Requieren atención
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...documentsByStatus.Vencido, ...documentsByStatus['Por vencer']].map((doc) => {
                  const vehicle = getVehicle(doc.vehicleId)
                  const StatusIcon = statusIcons[doc.status]
                  return (
                    <Card key={doc.id} className={cn(
                      'border-border/50',
                      doc.status === 'Vencido' && 'border-red-500/20 bg-red-500/5',
                      doc.status === 'Por vencer' && 'border-amber-500/20 bg-amber-500/5'
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <StatusIcon className={cn(
                              'h-5 w-5 mt-0.5',
                              doc.status === 'Vencido' ? 'text-red-400' : 'text-amber-400'
                            )} />
                            <div>
                              <p className="font-medium text-foreground">{doc.type}</p>
                              {vehicle && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Car className="h-3 w-3" />
                                  {vehicle.brand} {vehicle.model} - {vehicle.plate}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className={cn(statusColors[doc.status])}>
                            {doc.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Vence: {new Date(doc.expirationDate).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                          Gestionar renovación
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Vigentes */}
          {documentsByStatus.Vigente.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Documentos vigentes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {documentsByStatus.Vigente.map((doc) => {
                  const vehicle = getVehicle(doc.vehicleId)
                  return (
                    <Card key={doc.id} className="border-border/50 bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">{doc.type}</p>
                              {vehicle && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Car className="h-3 w-3" />
                                  {vehicle.brand} {vehicle.model}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className={cn(statusColors[doc.status])}>
                            {doc.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Vence: {new Date(doc.expirationDate).toLocaleDateString('es-CL')}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1 border-border/50">
                            <Download className="h-3 w-3 mr-1" />
                            Descargar
                          </Button>
                          <Button size="sm" variant="ghost" className="text-muted-foreground">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </TabsContent>

        {/* By Vehicle */}
        <TabsContent value="vehicle" className="space-y-6">
          {documentsByVehicle.map(({ vehicle, documents: vehicleDocs }) => (
            <div key={vehicle.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <Car className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {vehicle.brand} {vehicle.model}
                  </h2>
                  <p className="text-sm text-muted-foreground">{vehicle.plate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pl-[52px]">
                {vehicleDocs.map((doc) => {
                  const StatusIcon = statusIcons[doc.status]
                  return (
                    <Card key={doc.id} className={cn(
                      'border-border/50',
                      doc.status === 'Vencido' && 'border-red-500/20 bg-red-500/5',
                      doc.status === 'Por vencer' && 'border-amber-500/20 bg-amber-500/5',
                      doc.status === 'Vigente' && 'bg-card/50'
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <StatusIcon className={cn(
                            'h-4 w-4 mt-0.5',
                            doc.status === 'Vigente' && 'text-green-400',
                            doc.status === 'Por vencer' && 'text-amber-400',
                            doc.status === 'Vencido' && 'text-red-400'
                          )} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc.type}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(doc.expirationDate).toLocaleDateString('es-CL')}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn(statusColors[doc.status], 'text-xs')}>
                          {doc.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
