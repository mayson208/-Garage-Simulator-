import apiClient from './apiClient'
import type { Build, BuildPayload } from '../types'

export interface GalleryResponse {
  builds: Build[]
  page: number
  limit: number
}

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

  getByShareToken: (token: string) =>
    apiClient.get<Build>(`/builds/share/${token}`).then(r => r.data),

  toggleVisibility: (id: number) =>
    apiClient.put<Build>(`/builds/${id}/visibility`).then(r => r.data),

  cloneFromShare: (token: string) =>
    apiClient.post<Build>(`/builds/share/${token}/clone`).then(r => r.data),

  getGallery: (params: { page?: number; limit?: number; sort?: string; carModel?: string } = {}) =>
    apiClient.get<GalleryResponse>('/builds/gallery', { params }).then(r => r.data),
}
