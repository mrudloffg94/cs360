'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUserRole, routeForRole } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const redirectActiveSession = async () => {
      const { user, role } = await getCurrentUserRole()

      if (user && role) {
        const route = routeForRole(role)

        if (route !== '/') {
          router.replace(route)
          return
        }

        await supabase.auth.signOut()
      }

      setLoading(false)
    }

    redirectActiveSession()
  }, [router])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError('Correo o contrasena incorrectos.')
      setSubmitting(false)
      return
    }

    const { role } = await getCurrentUserRole()

    const route = role ? routeForRole(role) : '/'

    if (route === '/') {
      await supabase.auth.signOut()
      setError('Tu usuario no tiene un perfil autorizado.')
      setSubmitting(false)
      return
    }

    router.replace(route)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Verificando sesion...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
      >
        <div className="mb-8">
          <p className="text-sm text-zinc-400">CS360.vip</p>
          <h1 className="mt-2 text-3xl font-bold">Iniciar sesion</h1>
        </div>

        <label className="block text-sm font-medium text-zinc-300" htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-white"
        />

        <label className="mt-5 block text-sm font-medium text-zinc-300" htmlFor="password">
          Contrasena
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-white"
        />

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
