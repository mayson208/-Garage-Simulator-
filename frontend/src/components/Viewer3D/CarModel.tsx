import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Part, PaintConfig, StanceConfig } from '../../types'
import { useGarageStore } from '../../store/useGarageStore'

// ─── Geometry constants ──────────────────────────────────────────────────────

const WHEEL_POSITIONS: Record<string, [number, number, number]> = {
  wheel_fl: [-0.96, 0.22, 1.2],
  wheel_fr: [0.96,  0.22, 1.2],
  wheel_rl: [-0.96, 0.22, -1.2],
  wheel_rr: [0.96,  0.22, -1.2],
}

// Wheel brand → spoke count + accent color
function wheelSpec(partName: string): { spokes: number; accentColor: string } {
  const n = partName.toLowerCase()
  if (n.includes('te37'))        return { spokes: 6,  accentColor: '#c0b030' }
  if (n.includes('ce28'))        return { spokes: 8,  accentColor: '#c8c8c8' }
  if (n.includes('rpf1'))        return { spokes: 10, accentColor: '#e0e0e0' }
  if (n.includes('meister'))     return { spokes: 5,  accentColor: '#d0d0d0' }
  if (n.includes('ssr') || n.includes('professor')) return { spokes: 5, accentColor: '#c4c4c4' }
  if (n.includes('gram') || n.includes('57dr'))     return { spokes: 12, accentColor: '#c8c8c8' }
  if (n.includes('advan'))       return { spokes: 7,  accentColor: '#f0f0f0' }
  if (n.includes('bbs'))         return { spokes: 10, accentColor: '#c8a020' }
  if (n.includes('rota'))        return { spokes: 8,  accentColor: '#222222' }
  if (n.includes('watanabe'))    return { spokes: 8,  accentColor: '#d0d0d0' }
  return                                { spokes: 5,  accentColor: '#b0b0b0' }
}

// ─── Transition wrapper ───────────────────────────────────────────────────────

interface TransitionGroupProps {
  partId: number | null | undefined
  children: React.ReactNode
}

function TransitionGroup({ partId, children }: TransitionGroupProps) {
  const groupRef = useRef<THREE.Group>(null)
  const prevId = useRef<number | null | undefined>(undefined)
  const progress = useRef(1)

  if (partId !== prevId.current) {
    prevId.current = partId
    if (partId !== null && partId !== undefined) {
      progress.current = 0
    }
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta / 0.3)
      const t = progress.current
      // easeOutBack for satisfying spring feel
      const s = 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2)
      const clamped = Math.max(0, Math.min(1.05, s))
      groupRef.current.scale.setScalar(clamped)
    }
  })

  return <group ref={groupRef}>{children}</group>
}

// ─── Wheel assembly ───────────────────────────────────────────────────────────

interface WheelProps {
  position: [number, number, number]
  camberRad: number
  sizeScale: number
  part: Part | undefined
}

function WheelAssembly({ position, camberRad, sizeScale, part }: WheelProps) {
  const spec = part ? wheelSpec(part.name) : { spokes: 5, accentColor: '#8a8a8a' }
  const rimColor = part ? spec.accentColor : '#9a9a9a'
  const tireColor = '#111111'
  const isRight = position[0] > 0

  return (
    <group position={position} rotation={[0, 0, isRight ? camberRad : -camberRad]}>
      <group scale={[sizeScale, sizeScale, sizeScale]} rotation={[0, 0, Math.PI / 2]}>
        <TransitionGroup partId={part?.id}>
          {/* Tire */}
          <mesh castShadow>
            <torusGeometry args={[0.21, 0.085, 18, 36]} />
            <meshStandardMaterial color={tireColor} roughness={0.96} metalness={0.0} />
          </mesh>
          {/* Rim face */}
          <mesh>
            <cylinderGeometry args={[0.185, 0.185, 0.065, 36]} />
            <meshStandardMaterial color={rimColor} metalness={0.88} roughness={part ? 0.1 : 0.35} />
          </mesh>
          {/* Spokes */}
          {Array.from({ length: spec.spokes }).map((_, s) => (
            <mesh key={s} rotation={[0, (s * Math.PI * 2) / spec.spokes, 0]}>
              <boxGeometry args={[0.022, 0.055, 0.33]} />
              <meshStandardMaterial color={rimColor} metalness={0.9} roughness={0.12} />
            </mesh>
          ))}
          {/* Centre cap */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.07, 12]} />
            <meshStandardMaterial color="#333" metalness={0.95} roughness={0.1} />
          </mesh>
        </TransitionGroup>
      </group>
    </group>
  )
}

