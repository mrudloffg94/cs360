export type PlanType = 'Essential' | 'Advisory' | 'Fleet' | 'Platinum' | 'Black'

export type VehicleStatus = 'Activo' | 'Mantención' | 'Pendiente'

export type DocumentStatus = 'Vigente' | 'Por vencer' | 'Vencido'

export type RequestStatus = 'Pendiente' | 'En proceso' | 'Completado'

export type RequestType = 'Mantención' | 'Revisión' | 'Transferencia' | 'Asesoría'

export interface User {
  id: string
  name: string
  email: string
  plan: PlanType
  concierge: string
  accountStatus: 'Activo' | 'Suspendido'
  avatar?: string
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  plate: string
  status: VehicleStatus
  image?: string
  vin?: string
  color?: string
  mileage?: number
  lastService?: string
  nextService?: string
}

export interface Maintenance {
  id: string
  vehicleId: string
  type: string
  date: string
  status: 'Completado' | 'Programado' | 'Pendiente'
  cost?: number
  description?: string
  provider?: string
}

export interface Document {
  id: string
  vehicleId: string
  type: 'Permiso de circulación' | 'Seguro' | 'Revisión técnica' | 'Padrón'
  status: DocumentStatus
  expirationDate: string
  documentUrl?: string
}

export interface Request {
  id: string
  userId: string
  vehicleId?: string
  type: RequestType
  status: RequestStatus
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  priority?: 'Normal' | 'Alta' | 'Urgente'
}

export interface ConciergeMessage {
  id: string
  userId: string
  concierge: string
  message: string
  timestamp: string
  isFromConcierge: boolean
}
