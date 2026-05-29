'use client'

import { useApp } from '@/lib/context'
import { VehiclesModule } from '@/components/dashboard/modules/vehicles-module'
import { MaintenanceModule } from '@/components/dashboard/modules/maintenance-module'
import { DocumentsModule } from '@/components/dashboard/modules/documents-module'
import { RequestsModule } from '@/components/dashboard/modules/requests-module'
import { ConciergeModule } from '@/components/dashboard/modules/concierge-module'
import { BlackExperienceSummary } from '@/components/dashboard/modules/black-experience-summary'

export default function DashboardPage() {
  const { user, isBlackExperience } = useApp()

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          {isBlackExperience ? 'Bienvenido' : `Hola, ${user.name.split(' ')[0]}`}
        </h1>
        <p className="text-muted-foreground">
          {isBlackExperience 
            ? 'Tu ecosistema automotriz está siendo gestionado de forma silenciosa.'
            : 'Aquí tienes un resumen de tu ecosistema automotriz.'}
        </p>
      </div>

      {/* Black Experience: Minimal Summary */}
      {isBlackExperience && <BlackExperienceSummary />}

      {/* Regular Dashboard Modules */}
      {!isBlackExperience && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Vehicles - Full width on mobile, 2 cols on large */}
          <div className="lg:col-span-2 xl:col-span-2">
            <VehiclesModule />
          </div>

          {/* Concierge */}
          <div className="xl:col-span-1">
            <ConciergeModule />
          </div>

          {/* Maintenance */}
          <div className="lg:col-span-1">
            <MaintenanceModule />
          </div>

          {/* Documents */}
          <div className="lg:col-span-1">
            <DocumentsModule />
          </div>

          {/* Requests */}
          <div className="lg:col-span-2 xl:col-span-1">
            <RequestsModule />
          </div>
        </div>
      )}

      {/* Platinum Experience: Visible Controls */}
      {!isBlackExperience && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Plan {user.plan} — Gestión manual habilitada
          </p>
        </div>
      )}
    </div>
  )
}
