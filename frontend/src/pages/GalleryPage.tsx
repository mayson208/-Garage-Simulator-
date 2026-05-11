import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildsApi } from '../api/builds'
import type { Build } from '../types'

const SORT_OPTIONS = [
  { value: 'newest',   label: 'NEWEST' },
  { value: 'clones',   label: 'MOST CLONED' },
  { value: 'expensive', label: 'MOST EXPENSIVE' },
]

const CAR_FILTERS = [
  { value: '',             label: 'ALL CARS' },
  { value: 'supra_mk4',   label: 'Supra MK4' },
  { value: 'rx7_fd3s',    label: 'RX-7 FD' },
  { value: 'silvia_s15',  label: 'Silvia S15' },
  { value: 'evo_ix',      label: 'Evo IX' },
  { value: 'wrx_sti_gd',  label: 'WRX STI' },
  { value: 'nsx_na1',     label: 'NSX NA1' },
  { value: 's2000_ap1',   label: 'S2000' },
  { value: 'ae86_trueno', label: 'AE86' },
  { value: 'bmw_e46_m3',  label: 'E46 M3' },
  { value: 'porsche_911_996', label: '911 996' },
  { value: 'mustang_gt_sn95', label: 'Mustang GT' },
  { value: 'challenger_srt',  label: 'Challenger SRT' },
]

function BuildCard({ build }: { build: Build }) {
  let totalCost = 0
  try {
    const parts = JSON.parse(build.partsConfig)
    totalCost = Object.values(parts).filter(Boolean).length * 1200
  } catch { /* no-op */ }

  return (
    <Link
      to={`/share/${build.shareToken}`}
      className="group block border border-shop-border rounded-sm overflow-hidden bg-shop-dark hover:border-shop-yellow transition-colors"
    >
      <div className="h-36 bg-shop-black flex items-center justify-center overflow-hidden">
        {build.thumbnailDataUrl ? (
          <img src={build.thumbnailDataUrl} alt={build.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <span className="text-3xl opacity-20">🚗</span>
        )}
      </div>
      <div className="p-3">
        <div className="shop-mono text-shop-dim text-xs mb-0.5 opacity-60 truncate">{build.carModelKey.replace(/_/g, ' ').toUpperCase()}</div>
        <div className="shop-mono text-shop-light text-sm font-semibold truncate mb-1">{build.name}</div>
        <div className="flex items-center justify-between text-xs shop-mono text-shop-dim">
          <span>{build.cloneCount} clone{build.cloneCount !== 1 ? 's' : ''}</span>
          {totalCost > 0 && <span>${totalCost.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  )
}

export default function GalleryPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [sort, setSort] = useState('newest')
  const [carModel, setCarModel] = useState('')

  const LIMIT = 12

  const load = async (reset = false) => {
    setLoading(true)
    const nextPage = reset ? 0 : page
    try {
      const res = await buildsApi.getGallery({ page: nextPage, limit: LIMIT, sort, carModel: carModel || undefined })
      setBuilds(prev => reset ? res.builds : [...prev, ...res.builds])
      setHasMore(res.builds.length === LIMIT)
      if (!reset) setPage(p => p + 1)
      else setPage(1)
    } catch {
      /* no-op */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(true) }, [sort, carModel]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-shop-black text-shop-light">
      {/* Header */}
      <div className="border-b border-shop-border bg-shop-dark sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="shop-mono text-shop-yellow text-sm font-bold tracking-widest hover:text-shop-yellow/80 transition-colors">
              ⬡ APEX GARAGE
            </Link>
            <span className="shop-mono text-shop-dim text-xs opacity-40">/</span>
            <span className="shop-mono text-shop-dim text-xs">COMMUNITY GALLERY</span>
          </div>
          <Link to="/" className="px-3 py-1.5 border border-shop-border text-shop-dim shop-mono text-xs rounded-sm hover:border-shop-yellow hover:text-shop-yellow transition-colors">
            ← BUILD MINE
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Sort */}
          <div className="flex gap-1">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3 py-1.5 shop-mono text-xs rounded-sm border transition-colors ${
                  sort === opt.value
                    ? 'border-shop-yellow text-shop-yellow bg-shop-yellow/10'
                    : 'border-shop-border text-shop-dim hover:border-shop-gun'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Car filter */}
          <select
            value={carModel}
            onChange={e => setCarModel(e.target.value)}
            className="px-3 py-1.5 shop-mono text-xs bg-shop-dark border border-shop-border text-shop-dim rounded-sm hover:border-shop-gun focus:outline-none focus:border-shop-yellow"
          >
            {CAR_FILTERS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {builds.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="text-4xl opacity-30">🏁</div>
            <div className="shop-mono text-shop-dim text-sm">No public builds yet.</div>
            <Link to="/" className="mt-2 shop-mono text-shop-yellow text-xs hover:underline">
              Be the first — build something →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4">
            {builds.map(b => <BuildCard key={b.id} build={b} />)}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="shop-mono text-shop-dim text-xs animate-pulse">LOADING…</div>
          </div>
        )}

        {!loading && hasMore && builds.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => load()}
              className="px-6 py-2 border border-shop-border text-shop-dim shop-mono text-xs rounded-sm hover:border-shop-yellow hover:text-shop-yellow transition-colors"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
