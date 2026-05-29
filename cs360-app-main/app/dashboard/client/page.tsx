'use client'

import RouteGuard from '@/components/RouteGuard'
import LogoutButton from '@/components/LogoutButton'

export default function ClientPage() {
  return (
    <RouteGuard allowedRoles={['client', 'cliente', 'customer', 'user']}>
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Panel Cliente CS360
        </h1>

        <p className="mt-2 text-gray-500">
          Gestión de servicios y seguimiento de vehículos
        </p>

        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </RouteGuard>
  )
}