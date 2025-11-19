'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedArticlesProps {
  currentArticleId: number
}

const RELATED = [
  {
    id: 2,
    title: 'Understanding AI Model Architecture: A Deep Dive',
    source: 'AI Research Blog',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Comparing GPT-5 with Competitors: What Sets It Apart',
    source: 'Tech Analysis',
    readTime: '4 min read'
  },
  {
    id: 4,
    title: 'The Future of AI: What Experts Predict',
    source: 'Innovation Today',
    readTime: '6 min read'
  }
]

export function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Related Articles</h3>
      <div className="grid gap-3">
        {RELATED.map(article => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="p-4 rounded-lg border border-border hover:border-primary bg-card hover:bg-secondary/50 transition group"
          >
            <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition line-clamp-2 mb-2">
              {article.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-2">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
