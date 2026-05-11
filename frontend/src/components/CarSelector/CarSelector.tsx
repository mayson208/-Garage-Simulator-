import { useRef, useState } from 'react'
import { useGarageStore } from '../../store/useGarageStore'
import type { CarCulture } from '../../types'
import CarCard from './CarCard'

const CULTURE_TABS: { key: CarCulture | 'All'; label: string }[] = [
  { key: 'All',    label: 'ALL' },
  { key: 'JDM',   label: 'JDM' },
  { key: 'Euro',  label: 'EURO' },
  { key: 'Muscle',label: 'MUSCLE' },
]

export default function CarSelector() {
  const { cars, carsLoading } = useGarageStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [culture, setCulture] = useState<CarCulture | 'All'>('All')

  const filtered = culture === 'All' ? cars : cars.filter(c => c.culture === culture)

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 180, behavior: 'smooth' })
  }

  return (
    <div className="relative flex flex-col bg-shop-dark border-t border-shop-border h-full">
      {/* Caution stripe top */}
      <div className="absolute top-0 left-0 right-0 h-1 caution-border opacity-60" />

      {/* Culture tab strip */}
      <div className="flex items-center gap-0 px-8 pt-1 flex-shrink-0 border-b border-shop-border/50">
        {CULTURE_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setCulture(tab.key); scrollRef.current?.scrollTo({ left: 0 }) }}
            className={`px-3 py-1 shop-header text-xs tracking-widest transition-colors border-b-2 ${
              culture === tab.key
                ? 'border-shop-yellow text-shop-yellow'
                : 'border-transparent text-shop-dim hover:text-shop-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto shop-header text-shop-dim text-xs tracking-widest opacity-40 pr-2">
          SELECT VEHICLE
        </div>
      </div>

      {/* Cars row */}
      <div className="relative flex items-center flex-1 overflow-hidden">
        <button
          onClick={() => scroll(-1)}
          className="flex-shrink-0 w-8 h-full flex items-center justify-center text-shop-dim hover:text-shop-yellow transition-colors z-10 bg-shop-dark"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto flex-1 p-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {carsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="car-stall rounded-sm p-3 shimmer h-[80px] w-[130px] flex-shrink-0" />
              ))
            : filtered.map((car) => <CarCard key={car.id} car={car} />)
          }
          {!carsLoading && filtered.length === 0 && (
            <div className="flex items-center justify-center flex-1 shop-mono text-shop-dim text-xs opacity-50">
              No {culture} cars yet
            </div>
          )}
        </div>

        <button
          onClick={() => scroll(1)}
          className="flex-shrink-0 w-8 h-full flex items-center justify-center text-shop-dim hover:text-shop-yellow transition-colors z-10 bg-shop-dark"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
