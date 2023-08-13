import { useContext } from 'react'
import { ToastContext, ToastContextProps } from '../contexts/ToastContext'

export const useToast = (): ToastContextProps => {
  const [notify] = useContext(ToastContext)
  return notify
}
