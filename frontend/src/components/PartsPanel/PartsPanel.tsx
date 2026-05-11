import { useGarageStore } from '../../store/useGarageStore'
import {
  PART_CATEGORIES,
  PART_CATEGORY_LABELS,
  type PartCategory,
} from '../../types'
import PartCard from './PartCard'
import PaintTab from './PaintTab'

const CATEGORY_ICONS: Record<PartCategory, string> = {
  body_kits:  '🔧',
  wheels:     '⚙',
  suspension: '📐',
  exhaust:    '💨',
  spoilers:   '🏁',
  paint:      '🎨',
  lights:     '💡',
  engine_bay: '🔩',
}

export default function PartsPanel() {
  const {
    partsPanelOpen,
    togglePartsPanel,
    activePartCategory,
    setActivePartCategory,
    parts,
    partsLoading,
    selectedCar,
  } = useGarageStore()

  const filteredParts = parts.filter((p) => p.category === activePartCategory)

  return (
    <div
      className={`flex flex-col panel-glass shadow-panel transition-all duration-300 ${
        partsPanelOpen ? 'w-72' : 'w-10'
      } h-full flex-shrink-0 relative overflow-hidden`}
    >
      {/* Collapse toggle */}
      <button
        onClick={togglePartsPanel}
        className="absolute top-3 right-2 z-20 w-6 h-6 flex items-center justify-center text-shop-dim hover:text-shop-yellow transition-colors"
        title={partsPanelOpen ? 'Collapse panel' : 'Expand panel'}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={partsPanelOpen ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
          />
        </svg>
      </button>

      {partsPanelOpen && (
        <>
          {/* Panel header */}
          <div className="p-3 border-b border-shop-border flex-shrink-0">
            <div className="caution-border mb-2" />
            <div className="shop-header text-shop-yellow text-sm tracking-widest">
              PARTS & MODS
            </div>
            {selectedCar && (
              <div className="shop-mono text-shop-dim text-xs mt-0.5">
                {selectedCar.make} {selectedCar.model}
              </div>
            )}
          </div>

          {/* Category tabs — vertical */}
          <div className="flex flex-col border-b border-shop-border flex-shrink-0">
            <div className="overflow-x-auto flex flex-row" style={{ scrollbarWidth: 'none' }}>
              {PART_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivePartCategory(cat)}
                  className={`flex-shrink-0 px-3 py-2.5 text-xs outline-none transition-all ${
                    activePartCategory === cat ? 'tab-active' : 'tab-inactive'
                  }`}
                  title={PART_CATEGORY_LABELS[cat]}
                >
                  <span className="mr-1.5">{CATEGORY_ICONS[cat]}</span>
                  <span className="shop-header">
                    {PART_CATEGORY_LABELS[cat].split('&')[0].trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Parts list or paint tab */}
          <div className="flex-1 overflow-y-auto">
            {activePartCategory === 'paint' ? (
              <PaintTab />
            ) : partsLoading ? (
              <div className="p-3 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-sm shimmer" />
                ))}
              </div>
            ) : filteredParts.length === 0 ? (
              <div className="p-4 text-center">
                <div className="shop-mono text-shop-dim text-xs">
                  No parts found for this category
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-1.5">
                {filteredParts.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Collapsed label */}
      {!partsPanelOpen && (
        <div className="flex-1 flex items-center justify-center">
          <div
            className="shop-header text-shop-dim text-xs tracking-widest"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            PARTS
          </div>
        </div>
      )}
    </div>
  )
}
