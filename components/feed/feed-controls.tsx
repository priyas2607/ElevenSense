'use client'

import { ChevronDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const CATEGORIES = [
  'Technology', 'Business', 'Science', 'Health',
  'Sports', 'Entertainment', 'Politics', 'World News'
]

interface FeedControlsProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  sortBy: 'latest' | 'trending'
  onSortChange: (sort: 'latest' | 'trending') => void
}

export function FeedControls({
  selectedCategories,
  onCategoriesChange,
  sortBy,
  onSortChange
}: FeedControlsProps) {
  const [showCategories, setShowCategories] = useState(false)

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  return (
    <div className="border-b border-border/30 glass sticky top-0 z-40">
      <div className="px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Feed</h2>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'latest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange('latest')}
              className={sortBy === 'latest' ? 'bg-gradient-to-r from-primary to-accent' : 'glass'}
            >
              Latest
            </Button>
            <Button
              variant={sortBy === 'trending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange('trending')}
              className={sortBy === 'trending' ? 'bg-gradient-to-r from-primary to-accent' : 'glass'}
            >
              Trending
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCategories(!showCategories)}
            className="gap-2 glass hover:bg-white/10 transition"
          >
            <Filter className="w-4 h-4" />
            Categories ({selectedCategories.length})
            <ChevronDown className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
          </Button>

          {showCategories && (
            <div className="absolute top-full mt-2 left-0 glass border border-border/50 rounded-xl p-3 grid grid-cols-2 md:grid-cols-4 gap-2 w-80 shadow-xl z-50">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategories.includes(category)
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/50'
                      : 'bg-secondary/50 hover:bg-primary/20 text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
