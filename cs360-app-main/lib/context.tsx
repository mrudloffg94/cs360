'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { User, Vehicle, Maintenance, Document, Request, PlanType } from './types'

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

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Sebastián Cortés',
  email: 'sebastian@empresa.cl',
  plan: 'Platinum',
  concierge: 'María Fernanda Ruiz',
  accountStatus: 'Activo',
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Porsche',
    model: 'Cayenne',
    year: 2023,
    plate: 'GGXX-45',
    status: 'Activo',
    color: 'Negro',
    mileage: 12500,
    lastService: '2024-01-15',
    nextService: '2024-07-15',
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'GLE 450',
    year: 2022,
    plate: 'BBCC-12',
    status: 'Mantención',
    color: 'Gris Grafito',
    mileage: 28000,
    lastService: '2024-02-20',
    nextService: '2024-05-20',
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'X5 M50i',
    year: 2024,
    plate: 'LLNN-88',
    status: 'Activo',
    color: 'Blanco',
    mileage: 5200,
    lastService: '2024-03-01',
    nextService: '2024-09-01',
  },
]

const mockMaintenances: Maintenance[] = [
  {
    id: '1',
    vehicleId: '1',
    type: 'Servicio completo',
    date: '2024-07-15',
    status: 'Programado',
    cost: 850000,
    description: 'Cambio de aceite, filtros y revisión general',
    provider: 'Porsche Center Santiago',
  },
  {
    id: '2',
    vehicleId: '2',
    type: 'Cambio de frenos',
    date: '2024-05-20',
    status: 'Pendiente',
    cost: 1200000,
    description: 'Reemplazo de pastillas y discos delanteros',
    provider: 'Mercedes-Benz Chile',
  },
  {
    id: '3',
    vehicleId: '1',
    type: 'Alineación y balanceo',
    date: '2024-01-15',
    status: 'Completado',
    cost: 120000,
    description: 'Alineación 3D y balanceo de 4 ruedas',
    provider: 'Porsche Center Santiago',
  },
]

const mockDocuments: Document[] = [
  {
    id: '1',
    vehicleId: '1',
    type: 'Permiso de circulación',
    status: 'Vigente',
    expirationDate: '2025-03-31',
  },
  {
    id: '2',
    vehicleId: '1',
    type: 'Seguro',
    status: 'Vigente',
    expirationDate: '2024-12-15',
  },
  {
    id: '3',
    vehicleId: '1',
    type: 'Revisión técnica',
    status: 'Por vencer',
    expirationDate: '2024-06-30',
  },
  {
    id: '4',
    vehicleId: '2',
    type: 'Permiso de circulación',
    status: 'Vigente',
    expirationDate: '2025-03-31',
  },
  {
    id: '5',
    vehicleId: '2',
    type: 'Seguro',
    status: 'Vencido',
    expirationDate: '2024-04-01',
  },
]

const mockRequests: Request[] = [
  {
    id: '1',
    userId: '1',
    vehicleId: '2',
    type: 'Mantención',
    status: 'En proceso',
    title: 'Servicio de frenos Mercedes GLE',
    description: 'Solicitud de cotización y agendamiento para cambio de frenos',
    createdAt: '2024-05-01',
    priority: 'Alta',
  },
  {
    id: '2',
    userId: '1',
    type: 'Asesoría',
    status: 'Pendiente',
    title: 'Consulta renovación de flota',
    description: 'Asesoría para evaluar opciones de renovación de vehículo',
    createdAt: '2024-05-10',
    priority: 'Normal',
  },
  {
    id: '3',
    userId: '1',
    vehicleId: '1',
    type: 'Revisión',
    status: 'Completado',
    title: 'Revisión técnica Porsche Cayenne',
    description: 'Gestión completa de revisión técnica',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-18',
    priority: 'Normal',
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser)
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [maintenances, setMaintenances] = useState<Maintenance[]>(mockMaintenances)
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [requests, setRequests] = useState<Request[]>(mockRequests)

  const isBlackExperience = user?.plan === 'Black'

  const switchPlan = (plan: PlanType) => {
    if (user) {
      setUser({ ...user, plan })
    }
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
