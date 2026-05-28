'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Cliente
            </h1>

            <p className="text-zinc-400 mt-2">
              Bienvenido a CS360.vip
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-xl bg-white text-black font-medium"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Mi Vehículo
            </h2>

            <p className="text-zinc-400 text-sm">
              Estado y documentación
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Concierge
            </h2>

            <p className="text-zinc-400 text-sm">
              Solicita servicios premium
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Mantenciones
            </h2>

            <p className="text-zinc-400 text-sm">
              Próximos servicios y agenda
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}