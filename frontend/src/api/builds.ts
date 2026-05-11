import apiClient from './apiClient'
import type { Build, BuildPayload } from '../types'

export const buildsApi = {
  getAll: () =>
    apiClient.get<Build[]>('/builds').then(r => r.data),

  getById: (id: number) =>
    apiClient.get<Build>(`/builds/${id}`).then(r => r.data),

  create: (payload: BuildPayload) =>
    apiClient.post<Build>('/builds', payload).then(r => r.data),

  update: (id: number, payload: BuildPayload) =>
    apiClient.put<Build>(`/builds/${id}`, payload).then(r => r.data),

  duplicate: (id: number) =>
    apiClient.post<Build>(`/builds/${id}/duplicate`).then(r => r.data),

  delete: (id: number) =>
    apiClient.delete(`/builds/${id}`),
}
