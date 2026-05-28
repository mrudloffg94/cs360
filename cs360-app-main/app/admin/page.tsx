"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Si NO hay usuario
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

  // Loading mientras verifica
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Verificando acceso...
      </div>
    )
  }

  // PANEL ADMIN
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Panel Admin</h1>

      <p className="mt-4 text-gray-500">
        Administración automotriz CS360
      </p>
    </div>
  )
}