'use client'

import { useState, useRef, useEffect } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import { Send, Plus, Trash2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Understanding GPT-5',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m ElevenSense AI. Ask me anything about the latest news, AI breakthroughs, or any topic that interests you.',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }
  ])

  const [activeConversationId, setActiveConversationId] = useState('1')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  const handleSendMessage = async () => {
    if (!input.trim() || !activeConversation) return

    const userMessage: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    )
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That\'s an insightful question! Based on recent developments, I can provide you with some interesting insights.',
        'Great question! Let me break this down for you. The key aspects to understand are...',
        'This is a fascinating topic in today\'s news landscape. Here\'s what I found that\'s relevant...',
        'That connects to several recent news stories. The most relevant one is about how AI is transforming various industries.',
      ]

      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, assistantMessage] }
            : conv
        )
      )
      setIsLoading(false)
    }, 500)
  }

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Math.random().toString(),
      title: 'New Conversation',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Hi! What would you like to discuss today?',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }

    setConversations(prev => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
  }

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeConversationId === id && conversations.length > 1) {
      const remaining = conversations.filter(c => c.id !== id)
      setActiveConversationId(remaining[0].id)
    }
  }

  return (
    <AppShell>
      <div className="flex h-full gap-6 p-6">
        {/* Sidebar */}
        <div className="w-64 bg-card rounded-xl border border-border p-4 flex flex-col hidden lg:flex overflow-hidden">
          <Button
            onClick={createNewConversation}
            className="w-full gap-2 mb-4"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`p-3 rounded-lg cursor-pointer transition group ${
                  activeConversationId === conv.id
                    ? 'bg-primary/20 border border-primary'
                    : 'border border-border hover:bg-secondary'
                }`}
                onClick={() => setActiveConversationId(conv.id)}
              >
                <p className="text-sm font-medium text-foreground truncate mb-1">
                  {conv.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {conv.messages.length} messages
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conv.id)
                  }}
                  className="mt-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-card rounded-xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {activeConversation?.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {activeConversation?.messages.length || 0} messages
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeConversation?.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-2xl p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground border border-border'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground p-4 rounded-lg border border-border">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about any news story or topic..."
                className="flex-1 bg-secondary text-foreground placeholder-muted-foreground rounded-lg px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">Quick topics:</p>
              <div className="flex flex-wrap gap-2">
                {['AI breakthroughs', 'Stock market', 'Climate news', 'Tech industry'].map(topic => (
                  <button
                    key={topic}
                    onClick={() => {
                      setInput(topic)
                    }}
                    className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-primary/20 text-foreground transition"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
