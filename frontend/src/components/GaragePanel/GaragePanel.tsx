import { useState, useEffect, useCallback } from 'react'
import { useGarageStore } from '../../store/useGarageStore'
import { buildsApi } from '../../api/builds'
import type { Build } from '../../types'

function DeleteConfirmModal({
  buildName,
  onConfirm,
  onCancel,
}: {
  buildName: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 rounded-sm">
      <div className="panel-glass rounded-sm p-5 max-w-xs mx-4 shadow-2xl border border-shop-red/30">
        <div className="caution-border mb-3" />
        <div className="shop-header text-shop-red text-sm tracking-widest mb-2">CONFIRM DELETE</div>
        <p className="shop-mono text-shop-dim text-xs leading-relaxed mb-4">
          Permanently delete <span className="text-shop-white">"{buildName}"</span>? This cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 bg-shop-red text-white shop-header text-xs py-2 hover:bg-red-600 transition-colors"
          >
            DELETE
          </button>
          <button onClick={onCancel} className="flex-1 btn-ghost text-xs py-2">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

interface BuildCardProps {
  build: Build
  onLoad: (b: Build) => void
  onDelete: (id: number) => void
  onDuplicate: (id: number) => void
  onRename: (id: number, name: string) => void
}

function BuildCard({ build, onLoad, onDelete, onDuplicate, onRename }: BuildCardProps) {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(build.name)
  const [confirming, setConfirming] = useState(false)

  const commitRename = () => {
    if (editName.trim() && editName.trim() !== build.name) {
      onRename(build.id, editName.trim())
    }
    setEditing(false)
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })

  return (
    <div className="part-card rounded-sm p-3 group relative">
      {confirming && (
        <DeleteConfirmModal
          buildName={build.name}
          onConfirm={() => { setConfirming(false); onDelete(build.id) }}
          onCancel={() => setConfirming(false)}
        />
      )}

      {/* Thumbnail */}
      <div className="w-full h-24 bg-shop-dark rounded-sm mb-3 flex items-center justify-center overflow-hidden">
        {build.thumbnailDataUrl ? (
          <img
            src={build.thumbnailDataUrl}
            alt={build.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="opacity-30">
            <svg viewBox="0 0 80 40" className="w-16 h-8 mx-auto mb-1">
              <rect x="5" y="18" width="70" height="14" rx="2" fill="currentColor"/>
              <rect x="15" y="8" width="50" height="14" rx="2" fill="currentColor"/>
              <circle cx="18" cy="34" r="7" fill="currentColor"/>
              <circle cx="62" cy="34" r="7" fill="currentColor"/>
            </svg>
          </div>
        )}
      </div>

      {/* Inline-editable name */}
      {editing ? (
        <input
          type="text"
          value={editName}
          onChange={e => setEditName(e.target.value)}
          onBlur={commitRename}
          onKeyDown={e => {
            if (e.key === 'Enter') commitRename()
            if (e.key === 'Escape') setEditing(false)
          }}
          className="w-full bg-shop-dark border border-shop-yellow text-shop-white text-sm px-2 py-1 outline-none shop-mono mb-1"
          autoFocus
        />
      ) : (
        <button
          className="w-full text-left group/name"
          onDoubleClick={() => setEditing(true)}
          title="Double-click to rename"
        >
          <div className="shop-header text-shop-white text-sm leading-tight truncate group-hover/name:text-shop-yellow transition-colors">
            {build.name}
          </div>
        </button>
      )}

      <div className="shop-mono text-shop-dim text-xs mt-0.5">
        {build.carModelKey.replace(/_/g, ' ').toUpperCase()}
      </div>
      <div className="shop-mono text-shop-dim text-xs opacity-50 mt-0.5">
        {formatDate(build.updatedAt)}
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 mt-3">
        <button
          onClick={() => onLoad(build)}
          className="flex-1 btn-primary text-xs py-1.5"
        >
          LOAD
        </button>
        <button
          onClick={() => onDuplicate(build.id)}
          className="w-8 flex items-center justify-center border border-shop-border hover:border-shop-yellow hover:text-shop-yellow text-shop-dim transition-colors text-xs"
          title="Duplicate build"
        >
          ⊕
        </button>
        <button
          onClick={() => setConfirming(true)}
          className="w-8 flex items-center justify-center border border-shop-border hover:border-shop-red hover:text-shop-red text-shop-dim transition-colors text-xs"
          title="Delete build"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default function GaragePanel() {
  const {
    garagePanelOpen,
    toggleGaragePanel,
    selectedCar,
    getPartsConfig,
    paintConfig,
    stanceConfig,
    wheelSize,
    selectCar,
    cars,
    captureScreenshot,
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
      const thumbnail = captureScreenshot ? captureScreenshot() : null
      await buildsApi.create({
        name: buildName.trim(),
        carModelKey: selectedCar.modelKey,
        partsConfig: JSON.stringify(getPartsConfig()),
        paintConfig: JSON.stringify(paintConfig),
        stanceConfig: JSON.stringify(stanceConfig),
        wheelSize,
        thumbnailDataUrl: thumbnail,
      })
      setBuildName('')
      setSaveMode(false)
      await loadBuilds()
    } finally {
      setSaving(false)
    }
  }

  const handleLoad = async (build: Build) => {
    const car = cars.find(c => c.modelKey === build.carModelKey)
    if (car) await selectCar(car)
    const parsedPaint = JSON.parse(build.paintConfig || '{}')
    const parsedStance = build.stanceConfig ? JSON.parse(build.stanceConfig) : null
    useGarageStore.setState({
      paintConfig: parsedPaint,
      ...(parsedStance ? { stanceConfig: parsedStance } : {}),
      ...(build.wheelSize ? { wheelSize: build.wheelSize as 17 | 18 | 19 } : {}),
    })
    toggleGaragePanel()
  }

  const handleDelete = async (id: number) => {
    await buildsApi.delete(id)
    setBuilds(prev => prev.filter(b => b.id !== id))
  }

  const handleDuplicate = async (id: number) => {
    await buildsApi.duplicate(id)
    await loadBuilds()
  }

  const handleRename = async (id: number, name: string) => {
    const build = builds.find(b => b.id === id)
    if (!build) return
    const updated = await buildsApi.update(id, {
      name,
      carModelKey: build.carModelKey,
      partsConfig: build.partsConfig,
      paintConfig: build.paintConfig,
      stanceConfig: build.stanceConfig,
      wheelSize: build.wheelSize ?? undefined,
      thumbnailDataUrl: build.thumbnailDataUrl,
    })
    setBuilds(prev => prev.map(b => b.id === id ? updated : b))
  }

  if (!garagePanelOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="panel-glass w-full max-w-2xl max-h-[85vh] flex flex-col rounded-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-shop-border flex-shrink-0">
          <div>
            <div className="caution-border mb-2 w-20" />
            <div className="shop-header text-shop-yellow text-lg tracking-widest">MY GARAGE</div>
            <div className="shop-mono text-shop-dim text-xs">
              {builds.length} SAVED BUILD{builds.length !== 1 ? 'S' : ''}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedCar && (
              <button onClick={() => setSaveMode(true)} className="btn-primary">
                + Save Current Build
              </button>
            )}
            <button onClick={toggleGaragePanel} className="btn-ghost">✕ Close</button>
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
                onChange={e => setBuildName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
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
              <button onClick={() => setSaveMode(false)} className="btn-ghost">Cancel</button>
            </div>
            {saving && (
              <div className="mt-1.5 shop-mono text-shop-dim text-xs flex items-center gap-1.5">
                <span className="animate-spin inline-block">⟳</span>
                Capturing viewport screenshot...
              </div>
            )}
          </div>
        )}

        {/* Builds grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 rounded-sm shimmer" />
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
              {builds.map(build => (
                <BuildCard
                  key={build.id}
                  build={build}
                  onLoad={handleLoad}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onRename={handleRename}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
