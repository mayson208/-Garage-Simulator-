import apiClient from './apiClient'
import type { Part, PartCategory } from '../types'

export const partsApi = {
  getAll: (car?: string, category?: PartCategory) => {
    const params: Record<string, string> = {}
    if (car) params.car = car
    if (category) params.category = category
    return apiClient.get<Part[]>('/parts', { params }).then(r => r.data)
  },
  getById: (id: number) => apiClient.get<Part>(`/parts/${id}`).then(r => r.data),
}
