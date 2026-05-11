import { create } from 'zustand'
import type { Car, Part, PaintConfig, PartsConfig, PartCategory } from '../types'
import { carsApi } from '../api/cars'
import { partsApi } from '../api/parts'

interface GarageStore {
  // Car data
  cars: Car[]
  selectedCar: Car | null
  carsLoading: boolean

  // Parts data
  parts: Part[]
  partsLoading: boolean
  activePartCategory: PartCategory

  // Current build state
  selectedParts: Partial<Record<PartCategory, Part | null>>
  paintConfig: PaintConfig

  // UI panels
  partsPanelOpen: boolean
  garagePanelOpen: boolean

  // Actions
  loadCars: () => Promise<void>
  selectCar: (car: Car) => Promise<void>
  setActivePartCategory: (category: PartCategory) => void
  selectPart: (category: PartCategory, part: Part | null) => void
  setPaintConfig: (config: Partial<PaintConfig>) => void
  togglePartsPanel: () => void
  toggleGaragePanel: () => void
  resetBuild: () => void
  getPartsConfig: () => PartsConfig
}

const defaultPaint: PaintConfig = {
  type: 'solid',
  color: '#1a1a2e',
  metalness: 0.8,
  roughness: 0.2,
}

export const useGarageStore = create<GarageStore>((set, get) => ({
  cars: [],
  selectedCar: null,
  carsLoading: false,

  parts: [],
  partsLoading: false,
  activePartCategory: 'body_kits',

  selectedParts: {},
  paintConfig: defaultPaint,

  partsPanelOpen: true,
  garagePanelOpen: false,

  loadCars: async () => {
    set({ carsLoading: true })
    try {
      const cars = await carsApi.getAll()
      set({ cars, carsLoading: false })
      if (cars.length > 0 && !get().selectedCar) {
        get().selectCar(cars[0])
      }
    } catch {
      set({ carsLoading: false })
    }
  },

  selectCar: async (car) => {
    set({ selectedCar: car, selectedParts: {}, partsLoading: true })
    try {
      const parts = await partsApi.getAll(car.modelKey)
      set({ parts, partsLoading: false })
    } catch {
      set({ partsLoading: false })
    }
  },

  setActivePartCategory: (category) => set({ activePartCategory: category }),

  selectPart: (category, part) =>
    set(state => ({
      selectedParts: { ...state.selectedParts, [category]: part },
    })),

  setPaintConfig: (config) =>
    set(state => ({
      paintConfig: { ...state.paintConfig, ...config },
    })),

  togglePartsPanel: () =>
    set(state => ({ partsPanelOpen: !state.partsPanelOpen })),

  toggleGaragePanel: () =>
    set(state => ({ garagePanelOpen: !state.garagePanelOpen })),

  resetBuild: () =>
    set({ selectedParts: {}, paintConfig: defaultPaint }),

  getPartsConfig: (): PartsConfig => {
    const { selectedParts } = get()
    const config: PartsConfig = {}
    for (const [cat, part] of Object.entries(selectedParts)) {
      config[cat as PartCategory] = part?.id ?? null
    }
    return config
  },
}))
