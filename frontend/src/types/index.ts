export interface Car {
  id: number
  make: string
  model: string
  year: number
  modelKey: string
  thumbnailUrl: string | null
  glbPath: string | null
  attachmentNodes: string | null
  description: string | null
}

export type PartCategory =
  | 'body_kits'
  | 'wheels'
  | 'suspension'
  | 'exhaust'
  | 'spoilers'
  | 'paint'
  | 'lights'
  | 'engine_bay'
  | 'stance'

export interface Part {
  id: number
  name: string
  brand: string
  category: PartCategory
  compatibleCars: string
  priceMsrp: number | null
  thumbnailUrl: string | null
  modelOffset: string | null
  glbPath: string | null
  attachmentNode: string | null
  description: string | null
}

export type FinishType = 'gloss' | 'matte' | 'satin' | 'chrome'

export interface PaintConfig {
  type: 'solid' | 'wrap' | 'chrome' | 'matte' | 'carbon'
  finishType: FinishType
  color: string
  wrapPreset: string | null
  metalness: number
  roughness: number
  windowTint: number   // 0–100
}

export interface StanceConfig {
  rideHeight: number   // 0 (stock) to 4 (slammed)
  camber: number       // -5 to +5 degrees
}

export type WheelSize = 17 | 18 | 19

export interface PartsConfig {
  body_kits?: number | null
  wheels?: number | null
  suspension?: number | null
  exhaust?: number | null
  spoilers?: number | null
  paint?: number | null
  lights?: number | null
  engine_bay?: number | null
  stance?: number | null
}

export interface Build {
  id: number
  name: string
  carModelKey: string
  partsConfig: string
  paintConfig: string
  stanceConfig: string | null
  wheelSize: number | null
  thumbnailDataUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface BuildPayload {
  name: string
  carModelKey: string
  partsConfig: string
  paintConfig: string
  stanceConfig?: string | null
  wheelSize?: number | null
  thumbnailDataUrl?: string | null
}

export const PART_CATEGORY_LABELS: Record<PartCategory, string> = {
  body_kits:  'Body Kits',
  wheels:     'Wheels & Tires',
  suspension: 'Suspension',
  exhaust:    'Exhaust',
  spoilers:   'Wings & Spoilers',
  paint:      'Liveries & Paint',
  lights:     'Lights & Tint',
  engine_bay: 'Engine Bay',
  stance:     'Stance',
}

export const PART_CATEGORIES: PartCategory[] = [
  'body_kits', 'wheels', 'suspension', 'exhaust',
  'spoilers', 'paint', 'lights', 'engine_bay', 'stance',
]

export const FINISH_PRESETS: Record<FinishType, Pick<PaintConfig, 'metalness' | 'roughness'>> = {
  gloss:  { metalness: 0.7,  roughness: 0.1  },
  matte:  { metalness: 0.0,  roughness: 0.95 },
  satin:  { metalness: 0.3,  roughness: 0.5  },
  chrome: { metalness: 1.0,  roughness: 0.04 },
}
