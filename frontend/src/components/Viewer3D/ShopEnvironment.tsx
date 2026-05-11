import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FluorescentLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.RectAreaLight>(null)

  useFrame(({ clock }) => {
    if (!lightRef.current) return
    const t = clock.getElapsedTime()
    // Subtle flicker: mostly stable with occasional dip
    const flicker = Math.sin(t * 47) > 0.97 ? 0.7 : 1.0
    lightRef.current.intensity = 4 * flicker
  })

  return (
    <group position={position}>
      <rectAreaLight
        ref={lightRef}
        width={3}
        height={0.15}
        intensity={4}
        color="#d4e8ff"
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {/* Tube geometry for the visible tube */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 3, 8]} />
        <meshStandardMaterial
          color="#d4e8ff"
          emissive="#d4e8ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Housing */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[3.2, 0.08, 0.22]} />
        <meshStandardMaterial color="#2a2d32" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

function LiftStructure({ x }: { x: number }) {
  const side = x > 0 ? 1 : -1
  return (
    <group position={[x, 0, 0]}>
      {/* Main vertical column */}
      <mesh position={[0, 1.5, -2]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#2a2d32" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Horizontal arm */}
      <mesh position={[side * -0.5, 2.8, -2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#3a3d42" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lift arm diagonal */}
      <mesh position={[0, 0.6, -1.5]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.12, 1.6, 0.12]} />
        <meshStandardMaterial color="#1f2124" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Yellow caution stripe on column */}
      <mesh position={[0, 0.5, -1.91]}>
        <boxGeometry args={[0.22, 0.08, 0.01]} />
        <meshStandardMaterial color="#f5c518" emissive="#f5c518" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.7, -1.91]}>
        <boxGeometry args={[0.22, 0.08, 0.01]} />
        <meshStandardMaterial color="#f5c518" emissive="#f5c518" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function WallToolPanel({ z }: { z: number }) {
  return (
    <group position={[0, 1.2, z]}>
      {/* Pegboard panel */}
      <mesh>
        <boxGeometry args={[4, 2, 0.05]} />
        <meshStandardMaterial color="#1a1c1f" roughness={0.9} />
      </mesh>
      {/* Silhouetted tools */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 0.04]}>
          <boxGeometry args={[0.15, 0.6, 0.02]} />
          <meshStandardMaterial color="#3a3d42" />
        </mesh>
      ))}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, -0.5, 0.04]}>
          <cylinderGeometry args={[0.08, 0.06, 0.35, 6]} />
          <meshStandardMaterial color="#2a2d32" metalness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

export default function ShopEnvironment() {
  return (
    <group>
      {/* Ambient fill */}
      <ambientLight intensity={0.3} color="#1a1e2a" />

      {/* Fluorescent overhead lights */}
      <FluorescentLight position={[-2, 4.2, 0]} />
      <FluorescentLight position={[2, 4.2, 0]} />
      <FluorescentLight position={[0, 4.2, -2]} />

      {/* Key spotlights on the car */}
      <spotLight
        position={[0, 6, 2]}
        angle={0.35}
        penumbra={0.5}
        intensity={30}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-4, 5, -1]}
        angle={0.4}
        penumbra={0.6}
        intensity={15}
        color="#c8d8f0"
        castShadow={false}
      />
      <spotLight
        position={[4, 5, -1]}
        angle={0.4}
        penumbra={0.6}
        intensity={10}
        color="#c8d8f0"
        castShadow={false}
      />

      {/* Concrete floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#1c1e20"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Floor caution stripes near lift */}
      {[-2.5, -1.5, 2.5, 1.5].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[x, 0.001, -1]}>
          <planeGeometry args={[0.15, 3]} />
          <meshStandardMaterial color="#f5c518" opacity={0.5} transparent />
        </mesh>
      ))}

      {/* Lift structures */}
      <LiftStructure x={-3.5} />
      <LiftStructure x={3.5} />

      {/* Back wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#111214" roughness={0.95} />
      </mesh>

      {/* Shop sign on back wall */}
      <mesh position={[0, 4.2, -4.95]}>
        <planeGeometry args={[3.5, 0.7]} />
        <meshStandardMaterial color="#f5c518" emissive="#f5c518" emissiveIntensity={0.5} />
      </mesh>

      {/* Tool panels on side walls */}
      <group rotation={[0, Math.PI / 2, 0]} position={[-5.5, 0, 0]}>
        <WallToolPanel z={0} />
      </group>
      <group rotation={[0, -Math.PI / 2, 0]} position={[5.5, 0, 0]}>
        <WallToolPanel z={0} />
      </group>

      {/* Floor drain lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[0.05, 6]} />
        <meshStandardMaterial color="#0a0a0b" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.002, 0]}>
        <planeGeometry args={[0.05, 6]} />
        <meshStandardMaterial color="#0a0a0b" />
      </mesh>
    </group>
  )
}
