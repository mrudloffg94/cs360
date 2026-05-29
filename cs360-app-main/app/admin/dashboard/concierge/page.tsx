'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Headphones, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Star,
  MessageCircle,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  timestamp: string
  isFromConcierge: boolean
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Buenos días Sebastián, le informo que su Porsche Cayenne ya está listo para retiro después del servicio de mantención.',
    timestamp: '10:30',
    isFromConcierge: true,
  },
  {
    id: '2',
    content: 'Perfecto, gracias María Fernanda. ¿A qué hora puedo pasar?',
    timestamp: '10:45',
    isFromConcierge: false,
  },
  {
    id: '3',
    content: 'Puede pasar a partir de las 14:00 hrs. Le tendremos el vehículo listo en la zona de entrega VIP.',
    timestamp: '10:48',
    isFromConcierge: true,
  },
  {
    id: '4',
    content: 'Adicionalmente, le recuerdo que el seguro de su Mercedes GLE vence el próximo mes. ¿Desea que gestione la renovación?',
    timestamp: '10:50',
    isFromConcierge: true,
  },
]

export default function ConciergePage() {
  const { user, isBlackExperience } = useApp()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      isFromConcierge: false,
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Concierge CS360</h1>
        <p className="text-muted-foreground">Tu canal de comunicación exclusivo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-accent/20">
                      <AvatarFallback className="bg-accent/20 text-accent text-lg">
                        {user.concierge.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.concierge}</p>
                    <p className="text-sm text-green-400">En línea</p>
                  </div>
                </div>
                {isBlackExperience && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm text-accent">Canal prioritario</span>
                  </div>
                )}
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.isFromConcierge ? 'justify-start' : 'justify-end'
                  )}
                >
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    message.isFromConcierge 
                      ? 'bg-secondary/50 rounded-tl-sm' 
                      : 'bg-accent/20 rounded-tr-sm'
                  )}>
                    <p className="text-sm text-foreground">{message.content}</p>
                    <p className={cn(
                      'text-xs mt-1',
                      message.isFromConcierge ? 'text-muted-foreground' : 'text-accent/60'
                    )}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-border/50 p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-secondary/50 border-border/50 focus:border-accent"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Concierge Info */}
        <div className="space-y-6">
          {/* Concierge Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-accent/20">
                  <AvatarFallback className="bg-accent/20 text-accent text-2xl">
                    {user.concierge.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground">{user.concierge}</h3>
                <p className="text-sm text-muted-foreground">Ejecutivo de Cuentas Premium</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">5.0</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">mfruiz@cs360.vip</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+56 9 8765 4321</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Lun - Vie: 9:00 - 19:00</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-border/50">
                <Phone className="h-4 w-4 mr-2" />
                Solicitar llamada
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-4 w-4 mr-3" />
                Consulta general
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Headphones className="h-4 w-4 mr-3" />
                Soporte técnico
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Star className="h-4 w-4 mr-3" />
                Solicitar cotización
              </Button>
            </CardContent>
          </Card>

          {/* Response Time */}
          {isBlackExperience && (
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Experiencia Black</p>
                    <p className="text-xs text-muted-foreground">Tiempo de respuesta: 15 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
