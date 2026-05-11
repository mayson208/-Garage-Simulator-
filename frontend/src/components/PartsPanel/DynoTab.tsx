import { useMemo, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { useGarageStore } from '../../store/useGarageStore'
import PartCard from './PartCard'

function generateDynoCurve(
  baseHp: number,
  baseTq: number,
  modHp: number,
  modTq: number,
  redline: number,
) {
  const points = []
  const steps = 40
  for (let i = 0; i <= steps; i++) {
    const rpm = Math.round((redline * 0.2) + (redline * 0.8) * (i / steps))
    const pct = i / steps

    // Torque bell curve: peak at ~40% of range, tapers to redline
    const tqShape = Math.exp(-((pct - 0.35) ** 2) / (2 * 0.2 ** 2))
    const stockTq = Math.round(baseTq * (0.72 + 0.28 * tqShape))
    const modTqVal = Math.round((baseTq + modTq) * (0.72 + 0.28 * tqShape))

    // Power rises then falls at redline
    const hpShape = pct < 0.75
      ? pct / 0.75
      : 1 - ((pct - 0.75) / 0.25) * 0.15
    const stockHp = Math.round(baseHp * hpShape * 0.9 + baseHp * 0.1)
    const modHpVal = Math.round((baseHp + modHp) * hpShape * 0.9 + (baseHp + modHp) * 0.1)

    points.push({ rpm, stockHp, modHp: modHpVal, stockTq, modTq: modTqVal })
  }
  return points
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-shop-panel border border-shop-border rounded-sm px-3 py-2 shadow-xl">
      <div className="shop-mono text-shop-dim text-xs mb-1">{label} RPM</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 shop-mono text-xs">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-shop-dim">{p.name}:</span>
          <span className="text-shop-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function DynoTab() {
  const { selectedCar, parts, selectedParts } = useGarageStore()
  const [ran, setRan] = useState(false)

  const perfParts = parts.filter(p => p.category === 'performance')
  const installedPerfParts = perfParts.filter(p => {
    const installed = selectedParts['performance' as keyof typeof selectedParts]
    return installed && (installed as any).id === p.id
  })

  const totalHpMod = useMemo(() =>
    installedPerfParts.reduce((acc, p) => acc + (p.hpModifier ?? 0), 0),
  [installedPerfParts])

  const totalTqMod = useMemo(() =>
    installedPerfParts.reduce((acc, p) => acc + (p.tqModifier ?? 0), 0),
  [installedPerfParts])

  const baseHp  = selectedCar?.baseHp  ?? 200
  const baseTq  = selectedCar?.baseTq  ?? 200
  const redline = selectedCar?.redlineRpm ?? 7000

  const dynoData = useMemo(
    () => ran ? generateDynoCurve(baseHp, baseTq, totalHpMod, totalTqMod, redline) : [],
    [ran, baseHp, baseTq, totalHpMod, totalTqMod, redline]
  )

  const modHpPeak  = baseHp  + totalHpMod
  const modTqPeak  = baseTq  + totalTqMod
  const hpGain     = totalHpMod
  const tqGain     = totalTqMod

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Stats bar */}
      <div className="p-3 border-b border-shop-border bg-shop-surface/30">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center">
            <div className="shop-mono text-shop-dim text-xs opacity-60">STOCK HP</div>
            <div className="shop-header text-shop-white text-lg">{baseHp}</div>
          </div>
          <div className="text-center">
            <div className="shop-mono text-shop-dim text-xs opacity-60">MOD HP</div>
            <div className={`shop-header text-lg ${hpGain > 0 ? 'text-shop-green' : 'text-shop-white'}`}>
              {modHpPeak}
              {hpGain > 0 && <span className="text-xs ml-1 text-shop-green">+{hpGain}</span>}
            </div>
          </div>
          <div className="text-center">
            <div className="shop-mono text-shop-dim text-xs opacity-60">STOCK TQ</div>
            <div className="shop-header text-shop-white text-lg">{baseTq}</div>
          </div>
          <div className="text-center">
            <div className="shop-mono text-shop-dim text-xs opacity-60">MOD TQ</div>
            <div className={`shop-header text-lg ${tqGain > 0 ? 'text-shop-green' : 'text-shop-white'}`}>
              {modTqPeak}
              {tqGain > 0 && <span className="text-xs ml-1 text-shop-green">+{tqGain}</span>}
            </div>
          </div>
        </div>

        <button
          onClick={() => setRan(true)}
          disabled={!selectedCar}
          className="w-full py-2 bg-shop-yellow text-shop-black shop-header text-xs tracking-widest hover:bg-shop-yellow/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ▶ RUN DYNO SIM
        </button>
      </div>

      {/* Chart */}
      {ran && (
        <div className="p-3 border-b border-shop-border">
          <div className="shop-mono text-shop-dim text-xs mb-2 opacity-60">POWER & TORQUE CURVES</div>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <AreaChart data={dynoData} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
                <defs>
                  <linearGradient id="modHpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#F5C518" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="stockHpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6B7280" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="modTqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#2a2a2a" strokeDasharray="2 4" />
                <XAxis
                  dataKey="rpm"
                  tick={{ fill: '#666', fontSize: 9, fontFamily: 'monospace' }}
                  tickFormatter={v => `${(v/1000).toFixed(1)}k`}
                />
                <YAxis
                  tick={{ fill: '#666', fontSize: 9, fontFamily: 'monospace' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', color: '#888' }}
                />
                <Area type="monotone" dataKey="stockHp"  name="Stock HP"  stroke="#4B5563" fill="url(#stockHpGrad)" strokeWidth={1} dot={false} />
                <Area type="monotone" dataKey="modHp"    name="Mod HP"    stroke="#F5C518" fill="url(#modHpGrad)"   strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="modTq"    name="Mod TQ"    stroke="#22C55E" fill="url(#modTqGrad)"   strokeWidth={1.5} dot={false} strokeDasharray="3 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Performance parts list */}
      <div className="p-2 space-y-1.5">
        <div className="px-1 shop-mono text-shop-dim text-xs opacity-60">
          PERFORMANCE PARTS — {perfParts.length} available
        </div>
        {perfParts.length === 0 ? (
          <div className="p-4 text-center shop-mono text-shop-dim text-xs">
            No performance parts for this car
          </div>
        ) : (
          perfParts.map(part => <PartCard key={part.id} part={part} />)
        )}
      </div>
    </div>
  )
}
