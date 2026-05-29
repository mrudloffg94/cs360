'use client'

import Link from 'next/link'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Car, ChevronRight, Plus, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusColors = {
  Activo: 'bg-green-500/10 text-green-400 border-green-500/20',
  Mantención: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Pendiente: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function VehiculosPage() {
  const { vehicles } = useApp()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Mis Vehículos</h1>
          <p className="text-muted-foreground">Gestiona tu flota de vehículos</p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-2 h-4 w-4" />
          Agregar vehículo
        </Button>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Link key={vehicle.id} href={`/dashboard/vehiculos/${vehicle.id}`}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all group cursor-pointer h-full">
              <CardContent className="p-6">
                {/* Vehicle Image Placeholder */}
                <div className="w-full h-40 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 group-hover:bg-secondary/70 transition-colors">
                  <Car className="h-16 w-16 text-muted-foreground/50" />
                </div>

                {/* Vehicle Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">{vehicle.year}</p>
                    </div>
                    <Badge variant="outline" className={cn(statusColors[vehicle.status])}>
                      {vehicle.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">Patente</p>
                      <p className="text-sm font-medium text-foreground">{vehicle.plate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kilometraje</p>
                      <p className="text-sm font-medium text-foreground">
                        {vehicle.mileage?.toLocaleString('es-CL')} km
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-muted-foreground">
                      {vehicle.color}
                    </p>
                    <span className="text-xs text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver detalle
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
