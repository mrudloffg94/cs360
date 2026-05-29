'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ClipboardList, 
  Plus, 
  Circle, 
  Calendar, 
  Car,
  Filter,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Request, RequestType, RequestStatus } from '@/lib/types'

const statusColors = {
  Pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'En proceso': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Completado: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const priorityColors = {
  Normal: 'text-muted-foreground',
  Alta: 'text-amber-400',
  Urgente: 'text-red-400',
}

const typeIcons: Record<RequestType, string> = {
  Mantención: 'Servicio y reparaciones',
  Revisión: 'Revisiones técnicas',
  Transferencia: 'Cambios de propietario',
  Asesoría: 'Consultas y orientación',
}

export default function SolicitudesPage() {
  const { requests, setRequests, vehicles } = useApp()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | RequestStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // New request form state
  const [newRequest, setNewRequest] = useState({
    type: '' as RequestType | '',
    vehicleId: '',
    title: '',
    description: '',
    priority: 'Normal' as 'Normal' | 'Alta' | 'Urgente',
  })

  const filteredRequests = requests.filter(r => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const groupedRequests = {
    Pendiente: filteredRequests.filter(r => r.status === 'Pendiente'),
    'En proceso': filteredRequests.filter(r => r.status === 'En proceso'),
    Completado: filteredRequests.filter(r => r.status === 'Completado'),
  }

  const handleCreateRequest = () => {
    if (!newRequest.type || !newRequest.title) return

    const request: Request = {
      id: Date.now().toString(),
      userId: '1',
      vehicleId: newRequest.vehicleId || undefined,
      type: newRequest.type as RequestType,
      status: 'Pendiente',
      title: newRequest.title,
      description: newRequest.description,
      createdAt: new Date().toISOString().split('T')[0],
      priority: newRequest.priority,
    }

    setRequests([request, ...requests])
    setNewRequest({ type: '', vehicleId: '', title: '', description: '', priority: 'Normal' })
    setIsDialogOpen(false)
  }

  const getVehicle = (vehicleId?: string) => {
    if (!vehicleId) return null
    return vehicles.find(v => v.id === vehicleId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Centro de Solicitudes</h1>
          <p className="text-muted-foreground">Gestiona tus solicitudes y seguimiento</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="mr-2 h-4 w-4" />
              Nueva solicitud
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">Crear nueva solicitud</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Completa los datos para crear una nueva solicitud
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-foreground">Tipo de solicitud</Label>
                <Select
                  value={newRequest.type}
                  onValueChange={(value: RequestType) => setNewRequest({ ...newRequest, type: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {(Object.keys(typeIcons) as RequestType[]).map((type) => (
                      <SelectItem key={type} value={type}>
                        <div>
                          <p>{type}</p>
                          <p className="text-xs text-muted-foreground">{typeIcons[type]}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Vehículo (opcional)</Label>
                <Select
                  value={newRequest.vehicleId}
                  onValueChange={(value) => setNewRequest({ ...newRequest, vehicleId: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Selecciona un vehículo" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="">Sin vehículo específico</SelectItem>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.plate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Título</Label>
                <Input
                  placeholder="Describe brevemente tu solicitud"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Descripción</Label>
                <Textarea
                  placeholder="Proporciona más detalles sobre tu solicitud"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  className="bg-input border-border min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Prioridad</Label>
                <Select
                  value={newRequest.priority}
                  onValueChange={(value: 'Normal' | 'Alta' | 'Urgente') => setNewRequest({ ...newRequest, priority: value })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-border"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                  onClick={handleCreateRequest}
                  disabled={!newRequest.type || !newRequest.title}
                >
                  Crear solicitud
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar solicitudes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <Select
          value={filterStatus}
          onValueChange={(value: 'all' | RequestStatus) => setFilterStatus(value)}
        >
          <SelectTrigger className="w-[180px] bg-secondary/50 border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En proceso">En proceso</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests View */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="list" className="data-[state=active]:bg-card">
            Lista
          </TabsTrigger>
          <TabsTrigger value="kanban" className="data-[state=active]:bg-card">
            Kanban
          </TabsTrigger>
        </TabsList>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-12 text-center">
                <ClipboardList className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No hay solicitudes que mostrar</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map((request) => {
                const vehicle = getVehicle(request.vehicleId)
                return (
                  <Card key={request.id} className="border-border/50 bg-card/50 hover:bg-card/70 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Circle className={cn(
                            'h-2.5 w-2.5 mt-2 fill-current shrink-0',
                            priorityColors[request.priority || 'Normal']
                          )} />
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-foreground">{request.title}</p>
                              <Badge variant="outline" className="text-xs">
                                {request.type}
                              </Badge>
                            </div>
                            {request.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {request.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(request.createdAt).toLocaleDateString('es-CL')}
                              </span>
                              {vehicle && (
                                <span className="flex items-center gap-1">
                                  <Car className="h-3 w-3" />
                                  {vehicle.brand} {vehicle.model}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn(statusColors[request.status])}>
                          {request.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Kanban View */}
        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Pendiente', 'En proceso', 'Completado'] as RequestStatus[]).map((status) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn(statusColors[status])}>
                      {status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ({groupedRequests[status].length})
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {groupedRequests[status].length === 0 ? (
                    <Card className="border-border/50 bg-card/30 border-dashed">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">Sin solicitudes</p>
                      </CardContent>
                    </Card>
                  ) : (
                    groupedRequests[status].map((request) => {
                      const vehicle = getVehicle(request.vehicleId)
                      return (
                        <Card key={request.id} className="border-border/50 bg-card/50">
                          <CardContent className="p-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <Circle className={cn(
                                'h-2 w-2 mt-1.5 fill-current shrink-0',
                                priorityColors[request.priority || 'Normal']
                              )} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground text-sm truncate">
                                  {request.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{request.type}</p>
                              </div>
                            </div>
                            {vehicle && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Car className="h-3 w-3" />
                                {vehicle.brand} {vehicle.model}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
