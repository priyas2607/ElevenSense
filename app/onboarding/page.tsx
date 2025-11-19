'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Brain, Sparkles } from 'lucide-react'
import { WelcomeStep } from '@/components/onboarding/welcome-step'
import { CategoriesStep } from '@/components/onboarding/categories-step'
import { PreferencesStep } from '@/components/onboarding/preferences-step'
import { CompleteStep } from '@/components/onboarding/complete-step'

type OnboardingStep = 'welcome' | 'categories' | 'preferences' | 'complete'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [preferences, setPreferences] = useState({
    summaryLength: 'medium',
    updateFrequency: 'realtime',
    notifications: true
  })

  const steps = ['welcome', 'categories', 'preferences', 'complete'] as const

  const currentIndex = steps.indexOf(currentStep as any)
  const progress = ((currentIndex + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep === 'welcome') setCurrentStep('categories')
    else if (currentStep === 'categories') setCurrentStep('preferences')
    else if (currentStep === 'preferences') setCurrentStep('complete')
  }

  const handleBack = () => {
    if (currentStep === 'categories') setCurrentStep('welcome')
    else if (currentStep === 'preferences') setCurrentStep('categories')
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo */}
        <Link href="/" className="mb-12">
          <div className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ElevenSense</span>
          </div>
        </Link>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-12">
          <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Step {currentIndex + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="w-full max-w-2xl">
          {currentStep === 'welcome' && <WelcomeStep />}
          {currentStep === 'categories' && (
            <CategoriesStep
              selected={selectedCategories}
              onChange={setSelectedCategories}
            />
          )}
          {currentStep === 'preferences' && (
            <PreferencesStep
              preferences={preferences}
              onChange={setPreferences}
            />
          )}
          {currentStep === 'complete' && <CompleteStep />}
        </div>

        {/* Navigation */}
        {currentStep !== 'complete' && (
          <div className="w-full max-w-2xl flex gap-4 mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 'welcome'}
              className="gap-2 glass hover:bg-white/10 disabled:opacity-50 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition"
              disabled={currentStep === 'categories' && selectedCategories.length === 0}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
