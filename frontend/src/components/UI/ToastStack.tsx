import { useNotificationStore } from '../../store/useNotificationStore'

const LEVEL_STYLES = {
  success: 'border-shop-green  text-shop-green  bg-shop-green/10',
  info:    'border-shop-yellow text-shop-yellow bg-shop-yellow/10',
  warn:    'border-amber-500   text-amber-400   bg-amber-500/10',
  error:   'border-red-500     text-red-400     bg-red-500/10',
}

const LEVEL_ICON = { success: '✔', info: 'ℹ', warn: '⚠', error: '✖' }

export default function ToastStack() {
  const { toasts, dismiss } = useNotificationStore()
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-2 px-3 py-2 rounded-sm border shop-mono text-xs max-w-xs shadow-lg ${LEVEL_STYLES[t.level]}`}
        >
          <span className="mt-0.5 flex-shrink-0">{LEVEL_ICON[t.level]}</span>
          <span className="flex-1 leading-tight">{t.message}</span>
          <button
            onClick={() => dismiss(t.id)}
            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity leading-none"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
