'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUserRole } from '@/lib/auth'
import { AppProvider } from '@/lib/context'
import LogoutButton from '@/components/LogoutButton'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { user, role } = await getCurrentUserRole()

      // ❌ no logueado
      if (!user) {
        router.replace('/login')
        return
      }

      // ❌ sin rol
      if (!role) {
        router.replace('/')
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Verificando acceso...
      </div>
    )
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-black text-white">
        {/* HEADER GLOBAL DASHBOARD */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h1 className="font-bold">CS360 Dashboard</h1>
          <LogoutButton />
        </div>

        {/* CONTENIDO */}
        <div>{children}</div>
      </div>
    </AppProvider>
  )
}