// ─── Bumper slot ──────────────────────────────────────────────────────────────

interface BumperProps {
  side: 'front' | 'rear'
  bodyMat: THREE.MeshStandardMaterial
  part: Part | undefined
}

function BumperSlot({ side, bodyMat, part }: BumperProps) {
  const z = side === 'front' ? 2.2 : -2.2
  const lip = side === 'front' ? 0.04 : -0.04

  return (
    <group position={[0, 0.28, z]}>
      <TransitionGroup partId={part?.id}>
        {part ? (
          // Installed: bumper with deep chin splitter
          <group>
            <mesh castShadow material={bodyMat}>
              <boxGeometry args={[1.76, 0.34, 0.26]} />
            </mesh>
            {/* Chin splitter / diffuser lip */}
            <mesh castShadow position={[0, -0.14, lip]}>
              <boxGeometry args={[1.6, 0.06, 0.18]} />
              <meshStandardMaterial color="#111" roughness={0.6} metalness={0.2} />
            </mesh>
            {/* Duct opening */}
            <mesh position={[0, 0, lip + 0.01]}>
              <boxGeometry args={[0.7, 0.12, 0.04]} />
              <meshStandardMaterial color="#080808" roughness={0.95} />
            </mesh>
          </group>
        ) : (
          // Stock bumper
          <mesh castShadow material={bodyMat}>
            <boxGeometry args={[1.7, 0.32, 0.22]} />
          </mesh>
        )}
      </TransitionGroup>
    </group>
  )
}

// ─── Side skirt slot ──────────────────────────────────────────────────────────

interface SkirtProps {
  x: number
  bodyMat: THREE.MeshStandardMaterial
  part: Part | undefined
}

function SkirtSlot({ x, bodyMat, part }: SkirtProps) {
  return (
    <group position={[x, 0.18, 0]}>
      <TransitionGroup partId={part?.id}>
        {part ? (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.1, 0.22, 3.5]} />
              <meshStandardMaterial color="#111" roughness={0.7} metalness={0.1} />
            </mesh>
            {/* Lower lip */}
            <mesh position={[x > 0 ? 0.02 : -0.02, -0.1, 0]}>
              <boxGeometry args={[0.06, 0.04, 3.3]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>
          </group>
        ) : (
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.18, 3.4]} />
            <meshStandardMaterial color="#111214" roughness={0.8} />
          </mesh>
        )}
      </TransitionGroup>
    </group>
  )
}

// ─── Wing / spoiler slot ──────────────────────────────────────────────────────

interface WingProps {
  part: Part | undefined
  bodyMat: THREE.MeshStandardMaterial
}

