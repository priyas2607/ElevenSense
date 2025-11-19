'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Brain, Lock, Sparkles, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000" />
      </div>

      {/* Navigation */}
      <header className="relative border-b border-border/30 backdrop-blur-md glass sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ElevenSense</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition duration-300">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition duration-300">How it works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition duration-300">Pricing</a>
          </div>
          <Link href="/onboarding">
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all">Get Started</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-block glass px-4 py-2 rounded-full text-sm text-accent">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by Advanced AI
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance text-foreground leading-tight">
            News <span className="gradient-text">Reimagined</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Get AI-powered summaries of the latest news, personalized to your interests. Stay informed faster with ElevenSense.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/onboarding">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 transition-all">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glass hover:bg-white/10 transition">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Hero Visual - Animated card stack */}
        <div className="relative mt-16 h-80 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-2xl opacity-30" />
          <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
            <div className="relative h-full flex items-center justify-center p-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground">Premium News Feed Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16">Why Choose ElevenSense?</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: 'AI-Powered Summaries',
              description: 'Advanced AI instantly converts lengthy articles into concise, actionable summaries.'
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Get summaries in seconds. Stay ahead of the news cycle with real-time updates.'
            },
            {
              icon: Lock,
              title: 'Privacy First',
              description: 'Your data is encrypted and never shared. Complete control over your preferences.'
            },
          ].map((feature, index) => (
            <div key={index} className="group glass p-8 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16">How It Works</h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Select Topics', description: 'Choose your favorite news categories', icon: Brain },
            { step: '02', title: 'Get Summaries', description: 'Receive AI-generated article summaries', icon: BarChart3 },
            { step: '03', title: 'Ask Questions', description: 'Chat with AI to learn more about any story', icon: Sparkles },
            { step: '04', title: 'Save & Share', description: 'Bookmark articles and share insights', icon: Lock },
          ].map((item, index) => (
            <div key={index} className="glass p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all space-y-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-lg text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="glass p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Transform Your News Experience?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users staying informed with ElevenSense AI
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 transition-all">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/30 bg-background/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-muted-foreground text-sm">© 2025 ElevenSense. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
