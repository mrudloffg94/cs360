'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Users, 
  Car, 
  ClipboardList, 
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Circle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock admin data
const mockClients = [
  {
    id: '1',
    name: 'Sebastián Cortés',
    email: 'sebastian@empresa.cl',
    plan: 'Platinum',
    vehicles: 3,
    status: 'Activo',
    lastActivity: '2024-05-15',
  },
  {
    id: '2',
    name: 'Carolina Mendoza',
    email: 'carolina@grupo.cl',
    plan: 'Black',
    vehicles: 5,
    status: 'Activo',
    lastActivity: '2024-05-14',
  },
  {
    id: '3',
    name: 'Francisco Arias',
    email: 'francisco@corp.cl',
    plan: 'Fleet',
    vehicles: 12,
    status: 'Activo',
    lastActivity: '2024-05-13',
  },
  {
    id: '4',
    name: 'María José Villalobos',
    email: 'mjv@empresa.cl',
    plan: 'Advisory',
    vehicles: 2,
    status: 'Activo',
    lastActivity: '2024-05-12',
  },
  {
    id: '5',
    name: 'Roberto Fuentes',
    email: 'roberto@holdings.cl',
    plan: 'Essential',
    vehicles: 1,
    status: 'Suspendido',
    lastActivity: '2024-04-20',
  },
]

const mockAdminRequests = [
  {
    id: '1',
    client: 'Sebastián Cortés',
    type: 'Mantención',
    title: 'Servicio de frenos Mercedes GLE',
    status: 'En proceso',
    priority: 'Alta',
    assignedTo: 'María Fernanda Ruiz',
  },
  {
    id: '2',
    client: 'Carolina Mendoza',
    type: 'Transferencia',
    title: 'Transferencia BMW X7',
    status: 'Pendiente',
    priority: 'Normal',
    assignedTo: 'Juan Pablo Soto',
  },
  {
    id: '3',
    client: 'Francisco Arias',
    type: 'Revisión',
    title: 'Revisión técnica flota completa',
    status: 'Pendiente',
    priority: 'Urgente',
    assignedTo: 'María Fernanda Ruiz',
  },
]

const planColors: Record<string, string> = {
  Essential: 'bg-muted text-muted-foreground',
  Advisory: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Fleet: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Platinum: 'bg-slate-300/10 text-slate-300 border-slate-300/20',
  Black: 'bg-foreground/10 text-foreground border-foreground/20',
}

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

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Stats
  const stats = [
    {
      label: 'Clientes activos',
      value: '47',
      change: '+12%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Vehículos gestionados',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Car,
    },
    {
      label: 'Solicitudes activas',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: ClipboardList,
    },
    {
      label: 'Ingresos mensuales',
      value: '$45.2M',
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
    },
  ]

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestión de clientes, flota y operaciones</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className={cn(
                    'flex items-center gap-1 text-sm',
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  )}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger value="clients" className="data-[state=active]:bg-card">
            <Users className="h-4 w-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-card">
            <ClipboardList className="h-4 w-4 mr-2" />
            Solicitudes
          </TabsTrigger>
          <TabsTrigger value="fleet" className="data-[state=active]:bg-card">
            <Car className="h-4 w-4 mr-2" />
            Flota
          </TabsTrigger>
        </TabsList>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>
            <Button variant="outline" className="border-border/50">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>

          {/* Clients Table */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/30">
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Cliente</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Plan</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Vehículos</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Estado</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Última actividad</th>
                    <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-border">
                            <AvatarFallback className="bg-secondary text-foreground text-sm">
                              {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn(planColors[client.plan])}>
                          {client.plan}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-foreground">{client.vehicles}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn(
                          client.status === 'Activo' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        )}>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-muted-foreground text-sm">
                          {new Date(client.lastActivity).toLocaleDateString('es-CL')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Requests Tab - Kanban Style */}
        <TabsContent value="requests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Pendiente', 'En proceso', 'Completado'] as const).map((status) => {
              const statusRequests = mockAdminRequests.filter(r => r.status === status)
              return (
                <div key={status} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn(statusColors[status])}>
                        {status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ({statusRequests.length})
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {statusRequests.length === 0 ? (
                      <Card className="border-border/50 bg-card/30 border-dashed">
                        <CardContent className="p-6 text-center">
                          <p className="text-sm text-muted-foreground">Sin solicitudes</p>
                        </CardContent>
                      </Card>
                    ) : (
                      statusRequests.map((request) => (
                        <Card key={request.id} className="border-border/50 bg-card/50 cursor-pointer hover:bg-card/70 transition-colors">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start gap-2">
                              <Circle className={cn(
                                'h-2 w-2 mt-1.5 fill-current shrink-0',
                                priorityColors[request.priority as keyof typeof priorityColors]
                              )} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground text-sm truncate">
                                  {request.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{request.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{request.client}</span>
                              <span className="text-accent">{request.assignedTo.split(' ')[0]}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Fleet Tab */}
        <TabsContent value="fleet" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Fleet Stats */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total vehículos</p>
                <p className="text-3xl font-semibold text-foreground">156</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">En mantención</p>
                <p className="text-3xl font-semibold text-amber-400">12</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Docs por vencer</p>
                <p className="text-3xl font-semibold text-red-400">8</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Servicios mes</p>
                <p className="text-3xl font-semibold text-green-400">34</p>
              </CardContent>
            </Card>
          </div>

          {/* Fleet by Brand */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">Distribución por marca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { brand: 'Mercedes-Benz', count: 42, percentage: 27 },
                  { brand: 'BMW', count: 38, percentage: 24 },
                  { brand: 'Porsche', count: 28, percentage: 18 },
                  { brand: 'Audi', count: 25, percentage: 16 },
                  { brand: 'Otros', count: 23, percentage: 15 },
                ].map((item) => (
                  <div key={item.brand} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.brand}</span>
                      <span className="text-muted-foreground">{item.count} vehículos</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
