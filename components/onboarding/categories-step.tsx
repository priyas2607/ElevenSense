import { Button } from '@/components/ui/button'

const CATEGORIES = [
  'Technology',
  'Business',
  'Science',
  'Health',
  'Sports',
  'Entertainment',
  'Politics',
  'World News',
  'Finance',
  'Lifestyle',
  'Climate',
  'AI & ML'
]

interface CategoriesStepProps {
  selected: string[]
  onChange: (categories: string[]) => void
}

export function CategoriesStep({ selected, onChange }: CategoriesStepProps) {
  const toggleCategory = (category: string) => {
    if (selected.includes(category)) {
      onChange(selected.filter(c => c !== category))
    } else {
      onChange([...selected, category])
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Select Your Interests</h2>
        <p className="text-muted-foreground">Choose at least one category to get started</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`p-4 rounded-lg border-2 font-medium transition-all ${
              selected.includes(category)
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background text-foreground hover:border-primary/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-foreground">
          You've selected <span className="font-semibold">{selected.length}</span> categor{selected.length === 1 ? 'y' : 'ies'}
        </p>
      </div>
    </div>
  )
}
