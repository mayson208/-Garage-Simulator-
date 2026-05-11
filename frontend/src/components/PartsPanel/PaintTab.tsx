import { useGarageStore } from '../../store/useGarageStore'
import type { FinishType } from '../../types'
import { FINISH_PRESETS } from '../../types'

const FINISH_TYPES: { value: FinishType; label: string }[] = [
  { value: 'gloss',  label: 'Gloss'   },
  { value: 'matte',  label: 'Matte'   },
  { value: 'satin',  label: 'Satin'   },
  { value: 'chrome', label: 'Chrome'  },
]

interface WrapPreset {
  id: string
  label: string
  color: string
  type: 'solid' | 'matte' | 'carbon' | 'chrome' | 'wrap'
  finishType: FinishType
  swatch?: string  // second swatch color for two-tone
}

const WRAP_PRESETS: WrapPreset[] = [
  { id: 'carbon_fiber',     label: 'Carbon Fiber',    color: '#1a1a1a', type: 'carbon',  finishType: 'satin'  },
  { id: 'matte_black',      label: 'Matte Black',     color: '#111111', type: 'matte',   finishType: 'matte'  },
  { id: 'matte_white',      label: 'Matte White',     color: '#e8e8e4', type: 'matte',   finishType: 'matte'  },
  { id: 'gunmetal',         label: 'Gunmetal',        color: '#3a3d42', type: 'solid',   finishType: 'satin'  },
  { id: 'candy_red',        label: 'Candy Red',       color: '#b01010', type: 'solid',   finishType: 'gloss'  },
  { id: 'midnight_purple',  label: 'Midnight Purple', color: '#3d0076', type: 'solid',   finishType: 'gloss'  },
  { id: 'panda',            label: 'Panda',           color: '#f0f0ee', type: 'solid',   finishType: 'gloss', swatch: '#111111' },
  { id: 'raw_metal',        label: 'Raw Metal',       color: '#9a9a9a', type: 'solid',   finishType: 'satin'  },
]

