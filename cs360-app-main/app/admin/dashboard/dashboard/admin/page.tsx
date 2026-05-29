'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function AdminPage() {
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  }, [])

  return (
    <div>
      <h1>Admin Panel</h1>
      {user ? (
        <p>Bienvenido {user.email}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}