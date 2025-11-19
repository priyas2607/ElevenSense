'use client'

export interface ArticleContentProps {
  content: string
}

export function ArticleContent({ content }: ArticleContentProps) {
  const paragraphs = content
    .split('\n')
    .filter(p => p.trim().length > 0)
    .map((para, idx) => {
      const cleanPara = para.trim()
      
      if (cleanPara.endsWith(':')) {
        return (
          <h3 key={idx} className="text-xl font-semibold text-foreground mt-6 mb-3">
            {cleanPara.slice(0, -1)}
          </h3>
        )
      }

      if (cleanPara.startsWith('-')) {
        return (
          <li key={idx} className="text-foreground ml-4 list-disc">
            {cleanPara.slice(1).trim()}
          </li>
        )
      }

      return (
        <p key={idx} className="text-foreground leading-relaxed text-base mb-4">
          {cleanPara}
        </p>
      )
    })

  return (
    <article className="prose prose-invert max-w-none space-y-4">
      <ul className="space-y-2">
        {paragraphs}
      </ul>
    </article>
  )
}
