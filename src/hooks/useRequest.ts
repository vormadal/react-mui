import { useCallback, useState } from 'react'
import { useToast } from './useToast'

interface RequestStatus {
  loading: boolean
  error: string
}

type RequestAction = <T>(action: () => T | Promise<T>) => Promise<{ success: boolean; data: T | undefined }>

/**
 *
 * @returns an array with exactly two values:
 * 1. object with `loading` and `error` state
 * 2. function used to submit data
 */
export function useRequest(): [RequestStatus, RequestAction] {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()

  const send = useCallback(
    async <T>(action: () => T | Promise<T>) => {
      setLoading(true)
      setError('')
      let result: T | undefined = undefined
      let hasError = false
      try {
        result = await action()
      } catch (e: any) {
        hasError = true
        const title = e.response?.title ?? 'Error'
        const description = e.response?.detail ?? e.message
        if (e.response?.stackTrace) {
          console.error(description, e.response.stackTrace, e.response?.data)
        }
        setError(description)
        toast.error(description, { embedded: true, title })
      } finally {
        setLoading(false)
      }
      return { data: result, success: !hasError }
    },
    [toast]
  )
  return [{ loading, error }, send]
}
