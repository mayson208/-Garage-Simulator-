import { useState, useEffect } from 'react'

const MESSAGES = [
  'PREPARING YOUR BUILD',
  'LOADING PARTS INVENTORY',
  'SPINNING UP THE LIFT',
  'CHECKING TORQUE SPECS',
  'WARMING UP THE SHOP',
]

interface LoadingScreenProps {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [dots, setDots] = useState('')
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        // Accelerate near end
        const step = p < 80 ? 2 : p < 95 ? 0.8 : 0.3
        return Math.min(100, p + step)
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setExiting(true), 300)
      setTimeout(onDone, 900)
    }
  }, [progress, onDone])

  // Cycle messages
  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length)
    }, 600)
    return () => clearInterval(t)
  }, [])

  // Dots animation
  useEffect(() => {
    const t = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-shop-black transition-opacity duration-500 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Fluorescent flicker top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-shop-fluor/30 to-transparent fluor-flicker" />

      {/* Caution stripe bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 caution-border opacity-40" />

      {/* Logo area */}
      <div className="text-center mb-12">
        <div className="caution-border w-40 mx-auto mb-6" style={{ height: '6px' }} />

        <div className="shop-header text-shop-yellow text-5xl tracking-widest mb-1">
          APEX
        </div>
        <div className="shop-header text-shop-white text-2xl tracking-[0.4em] mb-2">
          GARAGE
        </div>
        <div className="shop-mono text-shop-dim text-xs tracking-widest opacity-60">
          JDM CUSTOMIZER — EST. 2024
        </div>

        <div className="caution-border w-40 mx-auto mt-6" style={{ height: '6px' }} />
      </div>

      {/* Progress bar */}
      <div className="w-64 mb-5">
        <div className="flex justify-between mb-1.5">
          <span className="shop-mono text-shop-dim text-xs">{MESSAGES[msgIndex]}{dots}</span>
          <span className="shop-mono text-shop-yellow text-xs">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-shop-surface rounded-full overflow-hidden border border-shop-border">
          <div
            className="h-full bg-shop-yellow rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Sub-text */}
      <div className="shop-mono text-shop-dim text-xs opacity-40 tracking-widest">
        POWERED BY JERRY
      </div>

      {/* Corner shop number */}
      <div className="absolute bottom-6 right-6 shop-mono text-shop-dim text-xs opacity-20">
        BAY 01
      </div>
      <div className="absolute bottom-6 left-6 shop-mono text-shop-dim text-xs opacity-20">
        APEX-00
      </div>
    </div>
  )
}
