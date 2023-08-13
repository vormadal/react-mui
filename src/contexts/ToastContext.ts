import { createContext } from 'react'

export interface MessageOptions {
  embedded?: boolean
  title?: string
}

type MessageFunc = (message: string, options?: MessageOptions) => void | Promise<void>

type ToastConfigAction = (config: ToastContextProps) => void

export interface ToastContextProps {
  success: MessageFunc
  error: MessageFunc
  warning: MessageFunc
  info: MessageFunc
}

export const ToastContext = createContext<[ToastContextProps, ToastConfigAction]>([
  {
    success: (m) => console.log('success', m),
    error: (m) => console.log('error', m),
    warning: (m) => console.log('warning', m),
    info: (m) => console.log('info', m)
  },
  () => {}
])
