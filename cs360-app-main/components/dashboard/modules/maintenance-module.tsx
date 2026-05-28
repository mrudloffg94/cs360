'use client'

import Link from 'next/link'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wrench, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusColors = {
  Completado: 'bg-green-500/10 text-green-400 border-green-500/20',
  Programado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export function MaintenanceModule() {
  const { maintenances, vehicles } = useApp()

  const getVehicle = (vehicleId: string) => vehicles.find(v => v.id === vehicleId)

  const upcomingMaintenances = maintenances
    .filter(m => m.status !== 'Completado')
    .slice(0, 3)

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Wrench className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Mantenciones</CardTitle>
            <p className="text-sm text-muted-foreground">Próximas y programadas</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          Ver todas
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingMaintenances.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay mantenciones pendientes</p>
          </div>
        ) : (
          upcomingMaintenances.map((maintenance) => {
            const vehicle = getVehicle(maintenance.vehicleId)
            return (
              <div
                key={maintenance.id}
                className="p-4 rounded-lg bg-secondary/30 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{maintenance.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Vehículo'}
                    </p>
                  </div>
                  <Badge variant="outline" className={cn(statusColors[maintenance.status])}>
                    {maintenance.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(maintenance.date).toLocaleDateString('es-CL', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                  {maintenance.cost && (
                    <span>
                      ${maintenance.cost.toLocaleString('es-CL')}
                    </span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
