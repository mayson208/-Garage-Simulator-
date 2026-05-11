import type { Part, PartCategory } from '../../types'
import { useGarageStore } from '../../store/useGarageStore'

interface PartCardProps {
  part: Part
}

export default function PartCard({ part }: PartCardProps) {
  const { selectedParts, selectPart } = useGarageStore()
  const isSelected = selectedParts[part.category as PartCategory]?.id === part.id

  const toggle = () => {
    selectPart(part.category as PartCategory, isSelected ? null : part)
  }

  return (
    <button
      onClick={toggle}
      className={`part-card w-full rounded-sm p-3 text-left outline-none ${isSelected ? 'part-card-selected' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-14 h-14 bg-shop-dark rounded-sm flex items-center justify-center overflow-hidden">
          {part.thumbnailUrl ? (
            <img
              src={part.thumbnailUrl}
              alt={part.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <div className="w-6 h-6 border border-shop-gun rounded-sm opacity-40" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="shop-header text-shop-white text-xs leading-snug truncate">
            {part.name}
          </div>
          <div className="shop-mono text-shop-dim text-xs mt-0.5 truncate">
            {part.brand}
          </div>
          {part.priceMsrp && (
            <div className={`shop-mono text-xs mt-1 ${isSelected ? 'text-shop-yellow' : 'text-shop-dim'}`}>
              ${part.priceMsrp.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </div>
          )}
        </div>

        {/* Selected check */}
        {isSelected && (
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-shop-yellow flex items-center justify-center">
            <svg className="w-3 h-3 text-shop-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {part.description && (
        <p className="text-shop-dim text-xs mt-2 leading-relaxed line-clamp-2 opacity-70">
          {part.description}
        </p>
      )}
    </button>
  )
}
