'use client'

import { useState } from 'react'
import { Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AIChatPanelProps {
  articleTitle: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AIChatPanel({ articleTitle }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm ElevenSense AI. I can help you dive deeper into this article about "${articleTitle}". Ask me anything!`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: 'assistant',
        content: `That's a great question about the article! Based on the content, I can tell you that this is related to the key developments in AI technology. The article highlights several important aspects that demonstrate how this field is evolving rapidly.

Would you like to know more about any specific aspect of the article?`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="fixed lg:sticky bottom-0 lg:bottom-auto right-0 lg:right-auto left-0 lg:left-auto lg:top-24 w-full lg:w-auto bg-card border border-border rounded-t-xl lg:rounded-xl h-96 lg:h-auto flex flex-col max-w-md shadow-2xl lg:shadow-lg z-50 lg:z-10">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Ask AI</h3>
          <p className="text-xs text-muted-foreground">About this article</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => window.history.back()}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-1 opacity-70`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-foreground p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about this article..."
            className="flex-1 bg-secondary text-foreground placeholder-muted-foreground rounded-lg px-3 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
