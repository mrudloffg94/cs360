'use client'

import { useApp } from '@/lib/context'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Bell, Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { PlanType } from '@/lib/types'

const planColors: Record<string, string> = {
  Essential: 'bg-muted text-muted-foreground',
  Advisory: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Fleet: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Platinum: 'bg-slate-300/10 text-slate-300 border-slate-300/20',
  Black: 'bg-foreground/10 text-foreground border-foreground/20',
}

const plans: PlanType[] = ['Essential', 'Advisory', 'Fleet', 'Platinum', 'Black']

export function DashboardHeader() {
  const { user, switchPlan, isBlackExperience } = useApp()

  if (!user) return null

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar vehículos, documentos..."
              className="pl-10 h-10 bg-secondary/50 border-border/50 focus:border-accent focus:ring-accent/20"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Plan Switcher (Demo) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-border/50 gap-2">
                <Badge variant="outline" className={planColors[user.plan]}>
                  {user.plan}
                </Badge>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border w-48">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Cambiar plan (Demo)
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              {plans.map((plan) => (
                <DropdownMenuItem
                  key={plan}
                  onClick={() => switchPlan(plan)}
                  className="cursor-pointer"
                >
                  <Badge variant="outline" className={planColors[plan]}>
                    {plan}
                  </Badge>
                  {plan === 'Black' && (
                    <span className="ml-auto text-xs text-accent">Silencioso</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User info */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <div className="flex items-center gap-2 justify-end">
                {isBlackExperience && (
                  <span className="text-xs text-accent flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Gestión silenciosa
                  </span>
                )}
                {!isBlackExperience && (
                  <span className="text-xs text-muted-foreground">
                    {user.accountStatus}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Concierge info */}
          <div className="hidden lg:block text-right border-l border-border pl-6">
            <p className="text-xs text-muted-foreground">Ejecutivo asignado</p>
            <p className="text-sm font-medium text-foreground">{user.concierge}</p>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent" />
          </Button>

          {/* Avatar */}
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-secondary text-foreground text-sm">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
