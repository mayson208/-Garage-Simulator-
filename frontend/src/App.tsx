import { useEffect, useState, useCallback, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useGarageStore } from './store/useGarageStore'
import ShopHeader from './components/UI/ShopHeader'
import CarViewer from './components/Viewer3D/CarViewer'
import CarSelector from './components/CarSelector/CarSelector'
import PartsPanel from './components/PartsPanel/PartsPanel'
import GaragePanel from './components/GaragePanel/GaragePanel'
import BuildSummary from './components/BuildSummary/BuildSummary'
import LoadingScreen from './components/UI/LoadingScreen'
import ToastStack from './components/UI/ToastStack'
import SharePage from './pages/SharePage'
import GalleryPage from './pages/GalleryPage'

// ── Web Audio shop ambience ──────────────────────────────────────────────────

function useShopAudio() {
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<AudioNode[]>([])

  const start = useCallback(() => {
    if (ctxRef.current) return
    const ctx = new AudioContext()
    ctxRef.current = ctx

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sawtooth'
    osc.frequency.value = 58
    filter.type = 'lowpass'
    filter.frequency.value = 120
    gain.gain.value = 0.04

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()

    const bufSize = ctx.sampleRate * 2
    const noiseBuffer = ctx.createBuffer(1, bufSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.015
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = 300
    noiseFilter.Q.value = 0.5

    const noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.12

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSource.start()

    nodesRef.current = [osc, noiseSource]
  }, [])

  const stop = useCallback(() => {
    nodesRef.current.forEach(n => {
      try { (n as OscillatorNode | AudioBufferSourceNode).stop() } catch { /* already stopped */ }
    })
    ctxRef.current?.close()
    ctxRef.current = null
    nodesRef.current = []
  }, [])

  return { start, stop }
}

// ─────────────────────────────────────────────────────────────────────────────

function Workshop() {
  const { loadCars } = useGarageStore()
  const [loadingDone, setLoadingDone] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const { start: startAudio, stop: stopAudio } = useShopAudio()

  useEffect(() => { loadCars() }, [loadCars])

  const toggleSound = () => {
    if (soundOn) { stopAudio(); setSoundOn(false) }
    else { startAudio(); setSoundOn(true) }
  }

  return (
    <>
      {!loadingDone && <LoadingScreen onDone={() => setLoadingDone(true)} />}
      <div className={`flex flex-col w-full h-full bg-shop-black overflow-hidden transition-opacity duration-500 ${loadingDone ? 'opacity-100' : 'opacity-0'}`}>
        <ShopHeader />
        {/* Main workspace — horizontal on md+, vertical stack on mobile */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Parts panel — left on md+, bottom drawer on mobile (hidden by default on sm) */}
          <div className="hidden md:flex">
            <PartsPanel />
          </div>

          {/* 3D Viewport — center */}
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">
            <div className="flex-shrink-0 h-1 w-full bg-gradient-to-r from-transparent via-shop-fluor/20 to-transparent fluor-flicker" />
            <div className="flex-1 relative min-h-0">
              <CarViewer />
              <div className="absolute top-3 right-3 pointer-events-none hidden sm:flex">
                <div className="flex flex-col items-end gap-1">
                  <div className="shop-mono text-shop-dim text-xs opacity-30 tracking-widest">EST. 2024</div>
                  <div className="shop-mono text-shop-dim text-xs opacity-20">ORBIT · ZOOM · PAN</div>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-xs shop-mono transition-all ${
                    soundOn
                      ? 'border-shop-yellow text-shop-yellow bg-shop-yellow/10'
                      : 'border-shop-border text-shop-dim hover:border-shop-gun'
                  }`}
                  title={soundOn ? 'Mute shop sounds' : 'Enable shop ambience'}
                >
                  <span>{soundOn ? '🔊' : '🔇'}</span>
                  <span className="hidden sm:inline">SHOP {soundOn ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2 caution-border opacity-20 pointer-events-none" />
            </div>
            {/* Car selector — visible on all screens, taller on mobile */}
            <div className="flex-shrink-0 h-[100px] sm:h-[140px]">
              <CarSelector />
            </div>
          </div>

          {/* Build summary — right on md+, hidden on mobile */}
          <div className="hidden md:flex">
            <BuildSummary />
          </div>
        </div>
        <GaragePanel />
      </div>
    </>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Workshop />} />
        <Route path="/share/:token" element={<SharePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <ToastStack />
    </>
  )
}
