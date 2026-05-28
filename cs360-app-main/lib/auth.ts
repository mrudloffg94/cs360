'use client'

import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type UserRole = 'admin' | 'cliente' | 'client' | 'customer' | 'user'

const clientRoles = new Set<UserRole>(['cliente', 'client', 'customer', 'user'])

export function isAdminRole(role: string | null | undefined) {
  return role === 'admin'
}

export function isClientRole(role: string | null | undefined) {
  return clientRoles.has(role as UserRole)
}

export function routeForRole(role: string) {
  if (isAdminRole(role)) return '/admin'
  if (isClientRole(role)) return '/dashboard'
  return '/'
}

export async function getCurrentUserRole(): Promise<{
  user: User | null
  role: string | null
}> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, role: null }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return {
    user,
    role: typeof profile?.role === 'string' ? profile.role : null,
  }
}
