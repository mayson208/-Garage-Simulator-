import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Car } from '../../types'
import { useGarageStore } from '../../store/useGarageStore'

interface PlaceholderCarProps {
  paintConfig: { color: string; metalness?: number; roughness?: number }
}

function PlaceholderCar({ paintConfig }: PlaceholderCarProps) {
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(paintConfig.color),
        metalness: paintConfig.metalness ?? 0.8,
        roughness: paintConfig.roughness ?? 0.2,
        envMapIntensity: 1.5,
      }),
    [paintConfig]
  )

  return (
    <group>
      {/* Main body */}
      <mesh castShadow material={bodyMat} position={[0, 0.38, 0]}>
        <boxGeometry args={[1.8, 0.42, 4.2]} />
      </mesh>

      {/* Cabin */}
      <mesh castShadow material={bodyMat} position={[0, 0.74, 0.1]}>
        <boxGeometry args={[1.56, 0.38, 2.0]} />
      </mesh>

      {/* Windshield (dark glass) */}
      <mesh position={[0, 0.76, 1.05]} rotation={[-0.45, 0, 0]}>
        <planeGeometry args={[1.42, 0.55]} />
        <meshStandardMaterial color="#1a2a3a" transparent opacity={0.7} metalness={0.1} roughness={0.0} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 0.76, -0.9]} rotation={[0.45, 0, 0]}>
        <planeGeometry args={[1.42, 0.5]} />
        <meshStandardMaterial color="#1a2a3a" transparent opacity={0.7} metalness={0.1} roughness={0.0} />
      </mesh>

      {/* Front bumper */}
      <mesh castShadow material={bodyMat} position={[0, 0.28, 2.2]}>
        <boxGeometry args={[1.7, 0.32, 0.22]} />
      </mesh>

      {/* Rear bumper */}
      <mesh castShadow material={bodyMat} position={[0, 0.28, -2.2]}>
        <boxGeometry args={[1.7, 0.32, 0.22]} />
      </mesh>

      {/* Hood */}
      <mesh castShadow material={bodyMat} position={[0, 0.62, 1.5]}>
        <boxGeometry args={[1.76, 0.06, 1.4]} />
      </mesh>

      {/* Trunk */}
      <mesh castShadow material={bodyMat} position={[0, 0.62, -1.5]}>
        <boxGeometry args={[1.76, 0.06, 1.2]} />
      </mesh>

      {/* Side skirts */}
      {([-0.91, 0.91] as number[]).map((x) => (
        <mesh key={x} castShadow position={[x, 0.18, 0]}>
          <boxGeometry args={[0.08, 0.18, 3.4]} />
          <meshStandardMaterial color="#111214" roughness={0.8} />
        </mesh>
      ))}

      {/* Wheels */}
      {([
        [-0.96, 0.22, 1.2],
        [0.96, 0.22, 1.2],
        [-0.96, 0.22, -1.2],
        [0.96, 0.22, -1.2],
      ] as [number, number, number][]).map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
          {/* Tire */}
          <mesh castShadow>
            <torusGeometry args={[0.21, 0.085, 16, 32]} />
            <meshStandardMaterial color="#111111" roughness={0.95} metalness={0.0} />
          </mesh>
          {/* Rim */}
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 32]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Spokes */}
          {[0, 1, 2, 3, 4].map((s) => (
            <mesh key={s} rotation={[0, (s * Math.PI * 2) / 5, 0]}>
              <boxGeometry args={[0.025, 0.04, 0.32]} />
              <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.15} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Headlights */}
      {([-0.6, 0.6] as number[]).map((x) => (
        <mesh key={x} position={[x, 0.38, 2.11]}>
          <boxGeometry args={[0.38, 0.18, 0.04]} />
          <meshStandardMaterial color="#d4e8ff" emissive="#d4e8ff" emissiveIntensity={1.5} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Taillights */}
      {([-0.6, 0.6] as number[]).map((x) => (
        <mesh key={x} position={[x, 0.38, -2.11]}>
          <boxGeometry args={[0.38, 0.18, 0.04]} />
          <meshStandardMaterial color="#ff1a1a" emissive="#ff1a1a" emissiveIntensity={1.2} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Exhaust tip */}
      <mesh position={[0.3, 0.18, -2.14]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.045, 0.015, 8, 16]} />
        <meshStandardMaterial color="#888" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  )
}

interface GLBCarProps {
  glbPath: string
  paintConfig: { color: string; metalness?: number; roughness?: number }
}

function GLBCar({ glbPath, paintConfig }: GLBCarProps) {
  const { scene } = useGLTF(glbPath)
  const cloned = useMemo(() => scene.clone(), [scene])

  useMemo(() => {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(paintConfig.color),
      metalness: paintConfig.metalness ?? 0.8,
      roughness: paintConfig.roughness ?? 0.2,
    })
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase()
        if (name.includes('body') || name.includes('paint') || name.includes('car')) {
          child.material = bodyMat
        }
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [cloned, paintConfig])

  return <primitive object={cloned} castShadow />
}

interface CarModelProps {
  car: Car
}

export default function CarModel({ car }: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { paintConfig } = useGarageStore()

  const hasGLB = Boolean(car.glbPath)

  return (
    <group ref={groupRef}>
      {hasGLB ? (
        <GLBCar glbPath={car.glbPath!} paintConfig={paintConfig} />
      ) : (
        <PlaceholderCar paintConfig={paintConfig} />
      )}
    </group>
  )
}
