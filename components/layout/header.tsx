'use client'

import { Menu, Search, Bell, Settings, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="border-b border-border/30 glass sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hover:bg-primary/10 transition"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ElevenSense</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 transition"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 transition"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 transition"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
