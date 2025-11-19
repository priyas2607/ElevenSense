'use client'

import Link from 'next/link'
import { Bookmark, MessageCircle, Share2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface NewsCardProps {
  article: {
    id: number
    title: string
    summary: string
    category: string
    source: string
    timestamp: string
    image: string
    readTime: string
    sentiment: 'positive' | 'neutral' | 'negative'
    views: number
  }
}

export function NewsCard({ article }: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const sentimentColors = {
    positive: 'text-emerald-400',
    neutral: 'text-blue-400',
    negative: 'text-orange-400'
  }

  const sentimentBg = {
    positive: 'bg-emerald-500/20',
    neutral: 'bg-blue-500/20',
    negative: 'bg-orange-500/20'
  }

  return (
    <Link href={`/article/${article.id}`}>
      <div className="glass group rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-secondary">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-xs font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground px-2.5 py-1 rounded-full">
              {article.category}
            </span>
            <span className={`text-xs font-bold ${sentimentBg[article.sentiment]} ${sentimentColors[article.sentiment]} px-2.5 py-1 rounded-full backdrop-blur-sm`}>
              {article.sentiment}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur px-2 py-1 rounded-lg">
            <span className="text-xs font-medium text-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              AI Summary
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Title */}
          <h3 className="font-bold text-foreground mb-2 line-clamp-2 leading-tight text-sm md:text-base group-hover:text-primary transition">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
            {article.summary}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 border-t border-border/50 pt-3">
            <div className="flex gap-2">
              <span className="font-medium">{article.source}</span>
              <span>•</span>
              <span>{article.timestamp}</span>
            </div>
            <span className="font-medium">{article.readTime}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 h-8 text-xs gap-1 glass hover:bg-white/10 transition group/btn"
              onClick={(e) => e.preventDefault()}
            >
              <MessageCircle className="w-3.5 h-3.5 group-hover/btn:text-primary transition" />
              Ask AI
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 glass hover:bg-white/10 transition"
              onClick={(e) => {
                e.preventDefault()
                setIsBookmarked(!isBookmarked)
              }}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-primary text-primary' : ''} transition`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 glass hover:bg-white/10 transition"
              onClick={(e) => e.preventDefault()}
            >
              <Share2 className="w-3.5 h-3.5 hover:text-primary transition" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