function WingSlot({ part, bodyMat }: WingProps) {
  const name = part?.name.toLowerCase() ?? ''
  const isGT = name.includes('gt') || name.includes('voltex') || name.includes('racing wing')
  const isDuck = name.includes('duck') || name.includes('lip')
  const isFin = name.includes('fin') || name.includes('trd')

  if (!part) return null

  return (
    <TransitionGroup partId={part.id}>
      {isGT ? (
        // GT swan-neck wing
        <group position={[0, 0.72, -1.72]}>
          {/* Main blade */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.06, 0.32]} />
            <meshStandardMaterial color="#111" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Left stanchion */}
          <mesh castShadow position={[-0.58, -0.2, 0]}>
            <boxGeometry args={[0.06, 0.38, 0.08]} />
            <meshStandardMaterial color="#222" roughness={0.5} />
          </mesh>
          {/* Right stanchion */}
          <mesh castShadow position={[0.58, -0.2, 0]}>
            <boxGeometry args={[0.06, 0.38, 0.08]} />
            <meshStandardMaterial color="#222" roughness={0.5} />
          </mesh>
          {/* End plates */}
          <mesh castShadow position={[-0.78, 0, 0]}>
            <boxGeometry args={[0.04, 0.12, 0.32]} />
            <meshStandardMaterial color="#111" roughness={0.4} />
          </mesh>
          <mesh castShadow position={[0.78, 0, 0]}>
            <boxGeometry args={[0.04, 0.12, 0.32]} />
            <meshStandardMaterial color="#111" roughness={0.4} />
          </mesh>
        </group>
      ) : isDuck ? (
        // Ducktail spoiler
        <group position={[0, 0.65, -1.94]}>
          <mesh castShadow material={bodyMat}>
            <boxGeometry args={[1.3, 0.06, 0.2]} />
          </mesh>
          <mesh castShadow position={[0, 0.02, -0.06]} rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[1.2, 0.04, 0.12]} />
            <meshStandardMaterial color="#111" roughness={0.5} />
          </mesh>
        </group>
      ) : isFin ? (
        // Trunk fin
        <group position={[0, 0.68, -1.88]}>
          <mesh castShadow material={bodyMat}>
            <boxGeometry args={[1.1, 0.05, 0.14]} />
          </mesh>
        </group>
      ) : (
        // Trunk lip (cusco / generic)
        <group position={[0, 0.64, -1.96]}>
          <mesh castShadow material={bodyMat}>
            <boxGeometry args={[1.35, 0.04, 0.1]} />
          </mesh>
        </group>
      )}
    </TransitionGroup>
  )
}

// ─── Exhaust tip slot ─────────────────────────────────────────────────────────

interface ExhaustProps {
  part: Part | undefined
}

function ExhaustSlot({ part }: ExhaustProps) {
  const isDual = part?.name.toLowerCase().includes('dual') || part?.name.toLowerCase().includes('twin')
  const isTi = part?.name.toLowerCase().includes('ti') || part?.name.toLowerCase().includes('titanium')
  const tipColor = isTi ? '#c8a060' : '#888888'

  return (
    <group>
      <TransitionGroup partId={part?.id ?? null}>
        {isDual ? (
          <group>
            <mesh position={[0.22, 0.18, -2.14]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.052, 0.018, 10, 20]} />
              <meshStandardMaterial color={tipColor} metalness={0.95} roughness={0.08} />
            </mesh>
            <mesh position={[0.38, 0.18, -2.14]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.052, 0.018, 10, 20]} />
              <meshStandardMaterial color={tipColor} metalness={0.95} roughness={0.08} />
            </mesh>
          </group>
        ) : (
          <mesh position={[0.3, 0.18, -2.14]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[part ? 0.06 : 0.045, part ? 0.018 : 0.015, 10, 20]} />
            <meshStandardMaterial color={tipColor} metalness={0.95} roughness={0.08} />
          </mesh>
        )}
      </TransitionGroup>
    </group>
  )
}

// ─── Carbon fiber body material ───────────────────────────────────────────────

function useCarbonTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, size, size)
    // Weave pattern
    for (let row = 0; row < size / 8; row++) {
      for (let col = 0; col < size / 4; col++) {
        const x = col * 4 + (row % 2 === 0 ? 0 : 2)
        const y = row * 8
        ctx.fillStyle = '#282828'
        ctx.fillRect(x, y, 2, 8)
        ctx.fillStyle = '#0e0e0e'
        ctx.fillRect(x + 2, y, 2, 8)
        // Highlight edge
        ctx.fillStyle = '#3a3a3a'
        ctx.fillRect(x, y, 2, 1)
      }
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(6, 6)
    return tex
  }, [])
}

