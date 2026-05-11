import { useGarageStore } from '../../store/useGarageStore'

export default function ShopHeader() {
  const { toggleGaragePanel, resetBuild, selectedCar, selectedParts } = useGarageStore()

  const totalParts = Object.values(selectedParts).filter(Boolean).length

  return (
    <header className="flex-shrink-0 flex items-center justify-between px-4 bg-shop-dark border-b border-shop-border h-12 z-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-7 bg-shop-yellow" />
          <div>
            <div className="shop-header text-shop-yellow text-lg tracking-widest leading-none">
              APEX GARAGE
            </div>
            <div className="shop-mono text-shop-dim text-xs leading-none opacity-60">
              JDM CUSTOMIZER
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-shop-border mx-1" />

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-shop-green fluor-flicker" />
          <span className="shop-mono text-shop-dim text-xs">SHOP OPEN</span>
        </div>
      </div>

      {/* Center: current build indicator */}
      <div className="hidden sm:flex items-center gap-4">
        {selectedCar && (
          <>
            <div className="text-center">
              <div className="shop-header text-shop-white text-xs tracking-widest">
                {selectedCar.year} {selectedCar.make} {selectedCar.model}
              </div>
              <div className="shop-mono text-shop-dim text-xs">
                {totalParts} PART{totalParts !== 1 ? 'S' : ''} INSTALLED
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {totalParts > 0 && (
          <button
            onClick={resetBuild}
            className="btn-ghost text-xs py-1.5 px-3"
            title="Reset all modifications"
          >
            RESET
          </button>
        )}
        <button
          onClick={toggleGaragePanel}
          className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          MY GARAGE
        </button>
      </div>
    </header>
  )
}
