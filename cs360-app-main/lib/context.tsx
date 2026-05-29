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

      const [
        vehiclesResult,
        maintenancesResult,
        documentsResult,
        requestsResult,
      ] = await Promise.all([
        supabase.from('vehicles').select('*').eq('user_id', authUser.id),
        supabase.from('maintenances').select('*').eq('user_id', authUser.id),
        supabase.from('documents').select('*').eq('user_id', authUser.id),
        supabase.from('requests').select('*').eq('user_id', authUser.id),
      ])

      if (vehiclesResult.data) {
        setVehicles(
          vehiclesResult.data.map((vehicle: any) => ({
            id: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            plate: vehicle.plate,
            status: vehicle.status,
            image: vehicle.image,
            vin: vehicle.vin,
            color: vehicle.color,
            mileage: vehicle.mileage,
            lastService: vehicle.last_service,
            nextService: vehicle.next_service,
          }))
        )
      }

      if (maintenancesResult.data) {
        setMaintenances(
          maintenancesResult.data.map((maintenance: any) => ({
            id: maintenance.id,
            vehicleId: maintenance.vehicle_id,
            type: maintenance.type,
            date: maintenance.date,
            status: maintenance.status,
            cost: maintenance.cost,
            description: maintenance.description,
            provider: maintenance.provider,
          }))
        )
      }

      if (documentsResult.data) {
        setDocuments(
          documentsResult.data.map((document: any) => ({
            id: document.id,
            vehicleId: document.vehicle_id,
            type: document.type,
            status: document.status,
            expirationDate: document.expiration_date,
            documentUrl: document.document_url,
          }))
        )
      }

      if (requestsResult.data) {
        setRequests(
          requestsResult.data.map((request: any) => ({
            id: request.id,
            userId: request.user_id,
            vehicleId: request.vehicle_id,
            type: request.type,
            status: request.status,
            title: request.title,
            description: request.description,
            createdAt: request.created_at,
            updatedAt: request.updated_at,
            priority: request.priority,
          }))
        )
      }
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
