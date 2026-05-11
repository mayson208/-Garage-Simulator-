import apiClient from './apiClient'
import type { Car } from '../types'

export const carsApi = {
  getAll: () => apiClient.get<Car[]>('/cars').then(r => r.data),
  getByKey: (key: string) => apiClient.get<Car>(`/cars/key/${key}`).then(r => r.data),
}
