import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Preload } from '@react-three/drei'
import * as THREE from 'three'
import ShopEnvironment from './ShopEnvironment'
import CarModel from './CarModel'
import { useGarageStore } from '../../store/useGarageStore'

function CameraRig() {
  return (
    <OrbitControls
      makeDefault
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minDistance={3}
      maxDistance={12}
      target={[0, 0.3, 0]}
      enableDamping
      dampingFactor={0.06}
    />
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#2a2d32" wireframe />
    </mesh>
  )
}

export default function CarViewer() {
  const { selectedCar } = useGarageStore()

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [5, 2.5, 6], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={['#0a0a0b']} />
        <fog attach="fog" args={['#0a0a0b', 18, 32]} />

        <Suspense fallback={<LoadingFallback />}>
          <ShopEnvironment />

          {selectedCar && <CarModel car={selectedCar} />}

          <ContactShadows
            position={[0, -0.005, 0]}
            opacity={0.8}
            scale={10}
            blur={2.5}
            far={4}
            color="#000000"
          />

          <Environment preset="warehouse" background={false} />
          <Preload all />
        </Suspense>

        <CameraRig />
      </Canvas>

      {/* Car name overlay */}
      {selectedCar && (
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <div className="shop-header text-shop-yellow text-xs tracking-widest opacity-60">
            {selectedCar.year}
          </div>
          <div className="shop-header text-shop-white text-2xl leading-tight">
            {selectedCar.make} {selectedCar.model}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!selectedCar && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="shop-header text-shop-yellow text-xl animate-pulse">
              LOADING...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
