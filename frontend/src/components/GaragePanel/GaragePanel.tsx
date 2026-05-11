import { useState, useEffect, useCallback } from 'react'
import { useGarageStore } from '../../store/useGarageStore'
import { buildsApi } from '../../api/builds'
import { carsApi } from '../../api/cars'
import type { Build } from '../../types'

export default function GaragePanel() {
  const {
    garagePanelOpen,
    toggleGaragePanel,
    selectedCar,
    getPartsConfig,
    paintConfig,
    selectCar,
    cars,
  } = useGarageStore()

  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [buildName, setBuildName] = useState('')
  const [saveMode, setSaveMode] = useState(false)

  const loadBuilds = useCallback(async () => {
    setLoading(true)
    try {
      const data = await buildsApi.getAll()
      setBuilds(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (garagePanelOpen) loadBuilds()
  }, [garagePanelOpen, loadBuilds])

  const handleSave = async () => {
    if (!selectedCar || !buildName.trim()) return
    setSaving(true)
    try {
      await buildsApi.create({
        name: buildName.trim(),
        carModelKey: selectedCar.modelKey,
        partsConfig: JSON.stringify(getPartsConfig()),
        paintConfig: JSON.stringify(paintConfig),
        thumbnailDataUrl: null,
      })
      setBuildName('')
      setSaveMode(false)
      await loadBuilds()
    } finally {
      setSaving(false)
    }
  }

  const handleLoad = async (build: Build) => {
    const car = cars.find((c) => c.modelKey === build.carModelKey)
    if (car) await selectCar(car)
    const parsedPaint = JSON.parse(build.paintConfig || '{}')
    useGarageStore.setState({ paintConfig: parsedPaint })
    toggleGaragePanel()
  }

  const handleDelete = async (id: number) => {
    await buildsApi.delete(id)
    setBuilds((prev) => prev.filter((b) => b.id !== id))
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: '2-digit',
    })
  }

  if (!garagePanelOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="panel-glass w-full max-w-2xl max-h-[80vh] flex flex-col rounded-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-shop-border flex-shrink-0">
          <div>
            <div className="caution-border mb-2 w-20" />
            <div className="shop-header text-shop-yellow text-lg tracking-widest">MY GARAGE</div>
            <div className="shop-mono text-shop-dim text-xs">{builds.length} SAVED BUILD{builds.length !== 1 ? 'S' : ''}</div>
          </div>
          <div className="flex items-center gap-2">
            {selectedCar && (
              <button
                onClick={() => setSaveMode(true)}
                className="btn-primary"
              >
                + Save Current Build
              </button>
            )}
            <button
              onClick={toggleGaragePanel}
              className="btn-ghost"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Save form */}
        {saveMode && (
          <div className="p-4 bg-shop-surface border-b border-shop-border flex-shrink-0">
            <div className="shop-header text-shop-dim text-xs tracking-widest mb-2">BUILD NAME</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                placeholder="e.g. Track Supra Build..."
                className="flex-1 bg-shop-dark border border-shop-border text-shop-white text-sm px-3 py-2 outline-none focus:border-shop-yellow shop-mono"
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={!buildName.trim() || saving}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? 'SAVING...' : 'SAVE'}
              </button>
              <button onClick={() => setSaveMode(false)} className="btn-ghost">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Builds grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 rounded-sm shimmer" />
              ))}
            </div>
          ) : builds.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <div className="text-4xl mb-3 opacity-20">🔧</div>
              <div className="shop-header text-shop-dim text-sm">NO SAVED BUILDS</div>
              <div className="shop-mono text-shop-dim text-xs mt-1 opacity-60">
                Select a car and start customizing to save your first build
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {builds.map((build) => (
                <div
                  key={build.id}
                  className="part-card rounded-sm p-3 group"
                >
                  {/* Thumbnail placeholder */}
                  <div className="w-full h-24 bg-shop-dark rounded-sm mb-3 flex items-center justify-center overflow-hidden">
                    {build.thumbnailDataUrl ? (
                      <img src={build.thumbnailDataUrl} alt={build.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center opacity-30">
                        <svg viewBox="0 0 80 40" className="w-16 h-8 mx-auto mb-1">
                          <rect x="5" y="18" width="70" height="14" rx="2" fill="currentColor"/>
                          <rect x="15" y="8" width="50" height="14" rx="2" fill="currentColor"/>
                          <circle cx="18" cy="34" r="7" fill="currentColor"/>
                          <circle cx="62" cy="34" r="7" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="shop-header text-shop-white text-sm leading-tight truncate">{build.name}</div>
                  <div className="shop-mono text-shop-dim text-xs mt-0.5">{build.carModelKey.replace(/_/g, ' ').toUpperCase()}</div>
                  <div className="shop-mono text-shop-dim text-xs opacity-50 mt-0.5">{formatDate(build.updatedAt)}</div>

                  <div className="flex gap-1.5 mt-3">
                    <button
                      onClick={() => handleLoad(build)}
                      className="flex-1 btn-primary text-xs py-1.5"
                    >
                      LOAD
                    </button>
                    <button
                      onClick={() => handleDelete(build.id)}
                      className="w-8 flex items-center justify-center border border-shop-border hover:border-shop-red hover:text-shop-red text-shop-dim transition-colors text-xs"
                      title="Delete build"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
