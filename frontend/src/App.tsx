import { useEffect } from 'react'
import { useGarageStore } from './store/useGarageStore'
import ShopHeader from './components/UI/ShopHeader'
import CarViewer from './components/Viewer3D/CarViewer'
import CarSelector from './components/CarSelector/CarSelector'
import PartsPanel from './components/PartsPanel/PartsPanel'
import GaragePanel from './components/GaragePanel/GaragePanel'

export default function App() {
  const { loadCars } = useGarageStore()

  useEffect(() => {
    loadCars()
  }, [loadCars])

  return (
    <div className="flex flex-col w-full h-full bg-shop-black overflow-hidden">
      {/* Top bar */}
      <ShopHeader />

      {/* Main workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Parts panel — left */}
        <PartsPanel />

        {/* 3D Viewport — center */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Fluorescent strip top of viewport */}
          <div className="flex-shrink-0 h-1 w-full bg-gradient-to-r from-transparent via-shop-fluor/20 to-transparent fluor-flicker" />

          {/* Canvas */}
          <div className="flex-1 relative">
            <CarViewer />

            {/* Corner shop signage */}
            <div className="absolute top-3 right-3 pointer-events-none">
              <div className="flex flex-col items-end gap-1">
                <div className="shop-mono text-shop-dim text-xs opacity-30 tracking-widest">
                  EST. 2024
                </div>
                <div className="shop-mono text-shop-dim text-xs opacity-20">
                  ORBIT · ZOOM · PAN
                </div>
              </div>
            </div>

            {/* Bottom caution stripe overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-2 caution-border opacity-20 pointer-events-none" />
          </div>

          {/* Car selector — bottom strip */}
          <div className="flex-shrink-0" style={{ height: '140px' }}>
            <CarSelector />
          </div>
        </div>
      </div>

      {/* Garage modal overlay */}
      <GaragePanel />
    </div>
  )
}
