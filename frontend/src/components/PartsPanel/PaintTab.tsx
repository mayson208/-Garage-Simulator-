import { useGarageStore } from '../../store/useGarageStore'

const PRESETS = [
  { label: 'Midnight Blue',  color: '#1a1a2e', type: 'solid' as const },
  { label: 'Pearl White',    color: '#f0f0ee', type: 'solid' as const },
  { label: 'Racing Red',     color: '#c0392b', type: 'solid' as const },
  { label: 'JDM Orange',     color: '#e67e22', type: 'solid' as const },
  { label: 'Gunmetal',       color: '#3a3d42', type: 'solid' as const },
  { label: 'Lime Green',     color: '#2ecc40', type: 'solid' as const },
  { label: 'Evo Blue',       color: '#1e3a8a', type: 'solid' as const },
  { label: 'Bayside Blue',   color: '#1560bd', type: 'solid' as const },
  { label: 'Matte Black',    color: '#111111', type: 'matte' as const },
  { label: 'Chrome',         color: '#c8c8c8', type: 'chrome' as const },
]

export default function PaintTab() {
  const { paintConfig, setPaintConfig } = useGarageStore()

  return (
    <div className="p-3 space-y-4">
      {/* Color picker */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">CUSTOM COLOR</div>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-shop-border">
            <input
              type="color"
              value={paintConfig.color}
              onChange={(e) => setPaintConfig({ color: e.target.value, type: 'solid' })}
              className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
            />
            <div
              className="w-full h-full"
              style={{ backgroundColor: paintConfig.color }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-4 h-4 text-white opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
          </div>
          <div>
            <div className="shop-mono text-shop-white text-sm">{paintConfig.color.toUpperCase()}</div>
            <div className="shop-mono text-shop-dim text-xs uppercase">{paintConfig.type}</div>
          </div>
        </div>
      </div>

      {/* Material sliders */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">FINISH</div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="shop-mono text-shop-dim">METALNESS</span>
              <span className="shop-mono text-shop-white">{Math.round((paintConfig.metalness ?? 0.8) * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.01"
              value={paintConfig.metalness ?? 0.8}
              onChange={(e) => setPaintConfig({ metalness: parseFloat(e.target.value) })}
              className="w-full accent-shop-yellow h-1 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="shop-mono text-shop-dim">ROUGHNESS</span>
              <span className="shop-mono text-shop-white">{Math.round((paintConfig.roughness ?? 0.2) * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.01"
              value={paintConfig.roughness ?? 0.2}
              onChange={(e) => setPaintConfig({ roughness: parseFloat(e.target.value) })}
              className="w-full accent-shop-yellow h-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Presets */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">PRESETS</div>
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map((preset) => {
            const isActive = paintConfig.color === preset.color && paintConfig.type === preset.type
            return (
              <button
                key={preset.label}
                onClick={() => setPaintConfig({ color: preset.color, type: preset.type })}
                className={`flex items-center gap-2 p-2 rounded-sm text-left transition-all ${
                  isActive
                    ? 'bg-shop-surface border border-shop-yellow'
                    : 'bg-shop-dark border border-shop-border hover:border-shop-gun'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-sm flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="shop-mono text-xs text-shop-white truncate">{preset.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
