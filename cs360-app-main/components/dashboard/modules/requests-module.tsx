'use client'

import Link from 'next/link'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ClipboardList, ChevronRight, Plus, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusColors = {
  Pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'En proceso': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Completado: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const priorityColors = {
  Normal: 'text-muted-foreground',
  Alta: 'text-amber-400',
  Urgente: 'text-red-400',
}

export function RequestsModule() {
  const { requests } = useApp()

  const activeRequests = requests.filter(r => r.status !== 'Completado').slice(0, 3)

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Centro de Solicitudes</CardTitle>
            <p className="text-sm text-muted-foreground">{activeRequests.length} activas</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
          <Link href="/dashboard/solicitudes">
            Ver todas
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeRequests.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay solicitudes activas</p>
          </div>
        ) : (
          activeRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 rounded-lg bg-secondary/30 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Circle className={cn(
                    'h-2 w-2 mt-2 fill-current',
                    priorityColors[request.priority || 'Normal']
                  )} />
                  <div>
                    <p className="font-medium text-foreground">{request.title}</p>
                    <p className="text-sm text-muted-foreground">{request.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn(statusColors[request.status])}>
                  {request.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pl-4">
                Creada: {new Date(request.createdAt).toLocaleDateString('es-CL', { 
                  day: 'numeric', 
                  month: 'short' 
                })}
              </p>
            </div>
          ))
        )}
        
        <Button variant="outline" className="w-full mt-2 border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-border" asChild>
          <Link href="/dashboard/solicitudes?new=true">
            <Plus className="mr-2 h-4 w-4" />
            Nueva solicitud
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
