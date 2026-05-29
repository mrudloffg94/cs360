'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
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