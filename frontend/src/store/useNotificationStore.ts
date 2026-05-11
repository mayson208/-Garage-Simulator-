import { create } from 'zustand'

export type ToastLevel = 'success' | 'info' | 'warn' | 'error'

export interface Toast {
  id: string
  message: string
  level: ToastLevel
  ts: number
}

interface NotificationState {
  toasts: Toast[]
  push: (message: string, level?: ToastLevel) => void
  dismiss: (id: string) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],

  push(message, level = 'info') {
    const id = crypto.randomUUID()
    set(s => ({ toasts: [{ id, message, level, ts: Date.now() }, ...s.toasts].slice(0, 20) }))
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 4000)
  },

  dismiss(id) {
    set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }))
  },
}))
