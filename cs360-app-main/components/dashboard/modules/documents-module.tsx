'use client'

import Link from 'next/link'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, ChevronRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
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

export function DocumentsModule() {
  const { documents, vehicles } = useApp()

  const getVehicle = (vehicleId: string) => vehicles.find(v => v.id === vehicleId)

  // Group documents by status
  const documentsByStatus = {
    Vencido: documents.filter(d => d.status === 'Vencido'),
    'Por vencer': documents.filter(d => d.status === 'Por vencer'),
    Vigente: documents.filter(d => d.status === 'Vigente'),
  }

  const alertCount = documentsByStatus.Vencido.length + documentsByStatus['Por vencer'].length

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center relative">
            <FileText className="h-5 w-5 text-amber-400" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Documentos</CardTitle>
            <p className="text-sm text-muted-foreground">Estado de documentación</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
          <Link href="/dashboard/documentos">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Show alerts first */}
        {[...documentsByStatus.Vencido, ...documentsByStatus['Por vencer']].slice(0, 3).map((doc) => {
          const vehicle = getVehicle(doc.vehicleId)
          const StatusIcon = statusIcons[doc.status]
          return (
            <div
              key={doc.id}
              className={cn(
                'p-4 rounded-lg space-y-2',
                doc.status === 'Vencido' ? 'bg-red-500/5 border border-red-500/10' : 'bg-secondary/30'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <StatusIcon className={cn(
                    'h-4 w-4 mt-0.5',
                    doc.status === 'Vencido' ? 'text-red-400' : 'text-amber-400'
                  )} />
                  <div>
                    <p className="font-medium text-foreground">{doc.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Vehículo'}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={cn(statusColors[doc.status])}>
                  {doc.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pl-7">
                Vence: {new Date(doc.expirationDate).toLocaleDateString('es-CL', { 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          )
        })}

        {alertCount === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400 opacity-50" />
            <p className="text-sm">Toda la documentación está vigente</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
