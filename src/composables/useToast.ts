import { ref } from 'vue'
import type { ToastStatus } from '@/lib/base-components/Toast/toast.interface'

export interface ToastItem {
  id: string
  status: ToastStatus
  title: string
  text: string
  duration?: number
}

const toasts = ref<ToastItem[]>([])
let toastIdCounter = 0

export function useToast() {
  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${++toastIdCounter}`
    const newToast: ToastItem = {
      id,
      duration: 5000,
      ...toast,
    }

    toasts.value.push(newToast)

    setTimeout(() => {
      removeToast(id)
    }, 5000)

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  const showError = (title: string, text: string, duration?: number) => {
    return addToast({
      status: 'negative',
      title,
      text,
      duration,
    })
  }

  const showSuccess = (title: string, text: string, duration?: number) => {
    return addToast({
      status: 'positive',
      title,
      text,
      duration,
    })
  }

  const showWarning = (title: string, text: string, duration?: number) => {
    return addToast({
      status: 'warning',
      title,
      text,
      duration,
    })
  }

  const showInfo = (title: string, text: string, duration?: number) => {
    return addToast({
      status: 'system',
      title,
      text,
      duration,
    })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  }
}
