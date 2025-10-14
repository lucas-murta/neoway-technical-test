export type ToastStatus = 'system' | 'warning' | 'positive' | 'negative'

export interface ToastProps {
  status: ToastStatus
  title: string
  text: string
  className?: string
}
