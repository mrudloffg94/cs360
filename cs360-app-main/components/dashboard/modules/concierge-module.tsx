'use client'

import { useApp } from '@/lib/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Headphones, Phone, MessageCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function ConciergeModule() {
  const { user, isBlackExperience } = useApp()

  if (!user) return null

  return (
    <Card className={cn(
      'border-border/50 backdrop-blur-sm h-full',
      isBlackExperience 
        ? 'bg-gradient-to-br from-accent/5 to-card/50' 
        : 'bg-card/50'
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Headphones className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Concierge CS360</CardTitle>
            <p className="text-sm text-muted-foreground">Asistencia personalizada</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Concierge Info */}
        <div className="p-4 rounded-lg bg-secondary/30 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-lg font-semibold text-accent">
                {user.concierge.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-medium text-foreground">{user.concierge}</p>
              <p className="text-sm text-muted-foreground">Tu ejecutivo asignado</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-muted-foreground ml-2">Calificación: 5.0</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            asChild
          >
            <Link href="/dashboard/concierge">
              <MessageCircle className="mr-2 h-4 w-4" />
              Enviar mensaje
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-border/50 text-foreground hover:bg-secondary/50"
          >
            <Phone className="mr-2 h-4 w-4" />
            Solicitar llamada
          </Button>
        </div>

        {/* Priority Channel for Black */}
        {isBlackExperience && (
          <div className="pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-accent">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Canal prioritario activo</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiempo de respuesta promedio: 15 min
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
