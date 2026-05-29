'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

import { createClient } from '@/lib/supabase/client'

import type {
  User,
  Vehicle,
  Maintenance,
  Document,
  Request,
  PlanType,
} from './types'

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void

  vehicles: Vehicle[]
  setVehicles: (vehicles: Vehicle[]) => void

  maintenances: Maintenance[]
  setMaintenances: (maintenances: Maintenance[]) => void

  documents: Document[]
  setDocuments: (documents: Document[]) => void

  requests: Request[]
  setRequests: (requests: Request[]) => void

  isBlackExperience: boolean
  switchPlan: (plan: PlanType) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (!profile) return

      setUser({
        id: profile.id,
        name: profile.full_name || 'Usuario',
        email: profile.email,
        plan: profile.plan || 'Essential',
        concierge: profile.concierge || '',
        accountStatus: 'Activo',
      })
    }

    loadUser()
  }, [])

  const isBlackExperience = user?.plan === 'Black'

  const switchPlan = (plan: PlanType) => {
    if (!user) return

    setUser({
      ...user,
      plan,
    })
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        vehicles,
        setVehicles,

        maintenances,
        setMaintenances,

        documents,
        setDocuments,

        requests,
        setRequests,

        isBlackExperience,
        switchPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }

  return context
}