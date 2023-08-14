import { useState } from 'react'
import { ToastContext } from '../../contexts/ToastContext'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState({
    error: (message: string) => console.error(message),
    success: (message: string) => console.log(message),
    info: (message: string) => console.log(message),
    warning: (message: string) => console.warn(message)
  })
  return <ToastContext.Provider value={[value, setValue]}>{children}</ToastContext.Provider>
}
