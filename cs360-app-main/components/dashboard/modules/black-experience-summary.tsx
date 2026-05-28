'use client'

import { useApp } from '@/lib/context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Car, 
  FileText, 
  Wrench, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export function BlackExperienceSummary() {
  const { vehicles, documents, maintenances, requests, user } = useApp()

  // Calculate stats
  const activeVehicles = vehicles.filter(v => v.status === 'Activo').length
  const documentAlerts = documents.filter(d => d.status !== 'Vigente').length
  const pendingMaintenances = maintenances.filter(m => m.status !== 'Completado').length
  const activeRequests = requests.filter(r => r.status !== 'Completado').length

  const allGood = documentAlerts === 0 && pendingMaintenances === 0

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">Resumen Ejecutivo</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu ecosistema automotriz está siendo gestionado de forma proactiva
              </p>
            </div>
            {allGood ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-green-400">Todo en orden</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-amber-400">{documentAlerts + pendingMaintenances} acciones sugeridas</span>
              </div>
            )}
          </div>

          {/* Minimal Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Car className="h-4 w-4" />
                <span className="text-xs">Vehículos</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{activeVehicles}</p>
              <p className="text-xs text-muted-foreground">activos</p>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <FileText className="h-4 w-4" />
                <span className="text-xs">Documentos</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">
                {documentAlerts === 0 ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  documentAlerts
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {documentAlerts === 0 ? 'vigentes' : 'requieren atención'}
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Wrench className="h-4 w-4" />
                <span className="text-xs">Mantenciones</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{pendingMaintenances}</p>
              <p className="text-xs text-muted-foreground">programadas</p>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs">Solicitudes</span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{activeRequests}</p>
              <p className="text-xs text-muted-foreground">en gestión</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Actions (only show if there are alerts) */}
      {!allGood && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Acciones sugeridas por tu concierge</h3>
            <div className="space-y-3">
              {documentAlerts > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-foreground">
                      {documentAlerts} documento(s) requieren renovación
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80" asChild>
                    <Link href="/dashboard/documentos">
                      Ver detalles
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
              {pendingMaintenances > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-foreground">
                      {pendingMaintenances} mantención(es) próxima(s)
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                    Autorizar gestión
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Concierge Quick Access */}
      <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-transparent backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tu ejecutivo asignado</p>
              <p className="text-lg font-semibold text-foreground">{user?.concierge}</p>
              <p className="text-xs text-accent mt-1">Canal prioritario Black activo</p>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90" asChild>
              <Link href="/dashboard/concierge">
                Contactar
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
