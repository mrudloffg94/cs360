'use client'

import RouteGuard from '@/components/RouteGuard'
import LogoutButton from '@/components/LogoutButton'

export default function AdminPage() {
  return (
    <RouteGuard allowedRoles={['admin']}>
      <div className="p-10">
        <h1 className="text-3xl font-bold">Panel Admin CS360</h1>

        <p className="mt-2 text-gray-500">
          Administración y gestión interna
        </p>

        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </RouteGuard>
  )
}