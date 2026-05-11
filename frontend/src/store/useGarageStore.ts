import { create } from 'zustand'
import type {
  Car, Part, PaintConfig, StanceConfig, WheelSize,
  PartsConfig, PartCategory, Build,
} from '../types'
import { FINISH_PRESETS } from '../types'
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
  stanceConfig: StanceConfig
  wheelSize: WheelSize

  // Active loaded build (for inline rename etc.)
  activeBuild: Build | null

  // Screenshot capture fn — wired by ScreenshotCapture inside Canvas
  captureScreenshot: (() => string) | null

  // UI panels
  partsPanelOpen: boolean
  garagePanelOpen: boolean
  summaryPanelOpen: boolean

  // Actions
  loadCars: () => Promise<void>
  selectCar: (car: Car) => Promise<void>
  setActivePartCategory: (category: PartCategory) => void
  selectPart: (category: PartCategory, part: Part | null) => void
  setPaintConfig: (config: Partial<PaintConfig>) => void
  setStanceConfig: (config: Partial<StanceConfig>) => void
  setWheelSize: (size: WheelSize) => void
  setActiveBuild: (build: Build | null) => void
  setCaptureScreenshot: (fn: (() => string) | null) => void
  togglePartsPanel: () => void
  toggleGaragePanel: () => void
  toggleSummaryPanel: () => void
  resetBuild: () => void
  getPartsConfig: () => PartsConfig
  getInstalledByNode: () => Record<string, Part>
}

const defaultPaint: PaintConfig = {
  type: 'solid',
  finishType: 'gloss',
  color: '#1a1a2e',
  wrapPreset: null,
  metalness: FINISH_PRESETS.gloss.metalness,
  roughness: FINISH_PRESETS.gloss.roughness,
  windowTint: 15,
}

const defaultStance: StanceConfig = {
  rideHeight: 0,
  camber: 0,
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
  stanceConfig: defaultStance,
  wheelSize: 17,

  activeBuild: null,
  captureScreenshot: null,

  partsPanelOpen: true,
  garagePanelOpen: false,
  summaryPanelOpen: false,

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

  setStanceConfig: (config) =>
    set(state => ({
      stanceConfig: { ...state.stanceConfig, ...config },
    })),

  setWheelSize: (size) => set({ wheelSize: size }),

  setActiveBuild: (build) => set({ activeBuild: build }),

  setCaptureScreenshot: (fn) => set({ captureScreenshot: fn }),

  togglePartsPanel: () =>
    set(state => ({ partsPanelOpen: !state.partsPanelOpen })),

  toggleGaragePanel: () =>
    set(state => ({ garagePanelOpen: !state.garagePanelOpen })),

  toggleSummaryPanel: () =>
    set(state => ({ summaryPanelOpen: !state.summaryPanelOpen })),

  resetBuild: () =>
    set({
      selectedParts: {},
      paintConfig: defaultPaint,
      stanceConfig: defaultStance,
      wheelSize: 17,
      activeBuild: null,
    }),

  getPartsConfig: (): PartsConfig => {
    const { selectedParts } = get()
    const config: PartsConfig = {}
    for (const [cat, part] of Object.entries(selectedParts)) {
      config[cat as PartCategory] = part?.id ?? null
    }
    return config
  },

  getInstalledByNode: (): Record<string, Part> => {
    const { selectedParts } = get()
    const byNode: Record<string, Part> = {}
    for (const part of Object.values(selectedParts)) {
      if (!part?.attachmentNode) continue
      const node = part.attachmentNode
      byNode[node] = part
      // Wheel parts apply to all 4 positions
      if (node.startsWith('wheel_')) {
        byNode['wheel_fl'] = part
        byNode['wheel_fr'] = part
        byNode['wheel_rl'] = part
        byNode['wheel_rr'] = part
      }
      // Side skirts mirror to both sides
      if (node === 'side_skirt_l' || node === 'side_skirt_r') {
        byNode['side_skirt_l'] = part
        byNode['side_skirt_r'] = part
      }
    }
    return byNode
  },
}))
