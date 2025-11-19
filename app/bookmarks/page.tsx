'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { BookmarksGrid } from '@/components/bookmarks/bookmarks-grid'
import { BookmarksSidebar } from '@/components/bookmarks/bookmarks-sidebar'
import { Trash2, Grid3x3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BookmarksPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest')

  const bookmarks = [
    {
      id: 1,
      title: 'OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning',
      category: 'Technology',
      source: 'TechCrunch',
      savedAt: '2 hours ago',
      image: '/ai-breakthrough-technology.jpg'
    },
    {
      id: 2,
      title: 'Stock Market Reaches Historic High as Tech Stocks Rally',
      category: 'Business',
      source: 'Bloomberg',
      savedAt: '5 hours ago',
      image: '/stock-market-trading.jpg'
    },
    {
      id: 3,
      title: 'Scientists Discover New Method for Carbon Capture at Scale',
      category: 'Science',
      source: 'Nature',
      savedAt: '1 day ago',
      image: '/carbon-capture-climate.jpg'
    },
  ]

  const filteredBookmarks = selectedCategory
    ? bookmarks.filter(b => b.category === selectedCategory)
    : bookmarks

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    if (sortBy === 'oldest') return 1
    return -1
  })

  return (
    <AppShell>
      <div className="flex h-full gap-6 p-6">
        {/* Sidebar */}
        <BookmarksSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {sortedBookmarks.length} article{sortedBookmarks.length !== 1 ? 's' : ''} saved
              </p>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'latest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('latest')}
                >
                  Latest
                </Button>
                <Button
                  variant={sortBy === 'oldest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('oldest')}
                >
                  Oldest
                </Button>
              </div>
            </div>
          </div>

          {/* Bookmarks */}
          <BookmarksGrid
            bookmarks={sortedBookmarks}
            viewMode={viewMode}
          />

          {sortedBookmarks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">No bookmarks yet</p>
              <p className="text-muted-foreground max-w-sm">
                Start saving articles to your bookmarks. They'll appear here for easy access later.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