export default function PaintTab() {
  const { paintConfig, setPaintConfig } = useGarageStore()

  const applyFinishType = (finish: FinishType) => {
    setPaintConfig({
      finishType: finish,
      ...FINISH_PRESETS[finish],
      // Chrome forces its own color
      ...(finish === 'chrome' ? { color: '#c8c8c8', type: 'chrome' as const } : {}),
    })
  }

  const applyWrap = (preset: WrapPreset) => {
    const finishPreset = FINISH_PRESETS[preset.finishType]
    setPaintConfig({
      type: preset.type as 'solid' | 'matte' | 'carbon' | 'chrome' | 'wrap',
      finishType: preset.finishType,
      color: preset.color,
      wrapPreset: preset.id,
      metalness: finishPreset.metalness,
      roughness: finishPreset.roughness,
    })
  }

  return (
    <div className="p-3 space-y-4">
      {/* ── Custom color picker ── */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">CUSTOM COLOR</div>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-shop-border cursor-pointer">
            <input
              type="color"
              value={paintConfig.color}
              onChange={e =>
                setPaintConfig({ color: e.target.value, type: 'solid', wrapPreset: null })
              }
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-full" style={{ backgroundColor: paintConfig.color }} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-4 h-4 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
          </div>
          <div>
            <div className="shop-mono text-shop-white text-sm">{paintConfig.color.toUpperCase()}</div>
            <div className="shop-mono text-shop-dim text-xs uppercase">
              {paintConfig.wrapPreset
                ? WRAP_PRESETS.find(w => w.id === paintConfig.wrapPreset)?.label ?? paintConfig.type
                : paintConfig.type}
            </div>
          </div>
        </div>
      </div>

      {/* ── Finish type toggle ── */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">FINISH TYPE</div>
        <div className="grid grid-cols-4 gap-1">
          {FINISH_TYPES.map(ft => (
            <button
              key={ft.value}
              onClick={() => applyFinishType(ft.value)}
              className={`py-2 text-xs rounded-sm transition-all ${
                paintConfig.finishType === ft.value
                  ? 'bg-shop-yellow text-shop-black shop-header'
                  : 'border border-shop-border text-shop-dim hover:border-shop-gun shop-mono'
              }`}
            >
              {ft.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Window tint ── */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <div className="shop-header text-shop-dim text-xs tracking-widest">WINDOW TINT</div>
          <div className="shop-mono text-shop-white text-xs">
            {paintConfig.windowTint}%
            <span className="text-shop-dim ml-1">
              {paintConfig.windowTint < 20 ? 'CLEAR' : paintConfig.windowTint < 50 ? '35% VLT' : 'LIMO'}
            </span>
          </div>
        </div>
        <div className="relative">
          <input
            type="range" min="0" max="100" step="1"
            value={paintConfig.windowTint}
            onChange={e => setPaintConfig({ windowTint: parseInt(e.target.value) })}
            className="w-full accent-shop-yellow h-1 cursor-pointer"
          />
          <div className="flex justify-between mt-0.5">
            <span className="shop-mono text-shop-dim" style={{ fontSize: '10px' }}>CLEAR</span>
            <span className="shop-mono text-shop-dim" style={{ fontSize: '10px' }}>LIMO</span>
          </div>
        </div>
        {/* Tint preview bar */}
        <div
          className="mt-2 w-full h-4 rounded-sm border border-shop-border overflow-hidden"
          style={{
            background: `linear-gradient(to right, rgba(13,26,39,0.15), rgba(13,26,39,${0.1 + (paintConfig.windowTint / 100) * 0.85}))`,
          }}
        />
      </div>

      {/* ── Fine tuning sliders ── */}
      {paintConfig.finishType !== 'chrome' && (
        <div>
          <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">FINE TUNE</div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="shop-mono text-shop-dim">METALNESS</span>
                <span className="shop-mono text-shop-white">{Math.round(paintConfig.metalness * 100)}%</span>
              </div>
              <input
                type="range" min="0" max="1" step="0.01"
                value={paintConfig.metalness}
                onChange={e => setPaintConfig({ metalness: parseFloat(e.target.value) })}
                className="w-full accent-shop-yellow h-1 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="shop-mono text-shop-dim">ROUGHNESS</span>
                <span className="shop-mono text-shop-white">{Math.round(paintConfig.roughness * 100)}%</span>
              </div>
              <input
                type="range" min="0" max="1" step="0.01"
                value={paintConfig.roughness}
                onChange={e => setPaintConfig({ roughness: parseFloat(e.target.value) })}
                className="w-full accent-shop-yellow h-1 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Wrap presets ── */}
      <div>
        <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">WRAP PRESETS</div>
        <div className="grid grid-cols-2 gap-1.5">
          {WRAP_PRESETS.map(preset => {
            const isActive = paintConfig.wrapPreset === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => applyWrap(preset)}
                className={`flex items-center gap-2 p-2 rounded-sm text-left transition-all ${
                  isActive
                    ? 'bg-shop-surface border border-shop-yellow'
                    : 'bg-shop-dark border border-shop-border hover:border-shop-gun'
                }`}
              >
                {/* Swatch */}
                <div className="flex-shrink-0 w-7 h-7 rounded-sm border border-white/10 overflow-hidden">
                  {preset.id === 'carbon_fiber' ? (
                    <div className="w-full h-full" style={{
                      background: 'repeating-linear-gradient(45deg,#1a1a1a 0px,#1a1a1a 2px,#282828 2px,#282828 4px)',
                    }} />
                  ) : preset.swatch ? (
                    <div className="w-full h-full flex">
                      <div className="flex-1" style={{ backgroundColor: preset.color }} />
                      <div className="flex-1" style={{ backgroundColor: preset.swatch }} />
                    </div>
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: preset.color }} />
                  )}
                </div>
                <span className="shop-mono text-xs text-shop-white truncate leading-tight">
                  {preset.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
