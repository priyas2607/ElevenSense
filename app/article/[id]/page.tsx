'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Bookmark, Share2, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArticleContent } from '@/components/article/article-content'
import { AIChatPanel } from '@/components/article/ai-chat-panel'
import { RelatedArticles } from '@/components/article/related-articles'
import { useState } from 'react'

const MOCK_ARTICLE = {
  id: 1,
  title: 'OpenAI Announces GPT-5: Revolutionary Breakthrough in AI Reasoning',
  subtitle: 'New model demonstrates significant improvements in problem-solving and knowledge synthesis',
  category: 'Technology',
  source: 'TechCrunch',
  author: 'Sarah Chen',
  publishedAt: '2 hours ago',
  readTime: '5 min read',
  image: '/ai-breakthrough-technology.jpg',
  content: `
OpenAI has unveiled GPT-5, its most advanced language model to date, featuring revolutionary improvements in reasoning capabilities and multimodal processing.

Key Features:
- Enhanced reasoning with step-by-step problem solving
- Improved multimodal understanding combining text, images, and audio
- Extended context window supporting up to 500K tokens
- Faster inference speeds and reduced latency

The company demonstrated GPT-5's capabilities across multiple domains including scientific research, code generation, and creative writing. In preliminary tests, the model showed remarkable improvement in complex mathematical reasoning and abstract problem-solving tasks.

Industry Impact:
This release marks a significant milestone in artificial intelligence development. According to OpenAI's technical report, GPT-5 achieves new benchmarks in numerous evaluation metrics, particularly in areas requiring deep reasoning and knowledge synthesis.

Availability and Pricing:
GPT-5 will be available to API users on a tiered basis starting next month. OpenAI plans to gradually roll out access to ensure system stability while monitoring real-world usage patterns.

The announcement has sent ripples through the tech industry, with competitors and researchers praising the technical achievements while raising questions about the societal implications of increasingly capable AI systems.
  `,
  sentiment: 'positive',
  views: 15420,
  likes: 2340,
  shares: 580
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.share({
        title: MOCK_ARTICLE.title,
        text: MOCK_ARTICLE.subtitle,
        url: window.location.href,
      })
    } catch (err) {
      console.log('Share failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        {/* Article */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
            <img
              src={MOCK_ARTICLE.image || "/placeholder.svg"}
              alt={MOCK_ARTICLE.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-primary/20 text-primary px-3 py-1 rounded-full">
                {MOCK_ARTICLE.category}
              </span>
              <span className="text-xs text-muted-foreground">{MOCK_ARTICLE.readTime}</span>
            </div>

            <h1 className="text-4xl font-bold text-foreground leading-tight">
              {MOCK_ARTICLE.title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {MOCK_ARTICLE.subtitle}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-4">
              <div>
                <p className="font-medium text-foreground">{MOCK_ARTICLE.author}</p>
                <p>{MOCK_ARTICLE.source}</p>
              </div>
              <div className="ml-auto text-right">
                <p>{MOCK_ARTICLE.publishedAt}</p>
              </div>
            </div>

            {/* Engagement Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setLiked(!liked)}
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked' : 'Like'} ({MOCK_ARTICLE.likes + (liked ? 1 : 0)})
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowChat(true)}
              >
                Ask AI
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <ArticleContent content={MOCK_ARTICLE.content} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {['AI', 'GPT-5', 'OpenAI', 'Machine Learning', 'Technology'].map(tag => (
              <a
                key={tag}
                href={`/search?q=${tag}`}
                className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-primary/20 text-foreground transition"
              >
                #{tag}
              </a>
            ))}
          </div>

          {/* Related Articles */}
          <div className="pt-8 border-t border-border">
            <RelatedArticles currentArticleId={MOCK_ARTICLE.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {showChat ? (
            <AIChatPanel articleTitle={MOCK_ARTICLE.title} />
          ) : (
            <div className="sticky top-24 space-y-4">
              <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                <h3 className="font-semibold text-foreground">Article Summary</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {MOCK_ARTICLE.subtitle}
                </p>
                <Button
                  className="w-full"
                  onClick={() => setShowChat(true)}
                >
                  Ask Questions
                </Button>
              </div>

              <div className="bg-accent/10 rounded-xl p-6 border border-accent/20 space-y-3">
                <h3 className="font-semibold text-foreground">Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views</span>
                    <span className="font-medium text-foreground">{MOCK_ARTICLE.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes</span>
                    <span className="font-medium text-foreground">{MOCK_ARTICLE.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shares</span>
                    <span className="font-medium text-foreground">{MOCK_ARTICLE.shares.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
