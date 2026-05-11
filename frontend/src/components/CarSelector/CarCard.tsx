import type { Car } from '../../types'
import { useGarageStore } from '../../store/useGarageStore'

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const { selectedCar, selectCar } = useGarageStore()
  const isActive = selectedCar?.id === car.id

  return (
    <button
      onClick={() => selectCar(car)}
      className={`car-stall rounded-sm p-3 text-left outline-none ${isActive ? 'car-stall-active' : ''}`}
    >
      {/* Thumbnail placeholder / image */}
      <div className="w-full h-20 mb-2 flex items-center justify-center bg-shop-dark rounded-sm overflow-hidden">
        {car.thumbnailUrl ? (
          <img
            src={car.thumbnailUrl}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <svg viewBox="0 0 80 40" className="w-16 h-8 opacity-30">
            <rect x="5" y="18" width="70" height="14" rx="2" fill="currentColor"/>
            <rect x="15" y="8" width="50" height="14" rx="2" fill="currentColor"/>
            <circle cx="18" cy="34" r="7" fill="currentColor"/>
            <circle cx="62" cy="34" r="7" fill="currentColor"/>
          </svg>
        )}
      </div>

      <div className={`shop-header text-xs leading-tight ${isActive ? 'text-shop-yellow' : 'text-shop-white'}`}>
        {car.make}
      </div>
      <div className={`shop-header text-sm leading-tight ${isActive ? 'text-shop-yellow' : 'text-shop-white'}`}>
        {car.model}
      </div>
      <div className="shop-mono text-shop-dim text-xs mt-0.5">{car.year}</div>

      {isActive && (
        <div className="mt-1.5 w-full h-0.5 bg-shop-yellow rounded-full" />
      )}
    </button>
  )
}
