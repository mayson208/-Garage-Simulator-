import { useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useGarageStore } from '../../store/useGarageStore'

function FPSCounter({ onUpdate }: { onUpdate: (fps: number) => void }) {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useFrame(() => {
    frameCount.current++
    const now = performance.now()
    if (now - lastTime.current >= 500) {
      onUpdate(Math.round(frameCount.current * 1000 / (now - lastTime.current)))
      frameCount.current = 0
      lastTime.current = now
    }
  })
  return null
}

function SceneInfo({ fps, visible }: { fps: number; visible: boolean }) {
  const { gl, scene, camera } = useThree()
  if (!visible) return null

  const info = gl.info
  return (
    <group>
      {/* Could render attachment node spheres here if we had node positions */}
    </group>
  )
}

// The overlay panel rendered in DOM (not inside canvas)
export function DebugPanel({ fps, visible }: { fps: number; visible: boolean }) {
  const { selectedCar, selectedParts } = useGarageStore()
  if (!visible) return null

  return (
    <div className="absolute top-14 left-3 z-50 bg-black/80 border border-shop-yellow/30 rounded-sm p-3 min-w-48 pointer-events-none">
      <div className="shop-mono text-shop-yellow text-xs font-bold mb-2 tracking-widest">DEBUG OVERLAY</div>

      <div className="space-y-0.5">
        <div className="flex justify-between gap-4">
          <span className="shop-mono text-shop-dim text-xs">FPS</span>
          <span className={`shop-mono text-xs font-bold ${fps >= 55 ? 'text-shop-green' : fps >= 30 ? 'text-shop-yellow' : 'text-shop-red'}`}>
            {fps}
          </span>
        </div>

        {selectedCar && (
          <>
            <div className="flex justify-between gap-4">
              <span className="shop-mono text-shop-dim text-xs">MODEL</span>
              <span className="shop-mono text-shop-white text-xs truncate max-w-28">{selectedCar.glbPath ?? 'none'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="shop-mono text-shop-dim text-xs">CAR</span>
              <span className="shop-mono text-shop-white text-xs">{selectedCar.modelKey}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="shop-mono text-shop-dim text-xs">CULTURE</span>
              <span className="shop-mono text-shop-white text-xs">{selectedCar.culture ?? '—'}</span>
            </div>
          </>
        )}

        <div className="mt-2 pt-2 border-t border-shop-border/30">
          <div className="shop-mono text-shop-dim text-xs mb-1">INSTALLED PARTS</div>
          {Object.entries(selectedParts).filter(([, v]) => v).map(([cat, part]) => (
            <div key={cat} className="flex justify-between gap-2">
              <span className="shop-mono text-shop-dim text-xs opacity-60">{cat}</span>
              <span className="shop-mono text-xs text-shop-white truncate max-w-24">
                {(part as any)?.name?.split(' ').slice(0, 2).join(' ') ?? '—'}
              </span>
            </div>
          ))}
          {!Object.values(selectedParts).some(Boolean) && (
            <div className="shop-mono text-shop-dim text-xs opacity-40">none</div>
          )}
        </div>

        {selectedCar?.attachmentNodes && (
          <div className="mt-2 pt-2 border-t border-shop-border/30">
            <div className="shop-mono text-shop-dim text-xs mb-1">ATTACHMENT NODES</div>
            <div className="shop-mono text-xs text-shop-dim opacity-60 leading-relaxed">
              {selectedCar.attachmentNodes.split(',').map(n => (
                <div key={n}>{n}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-shop-border/30 shop-mono text-shop-dim text-xs opacity-40">
        Press ` to hide
      </div>
    </div>
  )
}

// Hook for toggling debug with backtick
export function useDebugOverlay() {
  const [visible, setVisible] = useState(false)
  const [fps, setFps] = useState(0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`') setVisible(v => !v)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { visible, fps, setFps }
}

// Canvas-internal component (must be inside <Canvas>)
export function DebugCanvasLayer({ fps, visible, onFps }: { fps: number; visible: boolean; onFps: (v: number) => void }) {
  return (
    <>
      <FPSCounter onUpdate={onFps} />
      <SceneInfo fps={fps} visible={visible} />
    </>
  )
}
