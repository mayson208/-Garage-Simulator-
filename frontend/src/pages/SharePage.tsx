import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { buildsApi } from '../api/builds'
import { useNotificationStore } from '../store/useNotificationStore'
import { useGarageStore } from '../store/useGarageStore'
import type { Build, PaintConfig, StanceConfig, PartsConfig } from '../types'

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-shop-border/30">
      <span className="shop-mono text-shop-dim text-xs">{label}</span>
      <span className="shop-mono text-shop-light text-xs font-semibold">{value}</span>
    </div>
  )
}

export default function SharePage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const push = useNotificationStore(s => s.push)
  const { cars } = useGarageStore()

  const [build, setBuild] = useState<Build | null>(null)
  const [loading, setLoading] = useState(true)
  const [cloning, setCloning] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!token) return
    buildsApi.getByShareToken(token)
      .then(setBuild)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [token])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    push('Share link copied to clipboard!', 'success')
  }

  const cloneBuild = async () => {
    if (!token) return
    setCloning(true)
    try {
      await buildsApi.cloneFromShare(token)
      push(`"${build?.name}" cloned to your garage!`, 'success')
      navigate('/')
    } catch {
      push('Failed to clone build.', 'error')
    } finally {
      setCloning(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-shop-black">
        <div className="shop-mono text-shop-dim text-sm animate-pulse">LOADING BUILD…</div>
      </div>
    )
  }

  if (notFound || !build) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-shop-black gap-4">
        <div className="text-4xl">🔧</div>
        <div className="shop-mono text-shop-dim text-lg">BUILD NOT FOUND</div>
        <div className="shop-mono text-shop-dim text-xs opacity-60">This share link may have expired or been made private.</div>
        <Link to="/" className="mt-4 px-4 py-2 border border-shop-yellow text-shop-yellow shop-mono text-xs hover:bg-shop-yellow/10 transition-colors rounded-sm">
          ← BACK TO GARAGE
        </Link>
      </div>
    )
  }

  const car = cars.find(c => c.modelKey === build.carModelKey)
  let paintConfig: PaintConfig | null = null
  let stanceConfig: StanceConfig | null = null
  let partsConfig: PartsConfig = {}

  try { paintConfig = JSON.parse(build.paintConfig) } catch { /* no-op */ }
  try { stanceConfig = build.stanceConfig ? JSON.parse(build.stanceConfig) : null } catch { /* no-op */ }
  try { partsConfig = JSON.parse(build.partsConfig) } catch { /* no-op */ }

  const installedCount = Object.values(partsConfig).filter(Boolean).length

  return (
    <div className="min-h-screen bg-shop-black text-shop-light">
      {/* Header */}
      <div className="border-b border-shop-border bg-shop-dark">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="shop-mono text-shop-yellow text-sm font-bold tracking-widest hover:text-shop-yellow/80 transition-colors">
            ⬡ APEX GARAGE
          </Link>
          <div className="shop-mono text-shop-dim text-xs opacity-50">SHARED BUILD</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {build.thumbnailDataUrl ? (
            <div className="w-full md:w-80 h-48 flex-shrink-0 rounded-sm overflow-hidden border border-shop-border bg-shop-dark">
              <img src={build.thumbnailDataUrl} alt={build.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full md:w-80 h-48 flex-shrink-0 rounded-sm border border-shop-border bg-shop-dark flex items-center justify-center">
              <span className="text-4xl opacity-30">🚗</span>
            </div>
          )}

          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="shop-mono text-shop-dim text-xs mb-1 opacity-60">
                {car ? `${car.year} ${car.make} ${car.model}` : build.carModelKey}
              </div>
              <h1 className="text-2xl font-bold text-shop-light mb-2">{build.name}</h1>
              <div className="flex items-center gap-3 text-xs shop-mono text-shop-dim">
                <span>{installedCount} parts installed</span>
                {build.cloneCount > 0 && <span>· {build.cloneCount} clones</span>}
                {paintConfig && <span>· {paintConfig.type} finish</span>}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={cloneBuild}
                disabled={cloning}
                className="flex-1 md:flex-none px-4 py-2 bg-shop-yellow text-shop-black shop-mono text-xs font-bold rounded-sm hover:bg-shop-yellow/90 transition-colors disabled:opacity-50"
              >
                {cloning ? 'CLONING…' : '⊕ CLONE TO MY GARAGE'}
              </button>
              <button
                onClick={copyLink}
                className="px-4 py-2 border border-shop-border text-shop-dim shop-mono text-xs rounded-sm hover:border-shop-gun hover:text-shop-light transition-colors"
              >
                COPY LINK
              </button>
              <Link
                to="/"
                className="px-4 py-2 border border-shop-border text-shop-dim shop-mono text-xs rounded-sm hover:border-shop-gun hover:text-shop-light transition-colors"
              >
                BUILD MINE
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-shop-border rounded-sm p-4 bg-shop-dark">
            <div className="shop-mono text-shop-yellow text-xs font-bold mb-3 tracking-wider">BUILD DETAILS</div>
            {car && <StatRow label="Base Power" value={`${car.baseHp ?? '—'} HP`} />}
            {car && <StatRow label="Base Torque" value={`${car.baseTq ?? '—'} lb-ft`} />}
            {stanceConfig && <StatRow label="Ride Height" value={`Stage ${stanceConfig.rideHeight}`} />}
            {stanceConfig && <StatRow label="Camber" value={`${stanceConfig.camber > 0 ? '+' : ''}${stanceConfig.camber}°`} />}
            {build.wheelSize && <StatRow label="Wheel Size" value={`${build.wheelSize}"`} />}
            <StatRow label="Parts Installed" value={String(installedCount)} />
          </div>

          <div className="border border-shop-border rounded-sm p-4 bg-shop-dark">
            <div className="shop-mono text-shop-yellow text-xs font-bold mb-3 tracking-wider">PAINT & FINISH</div>
            {paintConfig && (
              <>
                <StatRow label="Type" value={paintConfig.type.toUpperCase()} />
                <StatRow label="Finish" value={paintConfig.finishType.toUpperCase()} />
                {paintConfig.wrapPreset && <StatRow label="Wrap" value={paintConfig.wrapPreset} />}
                {paintConfig.windowTint > 0 && <StatRow label="Window Tint" value={`${paintConfig.windowTint}%`} />}
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-sm border border-shop-border"
                    style={{ backgroundColor: paintConfig.color }}
                  />
                  <span className="shop-mono text-shop-dim text-xs">{paintConfig.color}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Token badge */}
        <div className="mt-6 text-center">
          <span className="shop-mono text-shop-dim text-xs opacity-40">
            SHARE TOKEN: {build.shareToken}
          </span>
        </div>
      </div>
    </div>
  )
}
