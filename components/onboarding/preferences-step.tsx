import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface PreferencesStepProps {
  preferences: {
    summaryLength: string
    updateFrequency: string
    notifications: boolean
  }
  onChange: (preferences: any) => void
}

export function PreferencesStep({
  preferences,
  onChange
}: PreferencesStepProps) {
  const handleToggle = (key: string, value: any) => {
    onChange({ ...preferences, [key]: value })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Customize Your Experience</h2>
        <p className="text-muted-foreground">Fine-tune your preferences</p>
      </div>

      {/* Summary Length */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Summary Length</h3>
        <div className="space-y-2">
          {['short', 'medium', 'long'].map((length) => (
            <button
              key={length}
              onClick={() => handleToggle('summaryLength', length)}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 font-medium transition-all ${
                preferences.summaryLength === length
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {preferences.summaryLength === length && (
                <Check className="w-4 h-4" />
              )}
              <span className="capitalize">{length} ({length === 'short' ? '1-2 min' : length === 'medium' ? '2-3 min' : '3-5 min'} read)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Update Frequency */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Update Frequency</h3>
        <div className="space-y-2">
          {['realtime', 'hourly', 'daily'].map((freq) => (
            <button
              key={freq}
              onClick={() => handleToggle('updateFrequency', freq)}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 font-medium transition-all ${
                preferences.updateFrequency === freq
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {preferences.updateFrequency === freq && (
                <Check className="w-4 h-4" />
              )}
              <span className="capitalize">{freq}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
        <div>
          <h3 className="font-semibold text-foreground">Breaking News Alerts</h3>
          <p className="text-sm text-muted-foreground">Get notified about breaking news</p>
        </div>
        <button
          onClick={() => handleToggle('notifications', !preferences.notifications)}
          className={`w-12 h-6 rounded-full transition-all ${
            preferences.notifications ? 'bg-primary' : 'bg-muted'
          } relative`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute transition-all ${
              preferences.notifications ? 'right-0.5' : 'left-0.5'
            } top-0.5`}
          />
        </button>
      </div>
    </div>
  )
}
