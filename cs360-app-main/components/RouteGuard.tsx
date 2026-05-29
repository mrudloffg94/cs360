'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUserRole, routeForRole } from '@/lib/auth'

type RouteGuardProps = {
  allowedRoles: string[]
  children: React.ReactNode
}

export default function RouteGuard({ allowedRoles, children }: RouteGuardProps) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      const { user, role } = await getCurrentUserRole()

      if (!user) {
        router.replace('/login')
        return
      }

      if (!role) {
        router.replace('/')
        return
      }

      if (!allowedRoles.includes(role)) {
        router.replace(routeForRole(role))
        return
      }

      setAuthorized(true)
      setLoading(false)
    }

    checkAccess()
  }, [allowedRoles, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Verificando acceso...
      </div>
    )
  }

  return authorized ? <>{children}</> : null
}
