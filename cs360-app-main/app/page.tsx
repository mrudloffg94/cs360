'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    // Obtener usuario actual
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Si no hay sesión
    if (!user) {
      router.push('/')
      return
    }

    // Buscar perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Si NO es admin
    if (profile?.role !== 'admin') {
      router.push('/dashboard')
      return
    }

    // Acceso permitido
    setLoading(false)
  }

  // Pantalla carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Verificando acceso...
      </div>
    )
  }

  // PANEL ADMIN
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Panel Admin
            </h1>

            <p className="text-zinc-400 mt-2">
              Gestión interna CS360.vip
            </p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
            className="px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Clientes
            </h2>

            <p className="text-zinc-400 text-sm">
              Gestión de clientes CS360
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Concierge
            </h2>

            <p className="text-zinc-400 text-sm">
              Servicios y coordinación
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Vehículos
            </h2>

            <p className="text-zinc-400 text-sm">
              Administración automotriz
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}