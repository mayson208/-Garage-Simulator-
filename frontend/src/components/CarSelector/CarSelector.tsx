import { useRef } from 'react'
import { useGarageStore } from '../../store/useGarageStore'
import CarCard from './CarCard'

export default function CarSelector() {
  const { cars, carsLoading } = useGarageStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 180, behavior: 'smooth' })
  }

  return (
    <div className="relative flex items-center bg-shop-dark border-t border-shop-border">
      {/* Caution stripe top */}
      <div className="absolute top-0 left-0 right-0 h-1 caution-border opacity-60" />

      {/* Scroll left */}
      <button
        onClick={() => scroll(-1)}
        className="flex-shrink-0 w-8 h-full flex items-center justify-center text-shop-dim hover:text-shop-yellow transition-colors z-10 bg-shop-dark"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Cars row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide flex-1 p-2 pt-3"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {carsLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="car-stall rounded-sm p-3 shimmer h-[118px]" />
            ))
          : cars.map((car) => <CarCard key={car.id} car={car} />)
        }
      </div>

      {/* Scroll right */}
      <button
        onClick={() => scroll(1)}
        className="flex-shrink-0 w-8 h-full flex items-center justify-center text-shop-dim hover:text-shop-yellow transition-colors z-10 bg-shop-dark"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Section label */}
      <div className="absolute top-3 right-12 shop-header text-shop-dim text-xs tracking-widest opacity-50">
        SELECT VEHICLE
      </div>
    </div>
  )
}
