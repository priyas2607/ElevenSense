'use client'

interface BookmarksSidebarProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

const CATEGORIES = [
  { name: 'All', count: 3 },
  { name: 'Technology', count: 1 },
  { name: 'Business', count: 1 },
  { name: 'Science', count: 1 },
]

export function BookmarksSidebar({
  selectedCategory,
  onSelectCategory
}: BookmarksSidebarProps) {
  return (
    <div className="w-48 space-y-2 hidden lg:block">
      <h3 className="font-semibold text-foreground mb-4">Categories</h3>
      {CATEGORIES.map(category => (
        <button
          key={category.name}
          onClick={() => onSelectCategory(category.name === 'All' ? null : category.name)}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            selectedCategory === (category.name === 'All' ? null : category.name)
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <span className="flex items-center justify-between">
            <span>{category.name}</span>
            <span className="text-xs opacity-70">({category.count})</span>
          </span>
        </button>
      ))}
    </div>
  )
}
