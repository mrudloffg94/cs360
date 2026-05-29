"use client"

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

const supabase = createClient()

const [user, setUser] = useState<any>(null)

useEffect(() => {
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)
  }

  getUser()
}, [])

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // No hay usuario
      if (!user) {
        router.push("/")
        return
      }

      // Buscar perfil
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      // Si NO es admin
      if (profile?.role !== "admin") {
        router.push("/dashboard")
        return
      }

      setLoading(false)
    }

    checkAccess()
  }, [router])

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Verificando acceso...
      </div>
    )
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Panel Admin CS360
      </h1>

      <p className="mt-4 text-gray-500">
        Administración y gestión interna
      </p>
    </div>
  )
}