// ─── Body material builder ────────────────────────────────────────────────────

function useBodyMaterial(paintConfig: PaintConfig) {
  const carbonTex = useCarbonTexture()

  return useMemo(() => {
    if (paintConfig.type === 'carbon') {
      return new THREE.MeshStandardMaterial({
        map: carbonTex,
        roughness: 0.3,
        metalness: 0.5,
        envMapIntensity: 1.8,
      })
    }

    const color = new THREE.Color(paintConfig.color)
    return new THREE.MeshStandardMaterial({
      color,
      metalness: paintConfig.metalness,
      roughness: paintConfig.roughness,
      envMapIntensity: paintConfig.finishType === 'chrome' ? 2.5 : 1.5,
    })
  }, [paintConfig, carbonTex])
}

// ─── Placeholder car assembly ─────────────────────────────────────────────────

interface PlaceholderCarProps {
  paintConfig: PaintConfig
  installedByNode: Record<string, Part>
  stanceConfig: StanceConfig
  wheelSizeScale: number
}

function PlaceholderCar({
  paintConfig, installedByNode, stanceConfig, wheelSizeScale,
}: PlaceholderCarProps) {
  const bodyMat = useBodyMaterial(paintConfig)
  const rideHeightDrop = stanceConfig.rideHeight * 0.055
  const camberRad = stanceConfig.camber * (Math.PI / 180)

  const windowOpacity = useMemo(
    () => 0.72 - (paintConfig.windowTint / 100) * 0.58,
    [paintConfig.windowTint]
  )

  // Reactive window material
  const windowMatRef = useRef<THREE.MeshStandardMaterial>(null!)
  useEffect(() => {
    if (windowMatRef.current) {
      windowMatRef.current.opacity = windowOpacity
      windowMatRef.current.needsUpdate = true
    }
  }, [windowOpacity])

  // Reactive body material color/finish
  useEffect(() => {
    if (paintConfig.type === 'carbon') return
    bodyMat.color.set(paintConfig.color)
    bodyMat.metalness = paintConfig.metalness
    bodyMat.roughness = paintConfig.roughness
    bodyMat.needsUpdate = true
  }, [paintConfig, bodyMat])

  const frontBumperPart = installedByNode['bumper_front']
  const rearBumperPart  = installedByNode['bumper_rear']
  const skirtLPart      = installedByNode['side_skirt_l']
  const skirtRPart      = installedByNode['side_skirt_r']
  const wingPart        = installedByNode['wing_rear']
  const exhaustPart     = installedByNode['exhaust_tip']

  return (
    // Body group drops with ride height
    <group position={[0, -rideHeightDrop, 0]}>
      {/* ── Main body ── */}
      <mesh castShadow material={bodyMat} position={[0, 0.38, 0]}>
        <boxGeometry args={[1.8, 0.42, 4.2]} />
      </mesh>

      {/* ── Cabin ── */}
      <mesh castShadow material={bodyMat} position={[0, 0.74, 0.1]}>
        <boxGeometry args={[1.56, 0.38, 2.0]} />
      </mesh>

      {/* ── Windshield ── */}
      <mesh position={[0, 0.76, 1.05]} rotation={[-0.45, 0, 0]}>
        <planeGeometry args={[1.42, 0.56]} />
        <meshStandardMaterial
          ref={windowMatRef}
          color="#0d1a27"
          transparent
          opacity={windowOpacity}
          metalness={0.15}
          roughness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Rear window ── */}
      <mesh position={[0, 0.76, -0.9]} rotation={[0.45, 0, 0]}>
        <planeGeometry args={[1.42, 0.5]} />
        <meshStandardMaterial
          color="#0d1a27"
          transparent
          opacity={windowOpacity}
          metalness={0.15}
          roughness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Side windows ── */}
      {([-0.81, 0.81] as number[]).map(x => (
        <mesh key={x} position={[x, 0.74, 0.2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.6, 0.32]} />
          <meshStandardMaterial
            color="#0d1a27"
            transparent
            opacity={windowOpacity * 0.9}
            metalness={0.15}
            roughness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ── Hood ── */}
      <mesh castShadow material={bodyMat} position={[0, 0.62, 1.5]}>
        <boxGeometry args={[1.76, 0.06, 1.4]} />
      </mesh>

      {/* ── Trunk ── */}
      <mesh castShadow material={bodyMat} position={[0, 0.62, -1.5]}>
        <boxGeometry args={[1.76, 0.06, 1.2]} />
      </mesh>

      {/* ── Bumpers ── */}
      <BumperSlot side="front" bodyMat={bodyMat} part={frontBumperPart} />
      <BumperSlot side="rear"  bodyMat={bodyMat} part={rearBumperPart} />

      {/* ── Side skirts ── */}
      <SkirtSlot x={-0.91} bodyMat={bodyMat} part={skirtLPart} />
      <SkirtSlot x={0.91}  bodyMat={bodyMat} part={skirtRPart} />

      {/* ── Wing ── */}
      <WingSlot part={wingPart} bodyMat={bodyMat} />

      {/* ── Headlights ── */}
      {([-0.62, 0.62] as number[]).map(x => (
        <mesh key={x} position={[x, 0.38, 2.12]}>
          <boxGeometry args={[0.38, 0.18, 0.04]} />
          <meshStandardMaterial color="#d4e8ff" emissive="#d4e8ff" emissiveIntensity={1.6} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* ── Taillights ── */}
      {([-0.62, 0.62] as number[]).map(x => (
        <mesh key={x} position={[x, 0.38, -2.12]}>
          <boxGeometry args={[0.38, 0.18, 0.04]} />
          <meshStandardMaterial color="#ff1a1a" emissive="#ff1a1a" emissiveIntensity={1.2} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* ── Exhaust ── */}
      <ExhaustSlot part={exhaustPart} />

      {/* ── Wheels (stay at ground, not affected by ride height drop) ── */}
      <group position={[0, rideHeightDrop, 0]}>
        {Object.entries(WHEEL_POSITIONS).map(([node, pos]) => (
          <WheelAssembly
            key={node}
            position={pos}
            camberRad={camberRad}
            sizeScale={wheelSizeScale}
            part={installedByNode[node]}
          />
        ))}
      </group>
    </group>
  )
}

// ─── GLB car (real model path) ────────────────────────────────────────────────

interface GLBCarProps {
  glbPath: string
  paintConfig: PaintConfig
}

function GLBCar({ glbPath, paintConfig }: GLBCarProps) {
  const { scene } = useGLTF(glbPath)
  const cloned = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(paintConfig.color),
      metalness: paintConfig.metalness,
      roughness: paintConfig.roughness,
    })
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const name = child.name.toLowerCase()
      if (name.includes('body') || name.includes('paint') || name.includes('car')) {
        child.material = bodyMat
      }
      child.castShadow = true
      child.receiveShadow = true
    })
  }, [cloned, paintConfig])

  return <primitive object={cloned} castShadow />
}

// ─── Root export ──────────────────────────────────────────────────────────────

interface CarModelProps {
  car: { glbPath: string | null }
}

export default function CarModel({ car }: CarModelProps) {
  const { paintConfig, stanceConfig, wheelSize, getInstalledByNode } = useGarageStore()
  const installedByNode = getInstalledByNode()

  const wheelSizeScale = wheelSize === 17 ? 1.0 : wheelSize === 18 ? 1.1 : 1.2

  if (car.glbPath) {
    return <GLBCar glbPath={car.glbPath} paintConfig={paintConfig} />
  }

  return (
    <PlaceholderCar
      paintConfig={paintConfig}
      installedByNode={installedByNode}
      stanceConfig={stanceConfig}
      wheelSizeScale={wheelSizeScale}
    />
  )
}
