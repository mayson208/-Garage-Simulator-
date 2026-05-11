import { useState, useMemo } from 'react'
import { useGarageStore } from '../../store/useGarageStore'
import {
  PART_CATEGORIES,
  PART_CATEGORY_LABELS,
  type PartCategory,
  type Part,
} from '../../types'
import PartCard from './PartCard'
import PaintTab from './PaintTab'
import StanceTab from './StanceTab'
import DynoTab from './DynoTab'

const CATEGORY_ICONS: Record<PartCategory, string> = {
  body_kits:   '🔧',
  wheels:      '⚙',
  suspension:  '📐',
  exhaust:     '💨',
  spoilers:    '🏁',
  paint:       '🎨',
  lights:      '💡',
  engine_bay:  '🔩',
  stance:      '📏',
  performance: '⚡',
}

function uniqueBrands(parts: Part[]): string[] {
  return [...new Set(parts.map(p => p.brand))].sort()
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
    selectedParts,
  } = useGarageStore()

  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<'all' | 'under1k' | '1k-3k' | 'over3k'>('all')

  const categoryParts = parts.filter(p => p.category === activePartCategory)
  const brands = useMemo(() => uniqueBrands(categoryParts), [categoryParts])

  const filteredParts = useMemo(() => {
    let list = categoryParts

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      )
    }
    if (brandFilter) {
      list = list.filter(p => p.brand === brandFilter)
    }
    if (priceFilter !== 'all') {
      list = list.filter(p => {
        const price = p.priceMsrp ?? 0
        if (priceFilter === 'under1k')  return price < 1000
        if (priceFilter === '1k-3k')    return price >= 1000 && price <= 3000
        if (priceFilter === 'over3k')   return price > 3000
        return true
      })
    }

    return list
  }, [categoryParts, search, brandFilter, priceFilter])

  const resetFilters = () => {
    setSearch('')
    setBrandFilter(null)
    setPriceFilter('all')
  }

  const hasActiveFilter = search || brandFilter || priceFilter !== 'all'
  const isPaint       = activePartCategory === 'paint'
  const isStance      = activePartCategory === 'stance'
  const isPerformance = activePartCategory === 'performance'

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
            <div className="shop-header text-shop-yellow text-sm tracking-widest">PARTS & MODS</div>
            {selectedCar && (
              <div className="shop-mono text-shop-dim text-xs mt-0.5">
                {selectedCar.make} {selectedCar.model}
              </div>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex-shrink-0 border-b border-shop-border">
            <div className="overflow-x-auto flex flex-row" style={{ scrollbarWidth: 'none' }}>
              {PART_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActivePartCategory(cat)
                    resetFilters()
                  }}
                  className={`flex-shrink-0 px-3 py-2.5 text-xs outline-none transition-all ${
                    activePartCategory === cat ? 'tab-active' : 'tab-inactive'
                  }`}
                  title={PART_CATEGORY_LABELS[cat]}
                >
                  <span className="mr-1">{CATEGORY_ICONS[cat]}</span>
                  <span className="shop-header">
                    {PART_CATEGORY_LABELS[cat].split('&')[0].trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search bar — hidden for paint/stance/performance tabs */}
          {!isPaint && !isStance && !isPerformance && (
            <div className="flex-shrink-0 px-2 pt-2 pb-1 border-b border-shop-border">
              <div className="relative">
                <svg
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shop-dim pointer-events-none"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search parts or brand..."
                  className="w-full bg-shop-dark border border-shop-border text-shop-white text-xs pl-7 pr-3 py-1.5 outline-none focus:border-shop-yellow shop-mono placeholder:text-shop-dim/50"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-shop-dim hover:text-shop-white"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {/* Brand filter */}
                {brands.length > 1 && (
                  <div className="relative group">
                    <button className={`filter-chip ${brandFilter ? 'filter-chip-active' : ''}`}>
                      {brandFilter ? `Brand: ${brandFilter.split(' ')[0]}` : 'Brand'} ▾
                    </button>
                    <div className="absolute left-0 top-full mt-1 z-30 bg-shop-panel border border-shop-border rounded-sm shadow-xl min-w-max hidden group-hover:block">
                      <button
                        onClick={() => setBrandFilter(null)}
                        className="block w-full text-left px-3 py-1.5 shop-mono text-xs text-shop-dim hover:text-shop-white hover:bg-shop-surface"
                      >
                        All Brands
                      </button>
                      {brands.map(b => (
                        <button
                          key={b}
                          onClick={() => setBrandFilter(b)}
                          className={`block w-full text-left px-3 py-1.5 shop-mono text-xs hover:bg-shop-surface ${
                            brandFilter === b ? 'text-shop-yellow' : 'text-shop-dim hover:text-shop-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price filter */}
                <button
                  onClick={() => setPriceFilter(
                    priceFilter === 'all' ? 'under1k' :
                    priceFilter === 'under1k' ? '1k-3k' :
                    priceFilter === '1k-3k' ? 'over3k' : 'all'
                  )}
                  className={`filter-chip ${priceFilter !== 'all' ? 'filter-chip-active' : ''}`}
                >
                  {priceFilter === 'all' ? 'Price' :
                   priceFilter === 'under1k' ? '<$1K' :
                   priceFilter === '1k-3k' ? '$1K–$3K' : '>$3K'}
                </button>

                {hasActiveFilter && (
                  <button onClick={resetFilters} className="filter-chip text-shop-red border-shop-red/40">
                    Clear ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            {isPaint ? (
              <PaintTab />
            ) : isStance ? (
              <StanceTab />
            ) : isPerformance ? (
              <DynoTab />
            ) : partsLoading ? (
              <div className="p-3 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-sm shimmer" />
                ))}
              </div>
            ) : filteredParts.length === 0 ? (
              <div className="p-4 text-center">
                <div className="shop-mono text-shop-dim text-xs">
                  {hasActiveFilter ? 'No parts match filters' : 'No parts for this category'}
                </div>
                {hasActiveFilter && (
                  <button onClick={resetFilters} className="mt-2 text-shop-yellow shop-mono text-xs underline">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="p-2 space-y-1.5">
                {/* Installed count hint */}
                {Object.values(selectedParts).some(Boolean) && (
                  <div className="px-1 mb-0.5">
                    <span className="shop-mono text-xs text-shop-dim">
                      {filteredParts.filter(p =>
                        selectedParts[p.category as PartCategory]?.id === p.id
                      ).length > 0 && (
                        <span className="text-shop-green">✓ Installed parts highlighted</span>
                      )}
                    </span>
                  </div>
                )}
                {filteredParts.map(part => (
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
