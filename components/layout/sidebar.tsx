'use client'

import { Home, Bookmark, MessageCircle, User, LogOut, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  open: boolean
}

const navItems = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: Bookmark, label: 'Bookmarks', href: '/bookmarks' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export function Sidebar({ open }: SidebarProps) {
  return (
    <aside className={`${
      open ? 'w-64' : 'w-0'
    } transition-all duration-300 border-r border-border/30 glass overflow-hidden flex flex-col`}>
      <div className="flex flex-col h-full p-6">
        <div className="mb-8 pb-6 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ElevenSense</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{label}</span>
              </Button>
            </Link>
          ))}
        </nav>
        
        <Button 
          variant="outline" 
          className="w-full gap-2 glass hover:bg-white/10 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
