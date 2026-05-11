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

export interface PaintConfig {
  type: 'solid' | 'wrap' | 'chrome' | 'matte' | 'carbon'
  color: string
  wrapId?: number | null
  metalness?: number
  roughness?: number
}

export interface PartsConfig {
  body_kits?: number | null
  wheels?: number | null
  suspension?: number | null
  exhaust?: number | null
  spoilers?: number | null
  paint?: number | null
  lights?: number | null
  engine_bay?: number | null
}

export interface Build {
  id: number
  name: string
  carModelKey: string
  partsConfig: string
  paintConfig: string
  thumbnailDataUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface BuildPayload {
  name: string
  carModelKey: string
  partsConfig: string
  paintConfig: string
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
}

export const PART_CATEGORIES: PartCategory[] = [
  'body_kits', 'wheels', 'suspension', 'exhaust',
  'spoilers', 'paint', 'lights', 'engine_bay',
]
