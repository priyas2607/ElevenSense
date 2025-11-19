'use client'

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { NewsFeed } from '@/components/feed/news-feed'
import { FeedControls } from '@/components/feed/feed-controls'

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Technology', 'Business'])
  const [sortBy, setSortBy] = useState<'latest' | 'trending'>('latest')

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <FeedControls
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <NewsFeed
          categories={selectedCategories}
          sortBy={sortBy}
        />
      </div>
    </AppShell>
  )
}
