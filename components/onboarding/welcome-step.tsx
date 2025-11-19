import { Sparkles } from 'lucide-react'

export function WelcomeStep() {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold text-foreground">Welcome to ElevenSense</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          We'll help you set up your personalized news experience in just a few steps. Let's get started!
        </p>
      </div>

      <div className="space-y-3 text-left bg-card rounded-xl p-6 border border-border/50">
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
          <p className="text-foreground">Personalized news summaries tailored to your interests</p>
        </div>
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
          <p className="text-foreground">AI-powered chat to dig deeper into any story</p>
        </div>
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
          <p className="text-foreground">Bookmark your favorite articles for later</p>
        </div>
        <div className="flex gap-3">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
          <p className="text-foreground">Real-time notifications for breaking news</p>
        </div>
      </div>
    </div>
  )
}
