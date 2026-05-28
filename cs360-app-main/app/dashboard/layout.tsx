'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppProvider } from '@/lib/context'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { getCurrentUserRole, isAdminRole, isClientRole } from '@/lib/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      const { user, role } = await getCurrentUserRole()

      if (!user) {
        router.replace('/')
        return
      }

      if (isAdminRole(role)) {
        router.replace('/admin')
        return
      }

      if (!isClientRole(role)) {
        router.replace('/')
        return
      }

      setLoading(false)
    }

    checkAccess()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Verificando acceso...
      </div>
    )
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="pl-[260px] transition-all duration-300">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AppProvider>
  )
}
