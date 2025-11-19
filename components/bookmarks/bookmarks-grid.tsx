'use client'

import Link from 'next/link'
import { Bookmark, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface BookmarksGridProps {
  bookmarks: Array<{
    id: number
    title: string
    category: string
    source: string
    savedAt: string
    image: string
  }>
  viewMode: 'grid' | 'list'
}

export function BookmarksGrid({ bookmarks, viewMode }: BookmarksGridProps) {
  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([])

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {bookmarks.map(bookmark => (
          <Link key={bookmark.id} href={`/article/${bookmark.id}`}>
            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition">
              <img
                src={bookmark.image || '/placeholder.svg'}
                alt={bookmark.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2 hover:text-primary">
                  {bookmark.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {bookmark.source} • Saved {bookmark.savedAt}
                </p>
                <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded">
                  {bookmark.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.map(bookmark => (
        <Link key={bookmark.id} href={`/article/${bookmark.id}`}>
          <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg h-full flex flex-col">
            <div className="relative aspect-video overflow-hidden bg-secondary">
              <img
                src={bookmark.image || '/placeholder.svg'}
                alt={bookmark.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">
                  {bookmark.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-4">
              <h3 className="font-bold text-foreground line-clamp-2 mb-2 text-sm hover:text-primary transition">
                {bookmark.title}
              </h3>

              <p className="text-xs text-muted-foreground mb-4 flex-1">
                {bookmark.source} • Saved {bookmark.savedAt}
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-8 text-xs gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Ask AI
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
