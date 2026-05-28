'use client'

import Link from 'next/link'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Car, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusColors = {
  Activo: 'bg-green-500/10 text-green-400 border-green-500/20',
  Mantención: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Pendiente: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export function VehiclesModule() {
  const { vehicles } = useApp()

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Car className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Mis Vehículos</CardTitle>
            <p className="text-sm text-muted-foreground">{vehicles.length} vehículos registrados</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
          <Link href="/dashboard/vehiculos">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {vehicles.slice(0, 3).map((vehicle) => (
          <Link
            key={vehicle.id}
            href={`/dashboard/vehiculos/${vehicle.id}`}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Car className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {vehicle.brand} {vehicle.model}
                </p>
                <p className="text-sm text-muted-foreground">
                  {vehicle.year} · {vehicle.plate}
                </p>
              </div>
            </div>
            <Badge variant="outline" className={cn(statusColors[vehicle.status])}>
              {vehicle.status}
            </Badge>
          </Link>
        ))}
        
        <Button variant="outline" className="w-full mt-2 border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border">
          <Plus className="mr-2 h-4 w-4" />
          Agregar vehículo
        </Button>
      </CardContent>
    </Card>
  )
}
