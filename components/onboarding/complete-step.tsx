import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export function CompleteStep() {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl font-bold text-foreground">You're All Set!</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Your personalized news dashboard is ready. Let's explore some amazing stories tailored just for you.
        </p>
      </div>

      <Link href="/home" className="block">
        <Button size="lg" className="w-full">
          Go to Dashboard
        </Button>
      </Link>

      <p className="text-sm text-muted-foreground">
        You can customize these settings anytime in your profile
      </p>
    </div>
  )
}
