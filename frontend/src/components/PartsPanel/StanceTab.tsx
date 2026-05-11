import { useGarageStore } from '../../store/useGarageStore'
import type { WheelSize } from '../../types'

const RIDE_HEIGHT_LABELS = ['STOCK', 'MILD', 'LOW', 'SLAMMED', 'SLAMMED+']

const WHEEL_SIZES: WheelSize[] = [17, 18, 19]

export default function StanceTab() {
  const { stanceConfig, setStanceConfig, wheelSize, setWheelSize } = useGarageStore()

  return (
    <div className="p-3 space-y-5">
      {/* ── Ride height ── */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="shop-header text-shop-dim text-xs tracking-widest">RIDE HEIGHT</div>
          <div className="shop-mono text-shop-yellow text-xs">
            {RIDE_HEIGHT_LABELS[stanceConfig.rideHeight]}
          </div>
        </div>

        {/* Step selector */}
        <div className="grid grid-cols-5 gap-1 mb-2">
          {[0, 1, 2, 3, 4].map(step => (
            <button
              key={step}
              onClick={() => setStanceConfig({ rideHeight: step })}
              className={`h-8 text-xs rounded-sm transition-all ${
                stanceConfig.rideHeight === step
                  ? 'bg-shop-yellow text-shop-black shop-header'
                  : 'border border-shop-border text-shop-dim hover:border-shop-gun shop-mono'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Car body side-profile visualizer */}
        <div className="mt-2 px-2 py-3 bg-shop-dark rounded-sm border border-shop-border flex items-end justify-center gap-0.5">
          {/* Car body silhouette */}
          <svg
            viewBox="0 0 120 50"
            className="w-full"
            style={{ maxHeight: '48px' }}
          >
            {/* Ground */}
            <line x1="0" y1="46" x2="120" y2="46" stroke="#3a3d42" strokeWidth="1" />
            {/* Car body — rises as ride height increases */}
            <rect
              x="10" y={14 + stanceConfig.rideHeight * 1.5}
              width="100" height="22"
              rx="3" fill="#2a2d32"
              style={{ transition: 'y 0.3s ease' }}
            />
            {/* Cabin */}
            <rect
              x="28" y={7 + stanceConfig.rideHeight * 1.5}
              width="64" height="14"
              rx="2" fill="#1f2124"
              style={{ transition: 'y 0.3s ease' }}
            />
            {/* Front wheel */}
            <circle cx="28" cy="42" r="6" fill="#111" stroke="#555" strokeWidth="1.5" />
            <circle cx="28" cy="42" r="3.5" fill="#555" />
            {/* Rear wheel */}
            <circle cx="92" cy="42" r="6" fill="#111" stroke="#555" strokeWidth="1.5" />
            <circle cx="92" cy="42" r="3.5" fill="#555" />
            {/* Wheel gap indicator */}
            <line
              x1="28" y1={36 + stanceConfig.rideHeight * 1.5}
              x2="28" y2="36"
              stroke="#f5c518"
              strokeWidth="1"
              strokeDasharray="2 2"
              style={{ transition: 'y1 0.3s ease' }}
            />
          </svg>
        </div>
      </div>

      {/* ── Camber ── */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <div className="shop-header text-shop-dim text-xs tracking-widest">CAMBER</div>
          <div className="shop-mono text-xs">
            <span className={stanceConfig.camber < 0 ? 'text-shop-yellow' : 'text-shop-white'}>
              {stanceConfig.camber > 0 ? '+' : ''}{stanceConfig.camber.toFixed(1)}°
            </span>
            <span className="text-shop-dim ml-1">
              {stanceConfig.camber < -3 ? 'STANCE' : stanceConfig.camber < -1 ? 'TRACK' : stanceConfig.camber === 0 ? 'STOCK' : 'POSITIVE'}
            </span>
          </div>
        </div>
        <input
          type="range" min="-5" max="5" step="0.5"
          value={stanceConfig.camber}
          onChange={e => setStanceConfig({ camber: parseFloat(e.target.value) })}
          className="w-full accent-shop-yellow h-1 cursor-pointer"
        />
        <div className="flex justify-between mt-0.5">
          <span className="shop-mono text-shop-dim" style={{ fontSize: '10px' }}>-5° STANCE</span>
          <span className="shop-mono text-shop-dim" style={{ fontSize: '10px' }}>STOCK</span>
          <span className="shop-mono text-shop-dim" style={{ fontSize: '10px' }}>+5°</span>
        </div>

        {/* Camber visualizer */}
        <div className="mt-2 flex items-center justify-center gap-4 py-2">
          {/* Left wheel */}
          <svg viewBox="0 0 28 44" className="w-7 h-11">
            <g transform={`rotate(${stanceConfig.camber * 2}, 14, 38)`}>
              <rect x="9" y="6" width="10" height="36" rx="5" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
              <rect x="11" y="14" width="6" height="20" rx="2" fill="#555" />
            </g>
          </svg>
          <div className="shop-mono text-shop-dim text-xs">↔</div>
          {/* Right wheel */}
          <svg viewBox="0 0 28 44" className="w-7 h-11">
            <g transform={`rotate(${-stanceConfig.camber * 2}, 14, 38)`}>
              <rect x="9" y="6" width="10" height="36" rx="5" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
              <rect x="11" y="14" width="6" height="20" rx="2" fill="#555" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── Wheel size ── */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">WHEEL SIZE</div>
        <div className="grid grid-cols-3 gap-1.5">
          {WHEEL_SIZES.map(size => (
            <button
              key={size}
              onClick={() => setWheelSize(size)}
              className={`py-3 rounded-sm transition-all ${
                wheelSize === size
                  ? 'bg-shop-yellow text-shop-black shop-header text-sm'
                  : 'border border-shop-border text-shop-dim hover:border-shop-gun shop-mono text-sm'
              }`}
            >
              {size}"
            </button>
          ))}
        </div>
        <div className="mt-1.5 shop-mono text-shop-dim text-xs text-center opacity-60">
          {wheelSize === 17 ? '215/45' : wheelSize === 18 ? '225/40' : '235/35'}/R{wheelSize}
        </div>
      </div>

      {/* ── Reset stance ── */}
      <button
        onClick={() => {
          setStanceConfig({ rideHeight: 0, camber: 0 })
          setWheelSize(17)
        }}
        className="w-full btn-ghost text-xs py-2"
      >
        Reset to Stock
      </button>
    </div>
  )
}
