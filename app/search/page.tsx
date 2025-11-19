'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { NewsCard } from '@/components/feed/news-card'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ALL_ARTICLES = [
  {
    id: 1,
    title: 'OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning',
    summary: 'OpenAI has unveiled GPT-5, featuring enhanced reasoning capabilities and multimodal processing.',
    category: 'Technology',
    source: 'TechCrunch',
    timestamp: '2 hours ago',
    image: '/ai-breakthrough-technology.jpg',
    readTime: '3 min read',
    sentiment: 'positive' as const,
    views: 15420
  },
  {
    id: 2,
    title: 'Stock Market Reaches Historic High as Tech Stocks Rally',
    summary: 'Major indices climbed to record levels driven by strong earnings reports from technology companies.',
    category: 'Business',
    source: 'Bloomberg',
    timestamp: '3 hours ago',
    image: '/stock-market-trading.jpg',
    readTime: '4 min read',
    sentiment: 'positive' as const,
    views: 8932
  },
  {
    id: 3,
    title: 'Scientists Discover New Method for Carbon Capture at Scale',
    summary: 'Researchers have developed a breakthrough technique for capturing atmospheric carbon dioxide.',
    category: 'Science',
    source: 'Nature',
    timestamp: '4 hours ago',
    image: '/carbon-capture-climate.jpg',
    readTime: '5 min read',
    sentiment: 'positive' as const,
    views: 12540
  },
  {
    id: 4,
    title: 'New AI Model Shows Promise in Early Cancer Detection',
    summary: 'A new AI system shows remarkable accuracy in detecting early-stage cancers.',
    category: 'Health',
    source: 'Medical Daily',
    timestamp: '5 hours ago',
    image: '/medical-ai-diagnosis.jpg',
    readTime: '3 min read',
    sentiment: 'positive' as const,
    views: 19870
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState(ALL_ARTICLES)

  useEffect(() => {
    if (!query.trim()) {
      setResults(ALL_ARTICLES)
      return
    }

    const filtered = ALL_ARTICLES.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase()) ||
      article.source.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query])

  return (
    <AppShell>
      <div className="space-y-6 p-6">
        {/* Search Bar */}
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Search Articles</h1>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, topic, or source..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            {query && `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
            {!query && 'Start typing to search articles'}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">No articles found</p>
              <p className="text-muted-foreground max-w-sm">
                Try adjusting your search terms or browse different categories
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
