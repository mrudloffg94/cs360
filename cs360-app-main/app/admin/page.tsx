'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUserRole, isAdminRole } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      const { user, role } = await getCurrentUserRole()

      if (!user) {
        router.replace('/')
        return
      }

      if (!isAdminRole(role)) {
        router.replace('/dashboard')
        return
      }

      setLoading(false)
    }

    checkAccess()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Verificando acceso...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Panel Admin</h1>
            <p className="mt-2 text-zinc-400">Gestion interna CS360.vip</p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.replace('/')
            }}
            className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
          >
            Cerrar sesion
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">Clientes</h2>
            <p className="text-sm text-zinc-400">Gestion de clientes CS360</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">Concierge</h2>
            <p className="text-sm text-zinc-400">Servicios y coordinacion</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-2 text-lg font-semibold">Vehiculos</h2>
            <p className="text-sm text-zinc-400">Administracion automotriz</p>
          </div>
        </div>
      </div>
    </div>
  )
}
