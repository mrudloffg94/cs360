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
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  timestamp: string
  isFromConcierge: boolean
}

function initials(name: string) {
  const value = name.trim()

  if (!value) return 'CS'

  return value
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function ConciergePage() {
  const { user, isBlackExperience } = useApp()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  const conciergeName = user?.concierge || 'Concierge CS360'

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isFromConcierge: false,
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Concierge CS360</h1>
        <p className="text-muted-foreground">Tu canal de comunicacion exclusivo</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="flex h-[600px] flex-col border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-accent/20">
                      <AvatarFallback className="bg-accent/20 text-lg text-accent">
                        {initials(conciergeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{conciergeName}</p>
                    <p className="text-sm text-green-400">En linea</p>
                  </div>
                </div>

                {isBlackExperience && (
                  <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm text-accent">Canal prioritario</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                  No hay mensajes registrados.
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.isFromConcierge ? 'justify-start' : 'justify-end'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        message.isFromConcierge
                          ? 'rounded-tl-sm bg-secondary/50'
                          : 'rounded-tr-sm bg-accent/20'
                      )}
                    >
                      <p className="text-sm text-foreground">{message.content}</p>
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          message.isFromConcierge
                            ? 'text-muted-foreground'
                            : 'text-accent/60'
                        )}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>

            <div className="border-t border-border/50 p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleSendMessage()}
                  className="border-border/50 bg-secondary/50 focus:border-accent"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="space-y-4 p-6">
              <div className="text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20 border-2 border-accent/20">
                  <AvatarFallback className="bg-accent/20 text-2xl text-accent">
                    {initials(conciergeName)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground">{conciergeName}</h3>
                <p className="text-sm text-muted-foreground">Ejecutivo de Cuentas</p>

                <div className="mt-3 flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">5.0</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-border/50 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">contacto@cs360.vip</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+56 9 0000 0000</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Lun - Vie: 9:00 - 19:00</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-border/50">
                <Phone className="mr-2 h-4 w-4" />
                Solicitar llamada
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Acciones rapidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <MessageCircle className="mr-3 h-4 w-4" />
                Consulta general
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Headphones className="mr-3 h-4 w-4" />
                Soporte tecnico
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Star className="mr-3 h-4 w-4" />
                Solicitar cotizacion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
