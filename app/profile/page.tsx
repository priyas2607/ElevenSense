'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { Button } from '@/components/ui/button'
import { User, Bell, Lock, LogOut, Moon, Sun } from 'lucide-react'

export default function ProfilePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [notifications, setNotifications] = useState({
    breaking: true,
    weekly: true,
    personalized: true
  })

  const [userInfo, setUserInfo] = useState({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@example.com',
    joinDate: 'January 15, 2025'
  })

  const [editMode, setEditMode] = useState(false)

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">{userInfo.name}</h1>
                <p className="text-muted-foreground">{userInfo.email}</p>
                <p className="text-sm text-muted-foreground">Member since {userInfo.joinDate}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Done' : 'Edit'}
            </Button>
          </div>

          {editMode && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full bg-secondary text-foreground rounded-lg px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full bg-secondary text-foreground rounded-lg px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-xl border border-border p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Preferences</h2>

          {/* Theme */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Theme</h3>
            <div className="flex gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setTheme('light')}
              >
                <Sun className="w-4 h-4" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setTheme('dark')}
              >
                <Moon className="w-4 h-4" />
                Dark
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </h3>
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-foreground capitalize">
                  {key === 'breaking' && 'Breaking News Alerts'}
                  {key === 'weekly' && 'Weekly Summary'}
                  {key === 'personalized' && 'Personalized Recommendations'}
                </span>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  className={`w-12 h-6 rounded-full transition-all ${
                    value ? 'bg-primary' : 'bg-muted'
                  } relative`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute transition-all ${
                      value ? 'right-0.5' : 'left-0.5'
                    } top-0.5`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="bg-card rounded-xl border border-border p-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-6">Account</h2>

          <Button variant="outline" className="w-full gap-2 justify-start">
            <Lock className="w-4 h-4" />
            Change Password
          </Button>

          <Button variant="destructive" className="w-full gap-2 justify-start">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Articles Read', value: '127' },
            { label: 'Bookmarks', value: '34' },
            { label: 'AI Chats', value: '89' }
          ].map(stat => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
