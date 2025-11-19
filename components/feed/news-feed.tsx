'use client'

import { NewsCard } from './news-card'
import { useEffect, useState } from 'react'

const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning',
    summary: 'OpenAI has unveiled GPT-5, featuring enhanced reasoning capabilities and multimodal processing. The model demonstrates significant improvements in problem-solving and knowledge synthesis.',
    category: 'Technology',
    source: 'TechCrunch',
    timestamp: '2 hours ago',
    image: '/ai-breakthrough-technology.jpg',
    readTime: '3 min read',
    sentiment: 'positive',
    views: 15420
  },
  {
    id: 2,
    title: 'Stock Market Reaches Historic High as Tech Stocks Rally',
    summary: 'Major indices climbed to record levels today, driven by strong earnings reports from technology companies and optimistic economic outlook for Q4.',
    category: 'Business',
    source: 'Bloomberg',
    timestamp: '3 hours ago',
    image: '/stock-market-trading.jpg',
    readTime: '4 min read',
    sentiment: 'positive',
    views: 8932
  },
  {
    id: 3,
    title: 'Scientists Discover New Method for Carbon Capture at Scale',
    summary: 'Researchers at MIT have developed a breakthrough technique for capturing atmospheric carbon dioxide, potentially accelerating climate change mitigation efforts.',
    category: 'Science',
    source: 'Nature',
    timestamp: '4 hours ago',
    image: '/carbon-capture-climate.jpg',
    readTime: '5 min read',
    sentiment: 'positive',
    views: 12540
  },
  {
    id: 4,
    title: 'New AI Model Shows Promise in Early Cancer Detection',
    summary: 'A new AI system trained on millions of medical images has shown remarkable accuracy in detecting early-stage cancers, potentially saving lives through earlier intervention.',
    category: 'Health',
    source: 'Medical Daily',
    timestamp: '5 hours ago',
    image: '/medical-ai-diagnosis.jpg',
    readTime: '3 min read',
    sentiment: 'positive',
    views: 19870
  },
  {
    id: 5,
    title: 'Major Sports League Announces Expansion with New Teams',
    summary: 'The professional sports league has approved expansion plans for three new franchises, marking the largest growth initiative in the league\'s history.',
    category: 'Sports',
    source: 'ESPN',
    timestamp: '6 hours ago',
    image: '/sports-league-expansion.jpg',
    readTime: '2 min read',
    sentiment: 'neutral',
    views: 6234
  },
  {
    id: 6,
    title: 'Blockbuster Film Breaks Box Office Records',
    summary: 'The highly anticipated film shatters opening weekend expectations, becoming the highest-grossing debut of the year and dominating global markets.',
    category: 'Entertainment',
    source: 'Variety',
    timestamp: '7 hours ago',
    image: '/movie-cinema-film.jpg',
    readTime: '3 min read',
    sentiment: 'positive',
    views: 21560
  },
]

interface NewsFeedProps {
  categories: string[]
  sortBy: 'latest' | 'trending'
}

export function NewsFeed({ categories, sortBy }: NewsFeedProps) {
  const [articles, setArticles] = useState(MOCK_ARTICLES)

  useEffect(() => {
    let filtered = MOCK_ARTICLES.filter(article =>
      categories.length === 0 || categories.includes(article.category)
    )

    if (sortBy === 'trending') {
      filtered = filtered.sort((a, b) => b.views - a.views)
    }

    setArticles(filtered)
  }, [categories, sortBy])

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 auto-rows-max">
        {articles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">No articles found</p>
              <p className="text-muted-foreground">Try selecting different categories</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { Sparkles } from 'lucide-react'
